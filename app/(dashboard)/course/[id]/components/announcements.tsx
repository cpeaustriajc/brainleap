import { CreateAnnouncement } from './forms/create-announcement-form'
import { Tables } from '@/lib/database.types'
import { Attachments } from './attachments'

export function Announcements({
	profile,
	course,
	announcements,
}: {
	profile: Tables<'profiles'>
	course: Tables<'courses'>
	announcements: Tables<'announcements'>[]
}) {
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
