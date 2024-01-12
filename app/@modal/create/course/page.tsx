'use client'

import { CloseDialog } from '@/components/close-dialog'
import { ModalBackground } from '@/components/modal'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createCourse } from '@/lib/actions/course'
import ReactAria from 'react-aria-components'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<ReactAria.Button className={buttonVariants()} isDisabled={pending} type="submit">
			{pending ? 'Creating Class...' : 'Create Class'}
		</ReactAria.Button>
	)
}

export default function Page() {
	const [state, action] = useFormState(createCourse, {
		errors: {},
		message: undefined,
	})

	return (
		<ModalBackground>
			<ReactAria.Form
				action={action}
				className="flex flex-col space-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-border p-4 rounded bg-card w-96"
				validationErrors={state.errors}
			>
				<div className="grid items-center">
					<CloseDialog />
				</div>
				<fieldset>
					<legend className="text-lg font-semibold my-2">
						Add a class
					</legend>
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
				</fieldset>
				<SubmitButton />
			</ReactAria.Form>
		</ModalBackground>
	)
}
