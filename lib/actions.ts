'use server'
import {
	CookieOptions,
	createServerClient,
} from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function signInWithEmail(email: string) {
	const cookieStore = cookies()
	const supabase = createServerClient(
		process.env['NEXT_PUBLIC_SUPABASE_URL']!,
		process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set({ name, value, ...options })
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.set({ name, value: '', ...options })
				},
			},
		},
	)
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: { emailRedirectTo: 'http://localhost:3000/profile' },
	})

	if (error) {
		throw error
	}
}
