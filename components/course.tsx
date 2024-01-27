import { Tables } from '@/lib/database.types'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { UserRoundIcon } from 'lucide-react'
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

	let message
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
					<Avatar>
						<AvatarImage src={instructorProfile.avatar_url ?? ''} />
						<AvatarFallback>
							<UserRoundIcon />
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<p>
				<Suspense fallback={<p>Loading...</p>}>
					<p>{message}</p>
				</Suspense>
			</p>
			<div>
				<Link
					href={`/course/${course.course_id}`}
					className={buttonVariants({ className: 'w-full' })}
				>
					View More
				</Link>
			</div>
		</div>
	)
}
