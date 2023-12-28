import { Input } from './ui/input'
import { Tables } from '@/lib/database.types'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { createAssignment } from '@/lib/actions/assignment'
import { revalidateTag } from 'next/cache'

export async function CreateAssignment({
	course,
}: {
	course: Tables<'courses'>
}) {
	const { course_id } = course

	const createAssignmentWithCourseId = createAssignment.bind(null, course_id)

	const action = async (formData: FormData) => {
		'use server'
		createAssignmentWithCourseId(formData)
		revalidateTag('assignments')
	}

	return (
		<form action={action} className="space-y-8">
			<div className="space-y-2">
			</div>
			<div className="space-y-2">
				<Label htmlFor="title">Assignment title</Label>
				<Input
					type="text"
					id="title"
					name="title"
					placeholder="Assignment title"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Assignment description</Label>
				<Textarea
					id="description"
					name="description"
					placeholder="Assignment description"
				/>
			</div>

			<div>
				<Label htmlFor="dueDate">Assignment due date</Label>
				<Input
					type="date"
					id="dueDate"
					name="dueDate"
					placeholder="Assignment due date"
				/>
			</div>
			<div>
				<Label htmlFor="dueTime">Assignment due time</Label>
				<Input
					type="time"
					id="dueTime"
					name="dueTime"
					placeholder="Assignment due time"
				/>
			</div>

			<div>
				<Label htmlFor="attachment">Assignment attachment</Label>
				<Input
					type="file"
					id="attachment"
					name="attachment"
					placeholder="Assignment attachment"
				/>
			</div>

			<div>
				<Label htmlFor="link">Assignment Link</Label>
				<Input
					type="url"
					id="link"
					name="link"
					placeholder="Assignment Link"
				/>
			</div>

			<Button type="submit">Create assignment</Button>
		</form>
	)
}
