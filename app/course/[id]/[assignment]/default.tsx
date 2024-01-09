import { createClient as createBrowserClient } from '@/lib/supabase/client'

/**
 * Okay this somehow works, will look into it after the defense.
 */

export async function generateStaticParams() {
	const supabase = createBrowserClient()
	const { data: assignments, error } = await supabase
		.from('assignments')
		.select('assignment_id')

	if (error) {
		throw new Error(`${error.message}`)
	}

	return assignments.map((assignment) => ({
		assignment: assignment.assignment_id,
	}))
}

export default function Page() {
	return <main>You are not supposed to be here. Go back.</main>
}
