import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const res = await supabase.auth.getUser()

	if (res.error) {
		throw res.error
	}

	if (!res.data.user) {
		redirect('/auth/signin')
	}

	const enrollee = await supabase
		.from('enrollments')
		.select('course_id')
		.eq('user_id', res.data.user.id)

	if (enrollee.error) {
		throw enrollee.error
	}

	const courses = await supabase
		.from('courses')
		.select('course_id, course_name')
		.in(
			'course_id',
			enrollee.data.map((course_id) => course_id.course_id),
		)

	if (courses.error) {
		throw courses.error
	}

	return (
		<React.Fragment>
			<aside>
				<ul>
					{courses.data.length > 0 &&
						courses.data.map((course) => (
							<li key={course.course_id}>
								<Link href={`/course/${course.course_id}`}>
									{course.course_name}
								</Link>
							</li>
						))}
				</ul>
			</aside>
			<main>{children}</main>
		</React.Fragment>
	)
}
