import { Badge } from '@/components/ui/badge'
import { cookies } from 'next/headers'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { getPosts, getCourse, getProfile } from '@/lib/queries'
import { CreateAssignment } from '@/components/create-assignment'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Tables } from '@/lib/database.types'
import { getURL } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { createPost } from '@/lib/actions/post'
import { revalidateTag } from 'next/cache'

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

	const course = await getCourse(params.id)

	if (!course) {
		notFound()
	}

	const posts = await getPosts(course.course_id)

	if (!posts) {
		notFound()
	}

	const profile = await getProfile(user.id)

	if (!profile) {
		notFound()
	}

	const action = async (formData: FormData) => {
		'use server'
		const createPostWithCourseId = createPost.bind(null, course.course_id)

		createPostWithCourseId(formData)
		revalidateTag('posts')
	}

	return (
		<main className="px-8 py-6 gap-6 grid grid-flow-row">
			<section className="flex flex-row gap-8">
				<div>
					<h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
						{course.course_name}
					</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-500">
						{course.course_description}
					</p>
				</div>
				<div className="p-4 border rounded border-border">
					<p>Room: {course.room}</p>
					<p>Subject: {course.subject}</p>
					<p>Section: {course.section}</p>
				</div>
			</section>

			<form
				action={action}
				className="flex flex-col gap-2 border border-border px-4 py-2 rounded"
			>
				<div className="flex flex-col gap-4">
					<Input
						type="text"
						name="title"
						id="title"
						placeholder="Title of your announcement"
					/>
					<Textarea
						placeholder="Announce something to the class"
						className="resize-none"
						id="description"
						name="description"
					/>
				</div>

				<Button type="submit" className="justify-self-end">
					Post
				</Button>
			</form>

			{profile?.role === 'instructor' && (
				<>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Get started by sharing the class code:{' '}
					</p>
					<Badge>{course.course_id}</Badge>
					<div className="my-2">
						<CreateAssignment course={course} />
					</div>
				</>
			)}

			<div className="mt-10 grid">
				{posts.length > 0 ? (
					posts.map((post) => (
						<Card key={post.post_id}>
							<CardHeader>
								<CardTitle>{post.title}</CardTitle>
								{post.due_date && <p>Due {post.due_date}</p>}
							</CardHeader>
							<CardContent>
								<p className="whitespace-pre-line">
									{post.description}
								</p>
							</CardContent>
							<CardFooter>
								<Button asChild variant={'link'}>
									<Link
										href={`/course/${course?.course_id}/${post.post_id}`}
									>
										View More
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))
				) : (
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						This is the start of your classroom.
					</p>
				)}
			</div>
		</main>
	)
}
