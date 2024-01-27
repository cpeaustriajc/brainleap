'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import { useFormState, useFormStatus } from 'react-dom'

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
			<label>Email</label>
			<input placeholder="johndoe@email.com" required />
			<Submit />
		</form>
	)
}
