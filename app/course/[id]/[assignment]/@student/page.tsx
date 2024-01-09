import { Separator } from '@/components/ui/separator'
import { CreateOutputForm } from './create-output-form'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

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

	return (
		<div className="max-w-2xl mx-auto flex flex-col gap-2">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{assignmentResult.title}
			</h1>
			<Separator className="my-8" />
			<div>
				<p className="whitespace-pre-wrap">
					{assignmentResult.description}
				</p>
			</div>
			<CreateOutputForm
				assignment={assignmentResult}
				courseId={params.id}
			/>
		</div>
	)
}
