'use server'

import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const CreatePostFormSchema = z.object({
	title: z.string(),
	description: z.string(),
})
export async function createPost(courseId: string, formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = CreatePostFormSchema.parse({
		title: formData.get('title'),
		description: formData.get('description'),
	})

	await supabase
		.from('courses')
		.select('course_id')
		.eq('course_id', courseId)
		.single()

	const { error } = await supabase.from('posts').insert({
		course_id: courseId,
		title: values.title,
		description: values.description,
	})

	if (error) {
		throw error
	}
}
