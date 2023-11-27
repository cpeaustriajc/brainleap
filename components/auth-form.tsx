'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createBrowserClient } from '@supabase/ssr'

export function AuthForm() {
	const supabase = createBrowserClient(
		process.env['NEXT_PUBLIC_SUPABASE_URL']!,
		process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
	)

	return (
		<Auth
			view="magic_link"
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			providers={['google']}
			redirectTo="/api/auth/callback"
		/>
	)
}
