import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Tables } from '@/lib/database.types'
import { CreateAnnouncement } from '@/components/create-announcement'
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
							<Card key={announcement.announcement_id}>
								<CardHeader>
									<CardTitle>{announcement.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{announcement.description}</p>
								</CardContent>
								{announcement.attachment && (
									<CardFooter>
										<Attachments
											attachment={announcement.attachment}
										/>
									</CardFooter>
								)}
							</Card>
						))
					) : (
						<p>This is the start of your classroom.</p>
					)}
				</div>
			</div>
		</section>
	)
}
