import { Badge } from '@/components/ui/badge'
import { cookies } from 'next/headers'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { getAnnouncements, getCourse, getProfile } from '@/lib/queries'
import { CreateAssignment } from '@/components/create-assignment'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { notFound, redirect } from 'next/navigation'
import { Tables } from '@/lib/database.types'
import { getURL } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { createAnnouncement } from '@/lib/actions/announcement'
import { revalidateTag } from 'next/cache'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
	params: {
		id: string
	}
}

export async function generateStaticParams() {
	const url = getURL('/api/course/ids')
	const res = await fetch(url)
	const courseIds: Tables<'courses'>['course_id'][] = await res.json()

	return courseIds.map((courseId) => ({
		params: {
			id: courseId,
		},
	}))
}

export default async function Page({ params }: Props) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const profile = await getProfile(user.id)

	if (!profile) {
		redirect('/auth/signin')
	}

	const course = await getCourse(params.id)

	if (!course) {
		notFound()
	}

	const announcements = await getAnnouncements(course.course_id)

	if (!announcements) {
		notFound()
	}

	return (
		<main className="px-8 py-6 flex flex-col">
			<section>
				<h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
					{course.course_name}
				</h1>
				<p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-500">
					{course.course_description}
				</p>
			</section>
			<Tabs defaultValue="announcements" className="py-8">
				<TabsList>
					<TabsTrigger value="announcements">
						Announcements
					</TabsTrigger>
					<TabsTrigger value="assignments">Assignments</TabsTrigger>
					<TabsTrigger value="people">People</TabsTrigger>
					<TabsTrigger value="grades">Grades</TabsTrigger>
				</TabsList>
				<TabsContent value="announcements">
					<Announcements
						course={course}
						profile={profile}
						announcements={announcements}
					/>
				</TabsContent>
				<TabsContent value="assignments">
					<Assignments course={course} />
				</TabsContent>
				<TabsContent value="people"></TabsContent>
				<TabsContent value="grades">
					<div>Grades</div>
				</TabsContent>
			</Tabs>
		</main>
	)
}

async function Assignments({ course }: { course: Tables<'courses'> }) {
	return <CreateAssignment course={course} />
}

function Announcements({
	profile,
	course,
	announcements,
}: {
	profile: Tables<'profiles'>
	course: Tables<'courses'>
	announcements: Tables<'announcements'>[]
}) {
	const action = async (formData: FormData) => {
		'use server'
		const createAnnouncementWithCourseId = createAnnouncement.bind(
			null,
			course.course_id,
		)

		createAnnouncementWithCourseId(formData)
		revalidateTag('annoyuncements')
	}
	return (
		<section className="grid grid-cols-5">
			{profile?.role === 'instructor' && (
				<div className="grid pt-10 col-span-2 place-items-start place-content-start gap-4">
					<div>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							Get started by sharing the class code:{' '}
						</p>
						<Badge>{course.course_id}</Badge>
					</div>
					<div className="p-4 border rounded border-border">
						<p>Room: {course.room}</p>
						<p>Subject: {course.subject}</p>
						<p>Section: {course.section}</p>
					</div>
				</div>
			)}

			<div className="pt-10 col-span-3 border px-4 py-2">
				<form
					action={action}
					className="flex flex-col gap-2 border border-border px-4 py-2 rounded"
				>
					<div className="flex flex-col gap-4">
						<Input
							type="text"
							name="title"
							id="title"
							required
							placeholder="Title of your announcement"
						/>
						<Textarea
							placeholder="Announce something to the class"
							className="resize-none"
							id="description"
							required
							name="description"
						/>
					</div>

					<Button type="submit" className="justify-self-end">
						Announce
					</Button>
				</form>
				<div className="py-8">
					{announcements.length > 0 ? (
						announcements.map((announcement) => (
							<Card key={announcement.announcement_id}>
								<CardHeader>
									<CardTitle>{announcement.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="whitespace-pre-line">
										{announcement.description}
									</p>
								</CardContent>
							</Card>
						))
					) : (
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							This is the start of your classroom.
						</p>
					)}
				</div>
			</div>
		</section>
	)
}
