'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { getProfileById } from '../queries/profile'

const outputSchema = z.object({
	file: z.custom<File>(),
})
export const createOutput = async (
	assignmentId: string,
	studentId: string,
	formData: FormData,
) => {
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

	if (!file) {
		throw new Error('No file found')
	}

	if (!file.path) {
		throw new Error('No file path found')
	}

	if (fileError) {
		console.error(fileError)
	}

	const { data, error } = await supabase.from('outputs').insert({
		assignment_id: assignmentId,
		student_id: studentId,
		attachment: file.path,
		grade: 0,
		submitted_at: new Date().toISOString(),
	})

	if (error) {
		console.error(error)
	}

	return data
}
