import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { AsideTabs } from './aside-tabs'

export async function Aside() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User not found')
	}

	const { data: enrollments, error: enrollmentError } = await supabase
		.from('enrollments')
		.select('course_id')
		.eq('user_id', user.id)

	if (enrollmentError) throw new Error(enrollmentError.message)

	if (!enrollments) {
		throw new Error('Enrollment not found')
	}

	const { data: courses, error: courseError } = await supabase
		.from('courses')
		.select('course_id, course_name, section')
		.in('course_id', enrollments?.map((enrollment) => enrollment.course_id))

	if (courseError) {
		throw new Error(courseError.message)
	}

	return (
		<aside className="min-h-dvh min-w-64 border-r">
			<div className="px-4">
				<h2 className="text-2xl tracking-tight font-bold">Courses</h2>
			</div>
			<AsideTabs courses={courses} />
		</aside>
	)
}
