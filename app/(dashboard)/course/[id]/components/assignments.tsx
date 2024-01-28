import { CreateAssignment } from './forms/create-assignment-form'
import { Tables } from '@/lib/database.types'
import Link from 'next/link'
import { Attachments } from './attachments'
import React from 'react'

export async function Assignments({
	course,
	assignments,
	profile,
}: {
	course: Tables<'courses'>
	assignments: Tables<'assignments'>[]
	profile: Tables<'profiles'>
}) {
	return (
		<React.Fragment>
			<div>
				{profile.role === 'instructor' && <CreateAssignment course={course} />}

				<div>
					{assignments.length > 0 ? (
						assignments.map((assignment) => (
							<div key={assignment.assignment_id}>
								<div>
									<strong>{assignment.title}</strong>
								</div>
								<div>
									<p>{assignment.description}</p>
								</div>
								<div>
									{assignment.attachment && (
										<div>
											<Attachments attachment={assignment.attachment} />
										</div>
									)}
									{profile.role === 'student' && (
										<Link
											href={`/course/${course.course_id}/${assignment.assignment_id}`}
										>
											<span>View More</span>
										</Link>
									)}
									{profile.role === 'instructor' && (
										<Link
											href={`/course/${course.course_id}/${assignment.assignment_id}`}
										>
											<span>Grade</span>
										</Link>
									)}
								</div>
							</div>
						))
					) : (
						<p>Your assignments will appear here.</p>
					)}
				</div>
			</div>
		</React.Fragment>
	)
}
