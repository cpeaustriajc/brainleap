import AppShell from '@/components/app-shell'
import { Course } from '@/components/course'
import { CourseSkeleton } from '@/components/course-skeleton'
import { getCourses, getEnrollments } from '@/lib/queries'
import { Suspense } from 'react'

export default async function Page() {
	const coursesData = getCourses()
	const enrollmentsData = getEnrollments()

	const [allCourses, enrollments] = await Promise.all([
		coursesData,
		enrollmentsData,
	])

	const courses = allCourses?.filter((course) => {
		return enrollments?.some((enrollment) => {
			return enrollment.course_id === course.course_id
		})
	})

	return (
		<AppShell>
			<main>
				<section className="flex px-7 gap-4">
					<Suspense fallback={<CourseSkeleton />}>
						{courses?.length !== 0
							? courses?.map((course) => (
									<Course
										key={course.course_id}
										course={course}
									/>
							  ))
							: 'No courses'}
					</Suspense>
				</section>
			</main>
		</AppShell>
	)
}
