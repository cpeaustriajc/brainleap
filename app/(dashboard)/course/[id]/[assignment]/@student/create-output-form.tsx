'use client'

import { createOutput } from '@/lib/actions/output'
import { Tables } from '@/lib/database.types'
import { useFormState, useFormStatus } from 'react-dom'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<button disabled={pending} type="submit">
			Submit
		</button>
	)
}

export function CreateOutputForm({
	assignment,
	courseId,
}: {
	assignment: Tables<'assignments'>
	courseId: string
}) {
	const createOutputBound = createOutput.bind(
		null,
		assignment.assignment_id,
		courseId,
	)

	const [state, action] = useFormState(createOutputBound, {
		errors: {},
		message: undefined,
	})

	return (
		<form action={action}  >
			<input type="file" name="output" id="output" required />
			<Submit />
		</form>
	)
}
