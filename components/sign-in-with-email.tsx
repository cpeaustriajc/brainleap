'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import { FieldError, Form } from 'react-aria-components'
import { useFormState, useFormStatus } from 'react-dom'
import { TextField } from './text-field'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function SignInWithEmail() {
	const [state, action] = useFormState(signInWithEmail, {
		errors: {},
	})
	const { pending } = useFormStatus()

	return (
		<Form
			action={action}
			validationErrors={state.errors}
			className="flex flex-col space-y-2"
		>
			<div>
				<h1 className="text-xl font-bold">Sign in</h1>
				<p className="text-sm">
					Sign in via magic link with your email below
				</p>
			</div>
			<TextField name="email" type="text" isRequired>
				<Label>Email</Label>
				<Input
					placeholder="johndoe@email.com"
					className="rac-invalid:border-destructive"
				/>
				<FieldError className="text-destructive" />
			</TextField>
			<Button type="submit" disabled={pending}>
				Sign In
			</Button>
		</Form>
	)
}
