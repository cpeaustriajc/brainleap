'use client'

import { Form, NumberField, Button, FieldError } from 'react-aria-components'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useFormState, useFormStatus } from 'react-dom'
import { gradeOutput } from '@/lib/actions/output'
import { OutputProps } from './output'
import { buttonVariants } from './ui/button'

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
	const { pending, data } = useFormStatus()

	return (
		<Form
			action={action}
			className="flex flex-row gap-2"
			validationErrors={state.errors}
		>
			<NumberField
				defaultValue={output.grade ?? 0}
				isRequired
				minValue={0}
				maxValue={100}
				name="grade"
				className={'flex flex-col gap-2'}
			>
				<div className="flex flex-row">
					<Label className="sr-only">Grade</Label>
					<Button className={buttonVariants()} slot="decrement">
						-
					</Button>
					<Input className="shrink" />
					<Button className={buttonVariants()} slot="increment">
						+
					</Button>
				</div>
				<FieldError className="text-destructive font-medium" />
			</NumberField>
			<Button
				isDisabled={pending}
				className={buttonVariants()}
				type="submit"
			>
				Grade
			</Button>
		</Form>
	)
}
