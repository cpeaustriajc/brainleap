import { Tables } from '@/lib/definitions'
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

export async function Course({ course }: { course: Tables<'courses'> }) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const assignments = await supabase.from('assignments').select('*').eq('course_id', course.course_id)

	return (
		<Card>
			<CardHeader>
				<CardTitle>{course.course_name}</CardTitle>
				<CardDescription>{course.course_description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>You currently have {assignments.count === null ? '0' : assignments.count} pending assigments</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full" asChild>
					<Link href={`/course/${course.course_id}`}>View More</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
