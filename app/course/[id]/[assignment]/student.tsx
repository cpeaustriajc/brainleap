'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { createOutput } from '@/lib/actions/output'
import { Tables } from '@/lib/database.types'
import { FieldError, Form } from 'react-aria-components'
import { useFormState, useFormStatus } from 'react-dom'

export const StudentView = ({
	assignment,
	userId,
	courseId,
}: {
	assignment: Tables<'assignments'>
	userId: string
	courseId: string
}) => {
	const createOutputBound = createOutput.bind(
		null,
		assignment.assignment_id,
		userId,
		courseId,
	)

	const [state, action] = useFormState(createOutputBound, {
		errors: {},
		message: undefined,
	})
	const { pending } = useFormStatus()
	return (
		<div className="max-w-2xl mx-auto flex flex-col gap-2">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{assignment.title}
			</h1>
			<Separator className="my-8" />
			<div>
				<p className="whitespace-pre-wrap">{assignment.description}</p>
			</div>
			<Form
				action={action}
				className="flex flex-col gap-4"
				validationErrors={state.errors}
			>
				<Input type="file" name="output" id="output" required />
				<Button disabled={pending} type="submit">
					Submit
				</Button>
				<FieldError className="text-destructive font-medium" />
			</Form>
		</div>
	)
}
