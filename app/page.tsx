import AppShell from '@/components/app-shell'
import { Course } from '@/components/course'
import { CourseSkeleton } from '@/components/course-skeleton'
import { getCourses } from '@/lib/queries/course'
import { getEnrollments } from '@/lib/queries/enrollment'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return notFound()
	}

	const coursesData = getCourses()
	const enrollmentsData = getEnrollments()

	const [courses, enrollments] = await Promise.all([
		coursesData,
		enrollmentsData,
	])

	if (!courses || !enrollments) {
		return notFound()
	}

	const studentsEnrolled = enrollments.filter(
		(enrollment) => enrollment.user_id === user.id,
	)

	const filterCoursesEnrolled = courses.filter((course) =>
		studentsEnrolled.find(
			(enrollment) => enrollment.course_id === course.course_id,
		),
	)

	return (
		<AppShell>
			<main>
				<section className="flex px-7 gap-4">
					<Suspense fallback={<CourseSkeleton />}>
						{filterCoursesEnrolled.map((course) => (
							<Course key={course.course_id} course={course} />
						))}
					</Suspense>
				</section>
			</main>
		</AppShell>
	)
}
