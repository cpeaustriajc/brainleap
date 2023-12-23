'use server'

import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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

const SignInWithEmailSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
})

export async function signInWithEmail(formData: FormData) {
	const origin = headers().get('origin')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = SignInWithEmailSchema.safeParse({
		email: formData.get('email'),
	})

	if (!values.success) {
		return {
			errors: values.error.flatten().fieldErrors,
		}
	}

	const { error } = await supabase.auth.signInWithOtp({
		email: values.data.email,
		options: {
			data: {
				email: values.data.email,
			},
			emailRedirectTo: `${origin}/api/auth/confirm`,
		},
	})

	if (error) {
		return { errors: error }
	}
}
