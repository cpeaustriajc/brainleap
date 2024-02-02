import { createClient as createStaticClient } from '@/lib/supabase/static'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { CreateOutputForm } from './create-output-form'

export async function generateStaticParams() {
	const supabase = createStaticClient()
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
	const supabase = createServerClient(cookieStore)

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
				<p>Assignment Due Date: {assignmentDueDate.toLocaleDateString()}</p>
				<p>{assignmentResult.description}</p>
			</div>
			<div>
				<div>
					<strong>Submit Output</strong>
					<p>
						Submit your output for this assignment (preferrably in PDF format)
					</p>
				</div>
				<div>
					<CreateOutputForm
						assignment={assignmentResult}
						courseId={params.id}
					/>
				</div>
			</div>
		</div>
	)
}
