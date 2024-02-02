import { createClient } from '@/lib/supabase/static'
import Link from 'next/link'
import React from 'react'

export async function generateStaticParams() {
	const supabase = createClient()

	const { data, error } = await supabase.from('courses').select('course_id')

	if (error) throw new Error(`${error.message}`)

	return data.map((id) => ({
		params: {
			id,
		},
	}))
}

export default function CourseLayout({
	tabs,
	params,
}: { tabs: React.ReactNode; params: { id: string } }) {
	return (
		<React.Fragment>
			<nav>
				<ul className="flex gap-2">
					<li>
						<Link href={`/course/${params.id}`}>Announcements</Link>
					</li>
					<li>
						<Link href={`/course/${params.id}/assignments`}>Assignments</Link>
					</li>
					<li>
						<Link href={`/course/${params.id}/grades`}>Grades</Link>
					</li>
					<li>
						<Link href={`/course/${params.id}/people`}>People</Link>
					</li>
				</ul>
			</nav>
			{tabs}
		</React.Fragment>
	)
}
