import { createClient } from '@/lib/supabase/static'
import { Tab, TabItem, TabList, Tabs } from '@/ui/tabs'
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
			<Tabs>
				<TabList orientation="horizontal">
					<TabItem pathname={`/course/${params.id}`}>
						<Tab href={`/course/${params.id}`}>Announcements</Tab>
					</TabItem>
					<TabItem pathname={`/course/${params.id}/assignments`}>
						<Tab href={`/course/${params.id}/assignments`}>Assignments</Tab>
					</TabItem>
					<TabItem pathname={`/course/${params.id}/grades`}>
						<Tab href={`/course/${params.id}/grades`}>Grades</Tab>
					</TabItem>
					<TabItem pathname={`/course/${params.id}/people`}>
						<Tab href={`/course/${params.id}/people`}>People</Tab>
					</TabItem>
				</TabList>
			</Tabs>
			<main className="dark:bg-stone-900 px-4 rounded-b-lg">{tabs}</main>
		</React.Fragment>
	)
}
