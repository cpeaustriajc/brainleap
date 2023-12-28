'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailSchema } from '../validations/auth'

const url =
	process.env.NODE_ENV === 'production'
		? 'https://doctrina-demo.vercel.app'
		: 'http://localhost:3000'
export async function signInWithGoogle() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${url}/api/auth/callback`,
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

	const values = signInWithEmailSchema.parse({
		email: formData.get('email'),
	})

	const { error } = await supabase.auth.signInWithOtp({
		email: values.email,
		options: {
			data: {
				email: values.email,
			},
			emailRedirectTo: `${url}/api/auth/callback`,
		},
	})

	console.log(error)
	if (error) {
		return { error: error.message }
	}
}
