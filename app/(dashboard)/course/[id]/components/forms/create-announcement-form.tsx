'use client'

import { createAnnouncement } from '@/lib/actions/announcement'
import { Tables } from '@/lib/database.types'
import { useFormState } from 'react-dom'

export function CreateAnnouncement({ course }: { course: Tables<'courses'> }) {
	const createAnnouncementWithCourseId = createAnnouncement.bind(
		null,
		course.course_id,
	)
	const [state, action] = useFormState(createAnnouncementWithCourseId, {
		message: undefined,
		errors: {},
	})

	return (
		<form action={action}>
			<div>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					required
					placeholder="Title of your announcement"
				/>
				<label htmlFor="description">Title</label>
				<textarea
					placeholder="Announce something to the class"
					id="description"
					required
					name="description"
				/>
				<label htmlFor="attachment">Upload a file</label>
				<input type="file" name="attachment" id="attachment" />
				<label htmlFor="link"> Link</label>
				<input
					type="url"
					name="link"
					id="link"
					placeholder="https://google.com"
				/>
			</div>
			<div>
				<button type="submit">Announce</button>
			</div>
		</form>
	)
}
