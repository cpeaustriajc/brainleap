import { Badge } from '@/components/ui/badge'
import { Tables } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { getAssignments } from '@/lib/queries'
import { AddAssigment } from '@/components/add-assignment'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
	params: {
		id: string
	}
}

export async function generateStaticParams() {
	const supabase = createBrowserClient()
	const { data: courses } = await supabase.from('courses').select('course_id')

	if (!courses) {
		notFound()
	}

	return courses.map((c) => ({
		id: c.course_id,
	}))
}

export default async function Page({ params }: Props) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const { data: course } = await supabase
		.from('courses')
		.select()
		.eq('course_id', params.id)
		.single()

	if (!course) {
		notFound()
	}

	const assignments = await getAssignments(course.course_id)

	if (!assignments) {
		notFound()
	}

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		throw new Error('Session not found.')
	}

	const { data: profile, error } = await supabase
		.from('profiles')
		.select()
		.eq('profile_id', session.user.id)
		.single()

	if (!profile) {
		notFound()
	}

	if (error) {
		throw error
	}

	return (
		<main className="px-8">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{course.course_name}
			</h1>
			<p className="leading-7 [&:not(:first-child)]:mt-6">
				{course.course_description}
			</p>
			{profile?.role === 'instructor' && (
				<>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Get started by sharing the class code:{' '}
					</p>
					<Badge>{course.course_id}</Badge>
				</>
			)}

			{profile?.role === 'instructor' && (
				<div className="my-2">
					<AddAssigment course={course} />
				</div>
			)}

			<div className="mt-10 grid">
				{assignments.map((assignment) => (
					<Card key={assignment.assignment_id}>
						<CardHeader>
							<CardTitle>{assignment.title}</CardTitle>
							<p>Due {assignment.due_date}</p>
						</CardHeader>
						<CardContent>
							<p className="whitespace-pre-line">
								{assignment.description}
							</p>
						</CardContent>
						<CardFooter>
							<Button asChild variant={'link'}>
								<Link
									href={`/course/${course?.course_id}/${assignment.assignment_id}`}
								>
									View assignment
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	)
}
