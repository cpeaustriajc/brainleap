import { Badge } from '@/components/ui/badge'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getAssignments } from '@/lib/queries/assignment'
import { getCourseById } from '@/lib/queries/course'
import { getProfileById } from '@/lib/queries/profile'
import { getEnrollments } from '@/lib/queries/enrollment'
import { getAnnouncements } from '@/lib/queries/announcement'
import { CreateAssignment } from '@/components/create-assignment'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { notFound, redirect } from 'next/navigation'
import { Tables } from '@/lib/database.types'
import { getFilename, getURL } from '@/lib/utils'
import { unstable_noStore } from 'next/cache'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { FileIcon, PersonIcon } from '@radix-ui/react-icons'
import { CreateAnnouncement } from '@/components/create-announcement'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Suspense } from 'react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

type Props = {
	params: {
		id: string
	}
}

export async function generateStaticParams() {
	const supabase = createBrowserClient()
	const { data: courseIds, error } = await supabase
		.from('courses')
		.select('course_id')

	if (error) throw new Error(`${error.message}`)

	return courseIds.map((courseId) => ({
		params: {
			id: courseId,
		},
	}))
}

export default async function Page({ params }: Props) {
	unstable_noStore()
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const profile = await getProfileById(user.id)

	if (!profile) {
		redirect('/auth/signin')
	}

	const course = await getCourseById(params.id)

	if (!course) {
		notFound()
	}

	const announcements = await getAnnouncements(course.course_id)

	if (!announcements) {
		notFound()
	}

	const assignments = await getAssignments(course.course_id)

	if (!assignments) {
		notFound()
	}

	const enrollments = await getEnrollments()

	if (!enrollments) {
		notFound()
	}

	const enrolledPeople = enrollments.filter((enrollment) => {
		if (enrollment.course_id !== course.course_id) return false

		return enrollment.user_id
	})

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
					<Suspense fallback={<p>Loading...</p>}>
						<Announcements
							course={course}
							profile={profile}
							announcements={announcements}
						/>
					</Suspense>
				</TabsContent>
				<TabsContent value="assignments">
					<Suspense fallback={<p>Loading...</p>}>
						<Assignments
							course={course}
							assignments={assignments}
							profile={profile}
						/>
					</Suspense>
				</TabsContent>
				<TabsContent value="people">
					<Suspense fallback={<p>Loading...</p>}>
						<People enrolledPeople={enrolledPeople} />
					</Suspense>
				</TabsContent>
				{profile.role === 'instructor' && (
					<TabsContent value="grades">
						<Suspense fallback={<p>Loading...</p>}>
							<Grades assignments={assignments} />
						</Suspense>
					</TabsContent>
				)}
			</Tabs>
		</main>
	)
}

