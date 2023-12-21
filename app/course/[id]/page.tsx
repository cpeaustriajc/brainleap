import { Badge } from '@/components/ui/badge'
import { cookies } from 'next/headers'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { getPosts, getCourse, getProfile } from '@/lib/queries'
import { AddPost } from '@/components/add-post'
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

	return (
		<main className="px-8">
			<section>
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{course.course_name}
				</h1>
				<p className="leading-7 [&:not(:first-child)]:mt-6">
					{course.course_description}
				</p>
			</section>
			<section className="p-4 border rounded border-border">
				<p>Room: {course.room}</p>
				<p>Subject: {course.subject}</p>
				<p>Section: {course.section}</p>
			</section>
			{profile?.role === 'instructor' && (
				<>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Get started by sharing the class code:{' '}
					</p>
					<Badge>{course.course_id}</Badge>
				</>
			)}

			{profile?.role === 'instructor' && (
				<div className="my-2">
					<AddPost course={course} />
				</div>
			)}

			<div className="mt-10 grid">
				{posts.map((post) => (
					<Card key={post.post_id}>
						<CardHeader>
							<CardTitle>{post.title}</CardTitle>
							<p>Due {post.due_date}</p>
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
				))}
			</div>
		</main>
	)
}
