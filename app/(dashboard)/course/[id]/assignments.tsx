import { CreateAssignment } from '@/components/create-assignment'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { buttonVariants } from '@/ui/button'
import { Tables } from '@/lib/database.types'
import Link from 'next/link'
import { Attachments } from './attachments'

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
		<>
			<div  >
				{profile.role === 'instructor' && (
					<CreateAssignment course={course} />
				)}

				<div  >
					{assignments.length > 0 ? (
						assignments.map((assignment) => (
							<Card key={assignment.assignment_id}>
								<CardHeader>
									<CardTitle>{assignment.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p  >
										{assignment.description}
									</p>
								</CardContent>
								<CardFooter  >
									{assignment.attachment && (
										<div  >
											<Attachments
												attachment={
													assignment.attachment
												}
											/>
										</div>
									)}
									{profile.role === 'student' && (
										<Link
											href={`/course/${course.course_id}/${assignment.assignment_id}`}
											className={buttonVariants({
												className: 'w-full',
											})}
										>
											<span  >
												View More
											</span>
										</Link>
									)}
									{profile.role === 'instructor' && (
										<Link
											href={`/course/${course.course_id}/${assignment.assignment_id}`}
											className={buttonVariants({
												className: 'w-full',
											})}
										>
											<span  >Grade</span>
										</Link>
									)}
								</CardFooter>
							</Card>
						))
					) : (
						<p  >
							Your assignments will appear here.
						</p>
					)}
				</div>
			</div>
		</>
	)
}
