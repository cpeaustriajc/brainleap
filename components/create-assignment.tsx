'use client'

import { createAssignment } from '@/lib/actions/assignment'
import { Tables } from '@/lib/database.types'
import { useFormState } from 'react-dom'

export function CreateAssignment({ course }: { course: Tables<'courses'> }) {
	const { course_id } = course

	const createAssignmentWithCourseId = createAssignment.bind(null, course_id)
	const [state, action] = useFormState(createAssignmentWithCourseId, {
		message: undefined,
		errors: {},
	})

	return (
		<form action={action}>
			<div>
				<label htmlFor="title">Assignment title</label>
				<input
					type="text"
					id="title"
					name="title"
					placeholder="Assignment title"
				/>
			</div>
			<div>
				<label htmlFor="description">Assignment description</label>
				<textarea
					id="description"
					name="description"
					placeholder="Assignment description"
				/>
			</div>

			<div>
				<label htmlFor="dueDate">Assignment due date</label>
				<input
					type="date"
					id="dueDate"
					name="dueDate"
					placeholder="Assignment due date"
				/>
			</div>
			<div>
				<label htmlFor="dueTime">Assignment due time</label>
				<input
					type="time"
					id="dueTime"
					name="dueTime"
					placeholder="Assignment due time"
				/>
			</div>

			<div>
				<label htmlFor="attachment">Assignment attachment</label>
				<input
					type="file"
					id="attachment"
					name="attachment"
					placeholder="Assignment attachment"
				/>
			</div>

			<div>
				<label htmlFor="link">Assignment Link</label>
				<input type="url" id="link" name="link" placeholder="Assignment Link" />
			</div>

			<button type="submit">Create assignment</button>
		</form>
	)
}
