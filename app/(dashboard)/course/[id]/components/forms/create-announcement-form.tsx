'use client'

import { createAnnouncement } from '@/lib/actions/announcement'
import { cx } from '@/lib/cva.config'
import { Tables } from '@/lib/database.types'
import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'
import { textarea } from '@/ui/textarea'
import { useFormState } from 'react-dom'

export function CreateAnnouncement({ course }: { course: Tables<'courses'> }) {
	const createAnnouncementWithCourseId = createAnnouncement.bind(
		null,
		course.course_id
	)
	const [state, action] = useFormState(createAnnouncementWithCourseId, {
		message: undefined,
		errors: {},
	})

	return (
		<form className={form} action={action}>
			<label htmlFor="title" className={label}>
				Title
			</label>
			<input
				type="text"
				name="title"
				id="title"
				className={input}
				required
				placeholder="Title of your announcement"
			/>
			<label htmlFor="description" className={label}>
				Description
			</label>
			<textarea
				placeholder="What is the description about?"
				id="description"
				className={textarea}
				required
				name="description"
			/>
			<label htmlFor="attachment" className={label}>
				Upload a file
			</label>
			<input
				type="file"
				name="attachment"
				className={input}
				id="attachment"
			/>
			<label htmlFor="link" className={label}>
				Link
			</label>
			<input
				type="url"
				name="link"
				className={input}
				id="link"
				placeholder="https://google.com"
			/>
			<button className={cx(button, 'col-span-2')} type="submit">
				Announce
			</button>
		</form>
	)
}
