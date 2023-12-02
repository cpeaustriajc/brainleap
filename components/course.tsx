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

export function Course({ course }: { course: Tables<'courses'> }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{course.course_name}</CardTitle>
				<CardDescription>{course.course_description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>You have 0 assignments for this week</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full" asChild>
					<Link href={`/course/${course.course_id}`}>View More</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
