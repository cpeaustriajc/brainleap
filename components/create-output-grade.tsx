'use client'

import { gradeOutput } from '@/lib/actions/output'
import { useFormState, useFormStatus } from 'react-dom'
import { OutputProps } from './output'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<button disabled={pending} type="submit">
			Submit
		</button>
	)
}

export function CreateOutputGrade({
	output,
	courseId,
	assignmentId,
}: OutputProps) {
	const [state, action] = useFormState(
		gradeOutput.bind(null, courseId, assignmentId, output.output_id),
		{
			message: undefined,
			errors: {},
		},
	)

	return (
		<form action={action}>
			<div>
				<div>
					<label>Grade</label>
					<button type="button">-</button>
					<input />
					<button type="button">+</button>
				</div>

				<Submit />
			</div>
		</form>
	)
}
