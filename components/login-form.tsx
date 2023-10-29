'use client'

import { authenticate } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export function LoginForm() {
	const [code, action] = useFormState(authenticate, undefined)

	return (
		<form action={action} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<div className="relative">
					<Input
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email address"
						required
					/>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<div className="relative">
					<Input
						type="password"
						id="password"
						name="password"
						placeholder="Enter your password"
						required
						minLength={6}
					/>
				</div>
			</div>
			<LoginButton />
			<div>
				{code === 'CredentialsSignin' && (
					<>
						<p aria-live="polite">Invalid credentials</p>
					</>
				)}
			</div>
		</form>
	)
}

function LoginButton() {
	const { pending } = useFormStatus()

	return (
		<Button aria-disabled={pending} className="w-full">
			Log In <ArrowRightIcon className="ml-auto h-5 w-5" />
		</Button>
	)
}
