import { Tables } from '@/lib/database.types'
import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { getProfile } from '@/lib/queries'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { PersonIcon } from '@radix-ui/react-icons'

export async function Course({ course }: { course: Tables<'courses'> }) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		notFound()
	}

	const profile = await supabase
		.from('profiles')
		.select('role')
		.eq('profile_id', session?.user?.id)
		.single()
	const instructorProfile = await getProfile(course.instructor_id ?? '')
	if (!profile.data) {
		notFound()
	}

	const post = await supabase
		.from('posts')
		.select('*')
		.eq('course_id', course.course_id)

	if (!post.data) {
		notFound()
	}

	return (
		<Card className="max-w-sm h-60">
			<CardHeader className="flex flex-row justify-between items-center">
				<div>
					<CardTitle>{course.course_name}</CardTitle>
					<CardDescription>
						{course.course_description}
					</CardDescription>
				</div>
				<div>
					<Avatar>
						<AvatarImage src={instructorProfile.avatar_url ?? ''} />
						<AvatarFallback>
							<PersonIcon />
						</AvatarFallback>
					</Avatar>
				</div>
			</CardHeader>
			<CardContent>
				<p>
					You currently have{' '}
					{post.data.length === 0 ? 'no' : post.data.length} pending{' '}
					{post.data.length === 0 ? 'classwork' : 'classworks'}{' '}
					{profile.data.role === 'instructor'
						? 'to grade'
						: 'to complete'}
					.
				</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full" asChild>
					<Link href={`/course/${course.course_id}`}>View More</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
