'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { getProfileById } from '../queries/profile'
import { gradeSchema, outputSchema } from '../validations/output'
import { revalidatePath } from 'next/cache'

type OutputSchemaFieldErrors = z.inferFlattenedErrors<
	typeof outputSchema
>['fieldErrors']

type OutputSchemaFormState = {
	errors: OutputSchemaFieldErrors | undefined
	message: string | undefined
}

type GradeSchemaFieldErrors = z.inferFlattenedErrors<
	typeof gradeSchema
>['fieldErrors']
type GradeSchemaFormState = {
	errors: GradeSchemaFieldErrors | undefined
	message: string | undefined
}

export const createOutput = async (
	assignmentId: string,
	studentId: string,
	courseId: string,
	previousState: OutputSchemaFormState,
	formData: FormData,
): Promise<OutputSchemaFormState> => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = outputSchema.parse({
		file: formData.get('output'),
	})

	const profile = await getProfileById(studentId)

	const { data: file, error: fileError } = await supabase.storage
		.from('files')
		.upload(
			`assignments/${profile.username}/${values.file.name}`,
			values.file,
			{
				upsert: true,
			},
		)

	if (fileError) {
		throw new Error(fileError.message)
	}

	const { error } = await supabase.from('outputs').insert({
		course_id: courseId,
		assignment_id: assignmentId,
		student_id: studentId,
		attachment: file.path,
		grade: 0,
		submitted_at: new Date().toISOString(),
	})

	if (error) {
		throw new Error(error.message)
	}

	revalidatePath(`/course/${courseId}/${assignmentId}`)

	return {
		errors: undefined,
		message: 'Output created successfully',
	}
}

export const gradeOutput = async (
	courseId: string,
	assignmentId: string,
	outputId: string,
	previousState: GradeSchemaFormState,
	formData: FormData,
): Promise<GradeSchemaFormState> => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const result = gradeSchema.safeParse({
		grade: formData.get('grade'),
	})

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
			message: undefined,
		}
	}

	const { error } = await supabase
		.from('outputs')
		.update({
			grade: result.data.grade,
		})
		.eq('output_id', outputId)

	if (error) {
		throw new Error(error.message)
	}

	revalidatePath(`/course/${courseId}/${assignmentId}`)

	return {
		errors: undefined,
		message: 'Output graded successfully',
	}
}
