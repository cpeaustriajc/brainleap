import { createCourse } from '@/lib/actions/course'
import * as ReactAria from 'react-aria-components'
import { useFormState, useFormStatus } from 'react-dom'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { buttonVariants } from '../ui/button'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<ReactAria.Button className={buttonVariants()} isDisabled={pending} type="submit">
			{pending ? 'Creating Class...' : 'Create Class'}
		</ReactAria.Button>
	)
}

export function CreateCourseForm() {
	const [state, action] = useFormState(createCourse, {
		errors: {},
		message: undefined,
	})
	return (
		<ReactAria.Form
			action={action}
			className="grid gap-2 p-4"
			validationErrors={state.errors}
		>
			<ReactAria.TextField name="title" type="text" isRequired>
				<Label>Class Title</Label>
				<Input placeholder="Class Title" />
				<ReactAria.FieldError className="text-destructive font-medium" />
			</ReactAria.TextField>
			<ReactAria.TextField name="section" type="text" isRequired>
				<Label>Section</Label>
				<Input placeholder="Section" />
				<ReactAria.FieldError className="text-destructive font-medium" />
			</ReactAria.TextField>
			<ReactAria.TextField type="text" name="subject">
				<Label>Subject</Label>
				<Input placeholder="Subject" />
				<ReactAria.FieldError className="text-destructive font-medium" />
			</ReactAria.TextField>
			<ReactAria.TextField type="text" name="room">
				<Label>Room</Label>
				<Input placeholder="Room" />
				<ReactAria.FieldError className="text-destructive font-medium" />
			</ReactAria.TextField>
			<ReactAria.TextField name="description">
				<Label>Class Description</Label>
				<Textarea
					placeholder="Class Description"
					className="resize-none"
				/>
				<ReactAria.FieldError className="text-destructive font-medium" />
			</ReactAria.TextField>
            <Submit/>
		</ReactAria.Form>
	)
}
