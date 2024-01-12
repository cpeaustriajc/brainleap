'use client'

import * as ReactAria from 'react-aria-components'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useFormState, useFormStatus } from 'react-dom'
import { gradeOutput } from '@/lib/actions/output'
import { OutputProps } from './output'
import { buttonVariants } from './ui/button'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<ReactAria.Button
			isDisabled={pending}
			type="submit"
			className={buttonVariants()}
		>
			Submit
		</ReactAria.Button>
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
		<ReactAria.Form
			action={action}
			className="flex flex-row gap-2"
			validationErrors={state.errors}
		>
			<ReactAria.NumberField
				defaultValue={output.grade ?? 0}
				isRequired
				minValue={0}
				maxValue={100}
				name="grade"
				className={'flex flex-col gap-2'}
			>
				<div className="flex flex-row">
					<Label className="sr-only">Grade</Label>
					<ReactAria.Button
						className={buttonVariants()}
						slot="decrement"
					>
						-
					</ReactAria.Button>
					<Input className="shrink" />
					<ReactAria.Button
						className={buttonVariants()}
						slot="increment"
					>
						+
					</ReactAria.Button>
				</div>
				<ReactAria.FieldError className="text-destructive font-medium" />
			</ReactAria.NumberField>
			<Submit />
		</ReactAria.Form>
	)
}
