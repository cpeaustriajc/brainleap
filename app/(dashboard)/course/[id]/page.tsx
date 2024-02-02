import { getAssignments } from '@/lib/queries/assignment'
import { createClient as createClientServer } from '@/lib/supabase/server'
import { createClient as createClientStatic } from '@/lib/supabase/static'
import { unstable_noStore } from 'next/cache'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Announcements } from './components/announcements'
import { Assignments } from './components/assignments'
import { Grades } from './components/grades'
import { People } from './components/people'

export const dynamic = 'force-dynamic'

type Props = {
	params: {
		id: string
	}
}

export async function generateStaticParams() {
	const supabase = createClientStatic()
	const { data: courseIds, error } = await supabase
		.from('courses')
		.select('course_id')

	if (error) throw new Error(`${error.message}`)

	return courseIds.map((courseId) => ({
		params: {
			id: courseId,
		},
	}))
}

export default async function Page({ params }: Props) {
	unstable_noStore()
	const cookieStore = cookies()
	const supabase = createClientServer(cookieStore)

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

	const { data: course } = await supabase
		.from('courses')
		.select('*')
		.eq('course_id', params.id)
		.limit(1)
		.single()

	if (!course) {
		notFound()
	}

	const { data: announcements } = await supabase
		.from('announcements')
		.select('*')
		.eq('course_id', course.course_id)

	if (!announcements) {
		notFound()
	}

	const assignments = await getAssignments(course.course_id)

	if (!assignments) {
		notFound()
	}

	const { data: enrolledPeople, error } = await supabase
		.from('enrollments')
		.select('*')
		.eq('course_id', course.course_id)

	if (error) {
		throw new Error(error.message)
	}

	return (
		<main>
			<section>
				<h1>{course.course_name}</h1>
				<p>{course.course_description}</p>
			</section>
			<Suspense fallback={<p>Loading...</p>}>
				<Announcements
					course={course}
					profile={profile}
					announcements={announcements}
				/>
			</Suspense>
			<Suspense fallback={<p>Loading...</p>}>
				<Assignments
					course={course}
					assignments={assignments}
					profile={profile}
				/>
			</Suspense>
			<Suspense fallback={<p>Loading...</p>}>
				<People enrolledPeople={enrolledPeople} />
			</Suspense>
			{profile.role === 'instructor' && (
				<Suspense fallback={<p>Loading...</p>}>
					<Grades assignments={assignments} />
				</Suspense>
			)}
		</main>
	)
}
