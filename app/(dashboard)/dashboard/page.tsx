import { Course } from '@/components/course'
import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { PlusCircleIcon } from 'lucide-react'
import { unstable_noStore } from 'next/cache'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function Page() {
	unstable_noStore()

	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return notFound()
	}

	const { data: enrollmentIds } = await supabase
		.from('enrollments')
		.select('course_id')
		.eq('user_id', user.id)

	if (!enrollmentIds) {
		notFound()
	}

	const { data: courses } = await supabase
		.from('courses')
		.select('*')
		.in(
			'course_id',
			enrollmentIds.map((enrollment) => enrollment.course_id),
		)

	if (!courses) {
		return notFound()
	}

	return (
		<main  >
			<section  >
				<Courses courses={courses} />
			</section>
		</main>
	)
}

const Courses = ({ courses }: { courses: Tables<'courses'>[] }) => {
	return courses.length > 0 ? (
		courses.map((course) => (
			<Course key={course.course_id} course={course} />
		))
	) : (
		<div  >
			<p  >
				Click enroll course on the{' '}
				<PlusCircleIcon   /> plus tab to get
				started
			</p>
		</div>
	)
}
