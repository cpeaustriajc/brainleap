'use client'

import { createAnnouncement } from '@/lib/actions/announcement'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Tables } from '@/lib/database.types'
import { useFormState } from 'react-dom'
import ReactAria from 'react-aria-components'

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
		<ReactAria.Form
			action={action}
			className="flex flex-col gap-2 border border-border px-4 py-2 rounded"
			validationErrors={state.errors}
		>
			<div className="flex flex-col gap-4">
				<Label htmlFor="title">Title</Label>
				<Input
					type="text"
					name="title"
					id="title"
					required
					placeholder="Title of your announcement"
				/>
				<Label htmlFor="description">Title</Label>
				<Textarea
					placeholder="Announce something to the class"
					className="resize-none"
					id="description"
					required
					name="description"
				/>
				<Label htmlFor="attachment">Upload a file</Label>
				<Input type="file" name="attachment" id="attachment" />
				<Label htmlFor="link"> Link</Label>
				<Input
					type="url"
					name="link"
					id="link"
					placeholder="https://google.com"
				/>
			</div>
			<div className="flex flex-row gap-4">
				<Button type="submit" className="justify-self-end">
					Announce
				</Button>
			</div>
		</ReactAria.Form>
	)
}
