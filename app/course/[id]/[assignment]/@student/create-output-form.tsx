'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createOutput } from '@/lib/actions/output'
import { Tables } from '@/lib/database.types'
import * as ReactAria from 'react-aria-components'
import { useFormState, useFormStatus } from 'react-dom'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<Button disabled={pending} aria-disabled={pending} type="submit">
			Submit
		</Button>
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
		<ReactAria.Form
			action={action}
			className="flex flex-col gap-4"
			validationErrors={state.errors}
		>
			<Input type="file" name="output" id="output" required />
			<Submit />
			<ReactAria.FieldError className="text-destructive font-medium" />
		</ReactAria.Form>
	)
}
