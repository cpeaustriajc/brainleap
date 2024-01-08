'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { assignmentSchema } from '../validations/assignment'
import { revalidatePath } from 'next/cache'
import { getProfileById } from '../queries/profile'

const constructDueDate = (date: string, time: string) => {
	const [hours, minutes] = time.split(':')
	const [year, month, day] = date.split('-')

	return new Date(
		parseInt(year),
		parseInt(month) - 1,
		parseInt(day),
		parseInt(hours),
		parseInt(minutes),
	)
}

export async function createAssignment(course_id: string, formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const dueDate = constructDueDate(
		formData.get('dueDate') as string,
		formData.get('dueTime') as string,
	)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User not found')
	}

	const profile = await getProfileById(user.id)

	const values = assignmentSchema.parse({
		title: formData.get('title'),
		description: formData.get('description'),
		attachment: formData.get('attachment'),
		link: formData.get('link'),
		due_date: formData.get('dueDate'),
		due_time: formData.get('dueTime'),
	})

	if (values.attachment.name === 'undefined' && !values.link) {
		const { error: assignmentError } = await supabase
			.from('assignments')
			.insert({
				title: values.title,
				due_date: dueDate.toLocaleDateString(),
				course_id: course_id,
				instructor_id: profile.profile_id,
			})

		revalidatePath(`/courses/${course_id}`)

		if (assignmentError) {
			throw assignmentError
		}
	}

	if (values.link && values.attachment.name === 'undefined') {
		const { error: assignmentError } = await supabase
			.from('assignments')
			.insert({
				title: values.title,
				due_date: dueDate.toLocaleDateString(),
				link: values.link,
				course_id: course_id,
				instructor_id: profile.profile_id,
			})

		revalidatePath(`/courses/${course_id}`)

		if (assignmentError) {
			throw assignmentError
		}
	}

	if (values.attachment && values.link) {
		const { data: assignmentFiles, error: assignmentFilesError } =
			await supabase.storage
				.from('files')
				.upload(
					`assignments/${values.attachment.name}`,
					values.attachment,
					{
						upsert: true,
					},
				)

		if (assignmentFilesError) {
			throw assignmentFilesError
		}

		const { error: assignmentError } = await supabase
			.from('assignments')
			.insert({
				title: values.title,
				due_date: dueDate.toLocaleDateString(),
				attachment: assignmentFiles.path,
				link: values.link,
				course_id: course_id,
				instructor_id: profile.profile_id,
			})

		revalidatePath(`/courses/${course_id}`)

		if (assignmentError) {
			throw assignmentError
		}
	}
}
