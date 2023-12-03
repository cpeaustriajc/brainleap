import { createAssignment } from '@/lib/actions'
import { Input } from './ui/input'
import { Tables } from '@/lib/definitions'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Link from 'next/link'

export function AddAssigment({ course }: { course: Tables<'classes'> | null }) {
	return (
		<form action={createAssignment} className="space-y-8">
			<Input
				disabled
				id="classId"
				name="classId"
				value={course?.class_id}
				className="hidden"
			/>
			<div className="space-y-2">
				<Label htmlFor="assignmentTile">Assignment title</Label>
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
				<Input
					type="text"
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

			<Button asChild>
				<Link href={`/course/${course?.class_id}/create`}>
					Create assignment
				</Link>
			</Button>
		</form>
	)
}
