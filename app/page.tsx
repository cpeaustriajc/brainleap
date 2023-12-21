import AppShell from '@/components/app-shell'
import { Course } from '@/components/course'
import { CourseSkeleton } from '@/components/course-skeleton'
import { getCourses, getEnrollments, getProfile } from '@/lib/queries'
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
	const profileData = await getProfile(user.id)

	const [allCourses, enrollments, profile] = await Promise.all([
		coursesData,
		enrollmentsData,
		profileData,
	])

	if (!allCourses || !enrollments) {
		return notFound()
	}

	const courses = allCourses.filter((course) => {
		return enrollments.some((enrollment) => {
			return (
				enrollment.course_id === course.course_id &&
				enrollment.user_id === profile.profile_id
			)
		})
	})
	console.log(courses)
	if (!courses) {
		notFound()
	}

	return (
		<AppShell>
			<main>
				<section className="flex px-7 gap-4">
					<Suspense fallback={<CourseSkeleton />}>
						{courses.map((course) => (
							<Course key={course.course_id} course={course} />
						))}
					</Suspense>
				</section>
			</main>
		</AppShell>
	)
}
