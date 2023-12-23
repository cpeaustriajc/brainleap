'use server'

import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const CreateAnnouncementFormSchema = z.object({
	title: z.string(),
	description: z.string(),
})
export async function createAnnouncement(course_id: string, formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = CreateAnnouncementFormSchema.parse({
		title: formData.get('title'),
		description: formData.get('description'),
	})

	await supabase
		.from('courses')
		.select('course_id')
		.eq('course_id', course_id)
		.single()

	const { error } = await supabase.from('announcements').insert({
		course_id: course_id,
		title: values.title,
		description: values.description,
	})

	if (error) {
		throw error
	}
}
