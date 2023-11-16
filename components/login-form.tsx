'use client'

import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

export function LoginForm() {
	return (
		<Button
			onClick={() => signIn('google', { callbackUrl: '/profile/setup' })}
		>
			Sign In with Google
		</Button>
	)
}
