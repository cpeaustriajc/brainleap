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

export function Course({ course }: { course: Tables<'classes'> }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{course.class_name}</CardTitle>
				<CardDescription>{course.class_description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>You have 0 assignments for this week</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full" asChild>
					<Link href={`/course/${course.class_id}`}>View More</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
