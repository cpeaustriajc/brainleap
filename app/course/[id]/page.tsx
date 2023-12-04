import { Badge } from '@/components/ui/badge'
import { Tables } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { getAssignments } from '@/lib/queries'
import { AddAssigment } from '@/components/add-assignment'

type Props = {
	params: {
		id: string
	}
}

export async function generateStaticParams() {
	const supabase = createBrowserClient()
	const { data: courses } = await supabase.from('courses').select('course_id')

	return courses?.map((c) => ({
		id: c.course_id,
	}))
}

export default async function Page({ params }: Props) {
	let profile: Tables<'profiles'> | null = null
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const { data: course } = await supabase
		.from('courses')
		.select()
		.eq('course_id', params.id)
		.single()

	const assignments = await getAssignments(course?.course_id ?? '')

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		const { data, error } = await supabase
			.from('profiles')
			.select()
			.eq('profile_id', session.user.id)
			.single()
		profile = data

		if (error) {
			throw error
		}
	}

	return (
		<main className="px-8">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{course?.course_name}
			</h1>
			<p className="leading-7 [&:not(:first-child)]:mt-6">
				{course?.course_description}
			</p>
			{profile?.role === 'instructor' && (
				<>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Get started by sharing the class code:{' '}
					</p>
					<Badge>{course?.course_id}</Badge>
				</>
			)}

			{profile?.role === 'instructor' && (
				<div className="my-2">
					<AddAssigment course={course} />
				</div>
			)}

			{assignments?.map((assignment) => (
				<div className="mt-10" key={assignment.assignment_id}>
					<h2 className="text-2xl font-bold">{assignment?.title}</h2>
					<p className="mt-2">{assignment?.description}</p>
				</div>
			))}
		</main>
	)
}
