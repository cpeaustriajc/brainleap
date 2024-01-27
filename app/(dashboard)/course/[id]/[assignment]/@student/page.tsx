import { CreateOutputForm } from './create-output-form'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

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

export default async function Page({
	params,
}: {
	params: { assignment: string; id: string }
}) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: assignmentResult, error: assignmentError } = await supabase
		.from('assignments')
		.select()
		.eq('assignment_id', params.assignment)
		.single()

	if (assignmentError) throw assignmentError

	const assignmentDueDate = new Date(assignmentResult.due_date ?? 0)

	return (
		<div>
			<div>
				<h1>{assignmentResult.title}</h1>
				<p>
					Assignment Due Date:{' '}
					{assignmentDueDate.toLocaleDateString()}
				</p>
				<p>{assignmentResult.description}</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Submit Output</CardTitle>
					<CardDescription>
						Submit your output for this assignment (preferrably in
						PDF format)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CreateOutputForm
						assignment={assignmentResult}
						courseId={params.id}
					/>
				</CardContent>
			</Card>
		</div>
	)
}