async function Assignments({
	course,
	assignments,
	profile,
}: {
	course: Tables<'courses'>
	assignments: Tables<'assignments'>[]
	profile: Tables<'profiles'>
}) {
	return (
		<>
			<div className="border rounded px-4 py-2 w-1/2 mx-auto">
				{profile.role === 'instructor' && (
					<CreateAssignment course={course} />
				)}

				<div className="flex flex-col gap-4 py-8">
					{assignments.length > 0 ? (
						assignments.map((assignment) => (
							<Card key={assignment.assignment_id}>
								<CardHeader>
									<CardTitle>{assignment.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="whitespace-pre-line">
										{assignment.description}
									</p>
								</CardContent>
								<CardFooter className="flex flex-col gap-4">
									{assignment.attachment && (
										<div className="grid grid-cols-2">
											<Attachments
												attachment={
													assignment.attachment
												}
											/>
										</div>
									)}
									{profile.role === 'student' && (
										<Button asChild className="w-full">
											<Link
												href={`/course/${course.course_id}/${assignment.assignment_id}`}
											>
												<span className="pl-2">
													View More
												</span>
											</Link>
										</Button>
									)}
									{profile.role === 'instructor' && (
										<Button asChild className="w-full">
											<Link
												href={`/course/${course.course_id}/${assignment.assignment_id}`}
											>
												<span className="pl-2">
													Grade
												</span>
											</Link>
										</Button>
									)}
								</CardFooter>
							</Card>
						))
					) : (
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							Your assignments will appear here.
						</p>
					)}
				</div>
			</div>
		</>
	)
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
	return (
		<section className="grid grid-cols-5">
			{profile.role === 'instructor' && (
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
				<CreateAnnouncement course={course} />
				<div className="flex flex-col gap-4 py-8">
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
								{announcement.attachment && (
									<CardFooter className="grid grid-cols-2">
										<Attachments
											attachment={announcement.attachment}
										/>
									</CardFooter>
								)}
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

function Attachments({
	attachment,
}: {
	attachment: Tables<'announcements'>['attachment']
}) {
	if (!attachment) return null

	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data } = supabase.storage.from('files').getPublicUrl(attachment)
	const filename = getFilename(attachment)
	return (
		<Button asChild variant="outline" size="lg">
			<Link href={data.publicUrl} download target="_blank">
				<FileIcon className="size-4" />
				<span className="pl-2">{filename}</span>
			</Link>
		</Button>
	)
}

async function People({
	enrolledPeople,
}: {
	enrolledPeople: Tables<'enrollments'>[]
}) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data } = await supabase
		.from('profiles')
		.select('*')
		.in(
			'profile_id',
			enrolledPeople.map((enrolledPerson) => enrolledPerson.user_id),
		)

	if (!data) return null

	const students = data.filter((person) => person.role === 'student')
	const instructors = data.filter((person) => person.role === 'instructor')

	return (
		<div className="w-1/2 mx-auto">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Instructors
			</h2>
			<ul className="py-4">
				{instructors.map((instructor) => (
					<li
						key={instructor.username}
						className="flex gap-4 items-center"
					>
						<Avatar>
							<AvatarImage
								src={instructor.avatar_url ?? ''}
								alt={instructor.username ?? ''}
							/>
							<AvatarFallback>
								<PersonIcon />
							</AvatarFallback>
						</Avatar>
						<span>
							{instructor.full_name ?? instructor.username}
						</span>
					</li>
				))}
			</ul>

			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Students
			</h2>
			<ul className="py-4">
				{students.map((student) => (
					<li
						key={student.username}
						className="flex gap-4 items-center"
					>
						<Avatar>
							<AvatarImage
								src={student.avatar_url ?? ''}
								alt={student.username ?? ''}
							/>
							<AvatarFallback>
								<PersonIcon />
							</AvatarFallback>
						</Avatar>
						<span>{student.full_name ?? student.username}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

async function Grades({
	assignments,
}: {
	assignments: Tables<'assignments'>[]
}) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const enrollments = await getEnrollments()

	const { data: enrolledPeopleQueryData, error: enrolledPeopleError } =
		await supabase
			.from('profiles')
			.select()
			.in(
				'profile_id',
				enrollments.map((enrollment) => enrollment.user_id),
			)

	if (enrolledPeopleError) throw enrolledPeopleError

	const enrolledPeople = enrolledPeopleQueryData

	const { data: outputsQueryData, error: outputsError } = await supabase
		.from('outputs')
		.select()
		.in(
			'assignment_id',
			assignments.map((assignment) => assignment.assignment_id),
		)
		.in(
			'student_id',
			enrolledPeople.map((person) => person.profile_id),
		)

	const students = enrolledPeople.filter(
		(profile) => profile.role === 'student',
	)
	if (outputsError) throw outputsError
	const outputs = outputsQueryData

	return (
		<div className="w-1/2 mx-auto">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Grades
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Student</TableHead>
						{assignments.map((assignment) => (
							<TableHead key={assignment.assignment_id}>
								{assignment.title}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						{students.map((student) => (
							<TableCell key={student.username}>
								{student.full_name ?? student.username}
							</TableCell>
						))}
						{outputs.map((output) => (
							<TableCell key={output.output_id}>
								{output.grade}
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
