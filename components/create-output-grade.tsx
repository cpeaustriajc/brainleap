'use client'

import { Label } from '../ui/label'
import { useFormState, useFormStatus } from 'react-dom'
import { gradeOutput } from '@/lib/actions/output'
import { OutputProps } from './output'
import { buttonVariants } from '../ui/button'

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
		<ReactAria.Form action={action} validationErrors={state.errors}>
			<div>
				<ReactAria.Group>
					<ReactAria.NumberField
						defaultValue={output.grade ?? 0}
						isRequired
						minValue={0}
						maxValue={100}
						name="grade"
						className={'flex flex-col gap-2'}
					>
						<div>
							<Label>Grade</Label>
							<ReactAria.Button
								className={buttonVariants({
									variant: 'outline',
								})}
								slot="decrement"
							>
								-
							</ReactAria.Button>
							<ReactAria.Input />
							<ReactAria.Button
								className={buttonVariants({
									variant: 'outline',
								})}
								slot="increment"
							>
								+
							</ReactAria.Button>
						</div>
						<ReactAria.FieldError />
					</ReactAria.NumberField>
				</ReactAria.Group>

				<Submit />
			</div>
		</ReactAria.Form>
	)
}
