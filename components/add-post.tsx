import { Input } from './ui/input'
import { Tables } from '@/lib/database.types'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { createPost } from '@/lib/actions'

export function AddPost({ course }: { course: Tables<'courses'> }) {
	const { course_id } = course

	const createPostWithCourseId = createPost.bind(null, course_id)

	const action = async (formData: FormData) => {
		'use server'
		createPostWithCourseId(formData)
	}

	return (
		<form action={action} className="space-y-8">
			<div className="space-y-2">
				<Label htmlFor="assignmentTitle">Assignment title</Label>
				<Input
					type="text"
					id="assignmentTitle"
					name="assignmentTitle"
					placeholder="Assignment title"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="assignmentDescription">
					Assignment description
				</Label>
				<Textarea
					id="assignmentDescription"
					name="assignmentDescription"
					placeholder="Assignment description"
				/>
			</div>

			<div>
				<Label htmlFor="assignmentDueDate">Assignment due date</Label>
				<Input
					type="date"
					id="assignmentDueDate"
					name="assignmentDueDate"
					placeholder="Assignment due date"
				/>
			</div>

			<Button type="submit">Create assignment</Button>
		</form>
	)
}
