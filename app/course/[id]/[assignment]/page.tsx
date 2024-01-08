import { getAssignmentById } from '@/lib/queries/assignment'
import { getProfileById } from '@/lib/queries/profile'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { TeacherView } from './teacher'
import { StudentView } from './student'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
	const supabase = createBrowserClient()
	const { data: assignments, error } = await supabase
		.from('assignments')
		.select('assignment_id')

	if (error) {
		throw new Error(`${error.message}`)
	}

	return assignments.map((assignment) => ({
		assignment: assignment.assignment_id,
	}))
}

type Props = {
	params: {
		id: string
		assignment: string
	}
}

export default async function Page({ params }: Props) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const assignment = await getAssignmentById(params.assignment)

	if (!assignment) {
		notFound()
	}

	const profile = await getProfileById(user.id)

	if (!profile) {
		redirect('/auth/signin')
	}

	const { data, error } = await supabase
		.from('courses')
		.select('course_id')
		.eq('course_id', params.id)
		.single()

	if (error) {
		throw new Error(`${error.message}`)
	}

	return (
		<main>
			{profile.role === 'student' ? (
				<StudentView
					assignment={assignment}
					userId={user.id}
					courseId={data.course_id}
				/>
			) : (
				<TeacherView assignment={assignment} />
			)}
		</main>
	)
}
