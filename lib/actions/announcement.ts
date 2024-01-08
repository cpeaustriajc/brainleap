'use server'

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
		link: formData.get('link'),
	})

	if (values.attachment.name === 'undefined' && !values.link) {
		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: values.title,
			description: values.description,
		})

		if (error) {
			throw error
		}
	}

	if (values.link && values.attachment.name === 'undefined') {
		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: values.title,
			description: values.description,
			link: values.link,
		})

		if (error) {
			throw error
		}
	}

	if (values.attachment.name !== 'undefined' && !values.link) {
		const { data: announcementFile, error: announcementFileError } =
			await supabase.storage
				.from('files')
				.upload(
					`announcements/${values.attachment.name}`,
					values.attachment,
					{
						upsert: true,
					},
				)

		if (announcementFileError) {
			throw announcementFileError
		}

		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: values.title,
			description: values.description,
			attachment: announcementFile.path,
		})

		if (error) {
			throw error
		}
	}

	if (values.attachment.name !== 'undefined' && values.link) {
		const { data: announcementFile, error: announcementFileError } =
			await supabase.storage
				.from('files')
				.upload(
					`announcements/${values.attachment.name}`,
					values.attachment,
					{
						upsert: true,
					},
				)

		if (announcementFileError) {
			throw announcementFileError
		}

		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: values.title,
			description: values.description,
			attachment: announcementFile.path,
			link: values.link,
		})

		if (error) {
			throw error
		}
	}
}
