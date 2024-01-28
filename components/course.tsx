import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { UserRoundIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

export async function Course({ course }: { course: Tables<'courses'> }) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('role')
		.eq('profile_id', session.user.id)
		.limit(1)
		.single()

	const { data: instructorProfile, error: instructorProfileError } =
		await supabase
			.from('profiles')
			.select('avatar_url')
			.eq('profile_id', course.instructor_id)
			.limit(1)
			.single()

	if (instructorProfileError) {
		throw new Error(instructorProfileError.message)
	}

	if (!profile) {
		redirect('/auth/signin')
	}

	const assignments = await supabase
		.from('assignments')
		.select('*')
		.eq('course_id', course.course_id)

	if (!assignments.data) {
		notFound()
	}

	let message: string
	if (assignments.data.length > 0 && profile.role === 'instructor') {
		message = `You currently have ${assignments.data.length} pending classworks to grade.`
	} else if (assignments.data.length > 0 && profile.role === 'student') {
		message = `You currently have ${assignments.data.length} pending classworks to complete.`
	} else if (profile.role === 'instructor') {
		message = 'You currently have no pending classworks to grade.'
	} else {
		message = 'You currently have no pending classworks to complete.'
	}
	return (
		<div>
			<div>
				<div>
					<strong>{course.course_name}</strong>
					<p>{course.course_description}</p>
				</div>
				<div>
					<div>
						<Image src={instructorProfile.avatar_url ?? ''} alt="" />
						<div>
							<UserRoundIcon />
						</div>
					</div>
				</div>
			</div>
			<p>
				<Suspense fallback={<p>Loading...</p>}>
					<p>{message}</p>
				</Suspense>
			</p>
			<div>
				<Link href={`/course/${course.course_id}`}>View More</Link>
			</div>
		</div>
	)
}
