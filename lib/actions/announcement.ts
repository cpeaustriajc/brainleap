'use server'

import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { announcementSchema } from '../validations/announcement'

export async function createAnnouncement(
	course_id: string,
	formData: FormData,
) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = announcementSchema.parse({
		title: formData.get('title'),
		description: formData.get('description'),
		attachment: formData.get('attachment'),
	})

	const { data, error: uploadError } = await supabase.storage
		.from('files')
		.upload(`announcements/${values.attachment.name}`, values.attachment, {
			upsert: true,
		})

	if (!data) {
		throw uploadError
	}

	const { error } = await supabase.from('announcements').upsert({
		course_id: course_id,
		title: values.title,
		description: values.description,
		attachment: data.path,
	})

	if (error) {
		throw error
	}
}
