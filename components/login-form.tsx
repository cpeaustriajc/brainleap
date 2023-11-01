'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'

export function LoginForm() {
	return <Button onClick={() => signIn('google')}>Sign In with Google</Button>
}

function LoginButton() {
	const { pending } = useFormStatus()

	return (
		<Button aria-disabled={pending} className="w-full">
			Log In <ArrowRightIcon className="ml-auto h-5 w-5" />
		</Button>
	)
}
