import AppShell from '@/components/app-shell'
import { Course } from '@/components/course'
import { CourseSkeleton } from '@/components/course-skeleton'
import { getAssignments, getCourses, getEnrollments } from '@/lib/queries'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function Page() {
	const coursesData = getCourses()
	const enrollmentsData = getEnrollments()

	const [allCourses, enrollments] = await Promise.all([
		coursesData,
		enrollmentsData,
	])

	if (!allCourses || !enrollments) {
		return notFound()
	}

	const courses = allCourses.filter((course) => {
		return enrollments.some((enrollment) => {
			return enrollment.course_id === course.course_id
		})
	})

	if (!courses) {
		notFound()
	}

	return (
		<AppShell>
			<main>
				<section className="flex px-7 gap-4">
					<Suspense fallback={<CourseSkeleton />}>
						{courses.length !== 0 ? (
							courses.map((course) => (
								<Course
									key={course.course_id}
									course={course}
								/>
							))
						) : (
							<p className="text-destructive">No courses</p>
						)}
					</Suspense>
				</section>
			</main>
		</AppShell>
	)
}
