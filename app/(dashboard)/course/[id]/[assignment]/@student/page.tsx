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
		<div className="mx-auto px-16 max-w-screen-2xl pt-8 grid grid-cols-4 gap-4">
			<div className="col-span-2">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{assignmentResult.title}
				</h1>
				<p className="font-bold">
					Assignment Due Date:{' '}
					{assignmentDueDate.toLocaleDateString()}
				</p>
				<p className="whitespace-pre-wrap">
					{assignmentResult.description}
				</p>
			</div>
			<Card className='col-start-4'>
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
