import { Tables } from '@/lib/database.types'
import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { buttonVariants } from './ui/button'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { PersonIcon } from '@radix-ui/react-icons'
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

	return (
		<Card className="max-w-sm h-60">
			<CardHeader className="flex flex-row justify-between items-center">
				<div>
					<CardTitle>{course.course_name}</CardTitle>
					<CardDescription>
						{course.course_description}
					</CardDescription>
				</div>
				<div>
					<Avatar>
						<AvatarImage src={instructorProfile.avatar_url ?? ''} />
						<AvatarFallback>
							<PersonIcon />
						</AvatarFallback>
					</Avatar>
				</div>
			</CardHeader>
			<CardContent>
				<Suspense
					fallback={<p className="animate-pulse">Loading...</p>}
				>
					<p>
						You currently have{' '}
						{assignments.data.length === 0
							? 'no'
							: assignments.data.length}{' '}
						pending{' '}
						{assignments.data.length === 0
							? 'classwork'
							: 'classworks'}{' '}
						{profile.role === 'instructor'
							? 'to grade'
							: 'to complete'}
						.
					</p>
				</Suspense>
			</CardContent>
			<CardFooter>
				<Link
					href={`/course/${course.course_id}`}
					className={buttonVariants({ className: 'w-full' })}
				>
					View More
				</Link>
			</CardFooter>
		</Card>
	)
}
