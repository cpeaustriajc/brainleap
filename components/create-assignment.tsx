import { Input } from './ui/input'
import { Tables } from '@/lib/database.types'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { createAnnouncement } from '@/lib/actions/announcement'
import { getEnrollmentsByCourseId, getProfiles } from '@/lib/queries'

export async function CreateAssignment({
	course,
}: {
	course: Tables<'courses'>
}) {
	const { course_id } = course

	const createAnnouncementWithCourseId = createAnnouncement.bind(
		null,
		course_id,
	)
	const enrollments = await getEnrollmentsByCourseId(course_id)
	const profiles = await getProfiles()

	// const enrolledStudents = profiles.filter((profile) => {
	// 	if (profile.role !== 'student') return false

	// 	return enrollments.some((enrollment) => {
	// 		return enrollment.user_id === profile.profile_id
	// 	})
	// })

	const action = async (formData: FormData) => {
		'use server'
		createAnnouncementWithCourseId(formData)
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
