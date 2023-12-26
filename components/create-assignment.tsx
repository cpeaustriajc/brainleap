import { Input } from './ui/input'
import { Tables } from '@/lib/database.types'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { createAnnouncement } from '@/lib/actions/announcement'
import { getProfiles } from '@/lib/queries/profile'
import { getEnrollmentsByCourseId } from '@/lib/queries/enrollment'
import { createAssignment } from '@/lib/actions/assignment'
import { revalidateTag } from 'next/cache'

export async function CreateAssignment({
	course,
}: {
	course: Tables<'courses'>
}) {
	const { course_id } = course

	const createAssignmentWithCourseId = createAssignment.bind(null, course_id)
	// const enrollments = await getEnrollmentsByCourseId(course_id)
	// const profiles = await getProfiles()

	// const enrolledStudents = profiles.filter((profile) => {
	// 	if (profile.role !== 'student') return false

	// 	return enrollments.some((enrollment) => {
	// 		return enrollment.user_id === profile.profile_id
	// 	})
	// })

	const action = async (formData: FormData) => {
		'use server'
		createAssignmentWithCourseId(formData)
		revalidateTag('assignments')
	}

	return (
		<form action={action} className="space-y-8">
			<div className="space-y-2">
				{/* {enrolledStudents.map((student) => (
					<Fragment key={student.username}>
						<Checkbox id={student.username} />
						<Label htmlFor={student.username}>
							{student.full_name ?? student.username}
						</Label>
					</Fragment>
				))} */}
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
