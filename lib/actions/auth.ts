'use server'

import { createClient } from '@/lib/supabase/server'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailSchema } from '../validations/auth'

export async function signInWithGoogle() {
	const origin = headers().get('origin')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${origin}/api/auth/callback`,
		},
	})

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	redirect(data.url)
}

export async function signInWithEmail(formData: FormData) {
	const origin = headers().get('origin')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = signInWithEmailSchema.parse({
		email: formData.get('email'),
	})

	const { error } = await supabase.auth.signInWithOtp({
		email: values.email,
		options: {
			data: {
				email: values.email,
			},
			emailRedirectTo: `${origin}/api/auth/confirm`,
		},
	})

	console.log(error)
	if (error) {
		return { error: error.message }
	}
}
