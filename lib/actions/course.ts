'use server'

import { createClient } from '@/lib/supabase/action'
import humanId from 'human-id'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { courseSchema } from '../validations/course'

type FieldErrors = z.inferFlattenedErrors<typeof courseSchema>['fieldErrors']
type FormState = {
	errors: FieldErrors | undefined
	message: string | undefined
}
export async function createCourse(
	previousState: FormState,
	formData: FormData,
): Promise<FormState> {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = courseSchema.parse({
		title: formData.get('title'),
		description: formData.get('description'),
		section: formData.get('section'),
		subject: formData.get('subject'),
		room: formData.get('room'),
	})

	const {
		data: { session },
		error: sessionError,
	} = await supabase.auth.getSession()

	if (sessionError) {
		throw sessionError
	}

	if (!session) {
		redirect('/auth/signin')
	}

	await supabase
		.from('profiles')
		.select('user_id, role')
		.eq('user_id', session.user.id)
		.single()

	const { data: insertedCourse, error } = await supabase
		.from('courses')
		.insert({
			course_id: humanId({ separator: '-', capitalize: false }),
			course_name: values.title,
			course_description: values.description,
			section: values.section,
			subject: values.subject,
			room: values.room,
		})
		.select()
		.single()

	if (session) {
		if (!insertedCourse) throw new Error('Class not found')

		const { data: course, error: selectCourseError } = await supabase
			.from('courses')
			.select('*')
			.eq('course_id', insertedCourse?.course_id)
			.single()

		if (selectCourseError) throw selectCourseError

		const { error } = await supabase.from('enrollments').insert({
			user_id: session.user.id,
			course_id: course.course_id,
		})

		if (error) throw error
	}

	if (error) throw error

	revalidatePath('/')
	revalidatePath('@/modal/create/course')

	return {
		errors: undefined,
		message: 'Course created successfully',
	}
}
