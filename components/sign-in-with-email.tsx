'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import * as ReactAria from 'react-aria-components'
import { useFormState, useFormStatus } from 'react-dom'
import { TextField } from './text-field'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" isDisabled={pending}>
			Sign In
		</Button>
	)
}

export function SignInWithEmail() {
	const [state, action] = useFormState(signInWithEmail, {
		errors: {},
	})
	const { pending } = useFormStatus()

	return (
		<ReactAria.Form
			action={action}
			validationErrors={state.errors}
			className="flex flex-col gap-2"
		>
			<TextField
				name="email"
				type="text"
				className="flex flex-col gap-2"
				isRequired
			>
				<Label>Email</Label>
				<Input
					placeholder="johndoe@email.com"
					className="rac-invalid:border-destructive"
				/>
				<ReactAria.FieldError className="text-destructive" />
			</TextField>
			<Submit />
		</ReactAria.Form>
	)
}
