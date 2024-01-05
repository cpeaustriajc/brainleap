'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailSchema } from '../validations/auth'

const URL =
	process.env.NODE_ENV === 'production'
		? 'https://doctrina-demo.vercel.app'
		: 'http://localhost:3000'

export async function signInWithGoogle() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${URL}/api/auth/callback`,
		},
	})

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	redirect(data.url)
}

export async function signInWithEmail(
	previousState: { type: 'success' | 'error' | null; message: string | null },
	formData: FormData,
): Promise<{ type: 'success' | 'error' | null; message: string | null }> {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const redirectURL = `${URL}/api/auth/confirm`

	const values = signInWithEmailSchema.safeParse({
		email: formData.get('email'),
	})

	if (!values.success) {
		return {
			type: 'error',
			message: values.error.message,
		}
	}

	const { error } = await supabase.auth.signInWithOtp({
		email: values.data.email,
		options: {
			data: {
				email: values.data.email,
			},
			emailRedirectTo: redirectURL,
		},
	})

	if (error) {
		throw error
	}

	return {
		type: 'success',
		message: 'Check your email for the login link',
	}
}
