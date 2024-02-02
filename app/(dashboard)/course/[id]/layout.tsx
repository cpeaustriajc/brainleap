import { createClient } from '@/lib/supabase/static'
import React from 'react'
import { Tabs } from '../components/tabs'

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

export default function CourseLayout({ tabs }: { tabs: React.ReactNode }) {
	return (
		<React.Fragment>
			<Tabs />
			<main className="dark:bg-stone-900 px-4 rounded-b-lg">{tabs}</main>
		</React.Fragment>
	)
}
