import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { Attachments } from '../../components/attachments'

export default async function Assignments({
	params,
}: { params: { id: string } }) {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.limit(1)
		.eq('profile_id', user.id)
		.single()

	if (!profile) {
		redirect('/auth/signin')
	}

	const { data: assignments } = await supabase
		.from('assignments')
		.select()
		.eq('course_id', params.id)

	if (!assignments) {
		notFound()
	}

	return (
		<React.Fragment>
			<div>
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
											<Attachments
												attachment={
													assignment.attachment
												}
											/>
										</div>
									)}
									{profile.role === 'student' && (
										<Link
											href={`/course/${params.id}/${assignment.assignment_id}`}
										>
											<span>View More</span>
										</Link>
									)}
									{profile.role === 'instructor' && (
										<Link
											href={`/course/${params.id}/${assignment.assignment_id}`}
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
