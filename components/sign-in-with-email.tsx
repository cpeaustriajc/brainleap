'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import { useFormState, useFormStatus } from 'react-dom'
import { TextField } from './text-field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<button type="submit" disabled={pending}>
			Sign In
		</button>
	)
}

export function SignInWithEmail() {
	const [state, action] = useFormState(signInWithEmail, {
		errors: {},
	})

	return (
		<form action={action}>
			<TextField name="email" type="text" isRequired>
				<Label>Email</Label>
				<Input placeholder="johndoe@email.com" required />
				<ReactAria.FieldError />
			</TextField>
			<Submit />
		</form>
	)
}
