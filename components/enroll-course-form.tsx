import { useFormState, useFormStatus } from 'react-dom'
import { TextField, TextFieldDescription } from './text-field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { createEnrollment } from '@/lib/actions/enrollment'
import { buttonVariants } from '../ui/button'

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

			validationErrors={state.errors}
		>
			<TextField

				name="courseCode"
				type="text"
				isRequired
			>
				<Label>Class Code</Label>
				<Input placeholder="Class Code" />
				<TextFieldDescription  >
					Ask your teacher for the class code. Then enter it here.
				</TextFieldDescription>
				<ReactAria.FieldError   />
			</TextField>
			<Submit />
		</ReactAria.Form>
	)
}
