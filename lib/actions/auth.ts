'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailSchema } from '../validations/auth'
import { getURL } from '../utils'

export async function signInWithGoogle() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: getURL(`/api/auth/callback`),
		},
	})

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	redirect(data.url)
}

export async function signInWithEmail(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const redirectURL = getURL(`/api/auth/confirm`)

	const values = signInWithEmailSchema.parse({
		email: formData.get('email'),
	})

	const { error } = await supabase.auth.signInWithOtp({
		email: values.email,
		options: {
			data: {
				email: values.email,
			},
			emailRedirectTo: redirectURL,
		},
	})

	console.log(error)
	if (error) {
		return { error: error.message }
	}
}
