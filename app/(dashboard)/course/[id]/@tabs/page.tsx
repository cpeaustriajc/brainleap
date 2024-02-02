import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Attachments } from '../components/attachments'
import { CreateAnnouncement } from '../components/forms/create-announcement-form'

export default async function Announcements({
	params,
}: { params: { id: string } }) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.limit(1)
		.eq('profile_id', user.id)
		.single()

	if (!profile) {
		redirect('/auth/signin')
	}

	const { data: course } = await supabase
		.from('courses')
		.select('*')
		.eq('course_id', params.id)
		.limit(1)
		.single()

	if (!course) {
		notFound()
	}

	const { data: announcements } = await supabase
		.from('announcements')
		.select('*')
		.eq('course_id', course.course_id)

	if (!announcements) {
		notFound()
	}

	return (
		<section>
			{profile.role === 'instructor' && (
				<div>
					<div>
						<p>Get started by sharing the class code: </p>
						<div>{course.course_id}</div>
					</div>
					<div>
						<p>Room: {course.room}</p>
						<p>Subject: {course.subject}</p>
						<p>Section: {course.section}</p>
					</div>
				</div>
			)}

			<div>
				<CreateAnnouncement course={course} />
				<div>
					{announcements.length > 0 ? (
						announcements.map((announcement) => (
							<div key={announcement.announcement_id}>
								<div>
									<strong>{announcement.title}</strong>
								</div>
								<div>
									<p>{announcement.description}</p>
								</div>
								{announcement.attachment && (
									<div>
										<Attachments attachment={announcement.attachment} />
									</div>
								)}
							</div>
						))
					) : (
						<p>This is the start of your classroom.</p>
					)}
				</div>
			</div>
		</section>
	)
}
