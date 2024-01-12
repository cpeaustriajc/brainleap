import { useFormState, useFormStatus } from 'react-dom'
import { TextField, TextFieldDescription } from './text-field'
import { Input } from './ui/input'
import { Label } from './ui/label'
import * as ReactAria from 'react-aria-components'
import { createEnrollment } from '@/lib/actions/enrollment'
import { buttonVariants } from './ui/button'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<ReactAria.Button
			className={buttonVariants()}
			isDisabled={pending}
			type="submit"
		>
			{pending ? 'Joining Class...' : 'Join Class'}
		</ReactAria.Button>
	)
}

export function EnrollCourseForm() {
	const [state, action] = useFormState(createEnrollment, {
		errors: {},
		message: undefined,
	})
	return (
		<ReactAria.Form
			action={action}
			className="grid gap-4 p-4"
			validationErrors={state.errors}
		>
			<TextField
				className="flex flex-col gap-2"
				name="courseCode"
				type="text"
				isRequired
			>
				<Label>
					Class Code
				</Label>
				<Input placeholder="Class Code" />
				<TextFieldDescription className="text-xs px-1">
					Ask your teacher for the class code. Then enter it here.
				</TextFieldDescription>
				<ReactAria.FieldError className="text-destructive font-medium" />
			</TextField>
			<Submit />
		</ReactAria.Form>
	)
}
