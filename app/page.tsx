import AppShell from '@/components/app-shell'
import { Course } from '@/components/course'
import { CourseSkeleton } from '@/components/course-skeleton'
import { createClient } from '@/lib/supabase/server'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { unstable_noStore } from 'next/cache'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

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
		.select('user_id, course_id')
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
		<AppShell>
			<main>
				<section className="flex px-7 gap-4">
					<Suspense fallback={<CourseSkeleton />}>
						{courses.length === 0 ? (
							<div className=" justify-center items-center flex w-full h-[90vh]">
								<p className="text-2xl">
									Click enroll course on the{' '}
									<PlusCircledIcon className="inline size-6" />{' '}
									plus tab to get started
								</p>
							</div>
						) : (
							courses.map((course) => (
								<Course
									key={course.course_id}
									course={course}
								/>
							))
						)}
					</Suspense>
				</section>
			</main>
		</AppShell>
	)
}
