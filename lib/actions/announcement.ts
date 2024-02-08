'use server'

import { createClient } from '@/lib/supabase/action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { announcementSchema } from '../validations/announcement'

type FieldErrors = z.inferFlattenedErrors<
	typeof announcementSchema
>['fieldErrors']

type FormState = {
	errors: FieldErrors | undefined
	message: string | undefined
}

export async function createAnnouncement(
	course_id: string,
	previousState: FormState,
	formData: FormData
): Promise<FormState> {
	const supabase = createClient()

	const result = announcementSchema.safeParse({
		title: formData.get('title'),
		description: formData.get('description'),
		attachment: formData.get('attachment'),
		link: formData.get('link'),
	})

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
			message: undefined,
		}
	}

	if (result.data.attachment.name === 'undefined' && !result.data.link) {
		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: result.data.title,
			description: result.data.description,
		})

		if (error) {
			throw error
		}

		revalidatePath(`/courses/${course_id}`)
	}

	if (result.data.link && result.data.attachment.name === 'undefined') {
		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: result.data.title,
			description: result.data.description,
			link: result.data.link,
		})

		if (error) {
			throw error
		}

		revalidatePath(`/courses/${course_id}`)
	}

	if (result.data.attachment.name !== 'undefined' && !result.data.link) {
		const { data: announcementFile, error: announcementFileError } =
			await supabase.storage
				.from('files')
				.upload(
					`announcements/${result.data.attachment.name}`,
					result.data.attachment,
					{
						upsert: true,
					}
				)

		if (announcementFileError) {
			throw announcementFileError
		}

		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: result.data.title,
			description: result.data.description,
			attachment: announcementFile.path,
		})

		if (error) {
			throw error
		}

		revalidatePath(`/courses/${course_id}`)
	}

	if (result.data.attachment.name !== 'undefined' && result.data.link) {
		const { data: announcementFile, error: announcementFileError } =
			await supabase.storage
				.from('files')
				.upload(
					`announcements/${result.data.attachment.name}`,
					result.data.attachment,
					{
						upsert: true,
					}
				)

		if (announcementFileError) {
			throw announcementFileError
		}

		const { error } = await supabase.from('announcements').upsert({
			course_id: course_id,
			title: result.data.title,
			description: result.data.description,
			attachment: announcementFile.path,
			link: result.data.link,
		})

		if (error) {
			throw error
		}

		revalidatePath(`/courses/${course_id}`)
	}

	return {
		errors: undefined,
		message: 'Announcement successfully created!',
	}
}
