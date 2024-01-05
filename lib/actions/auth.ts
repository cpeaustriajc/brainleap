'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailSchema } from '../validations/auth'
import { z } from 'zod'

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
type FieldErrors = z.inferFlattenedErrors<
	typeof signInWithEmailSchema
>['fieldErrors']

export async function signInWithEmail(
	previousState: {
		errors: FieldErrors
	},
	formData: FormData,
): Promise<{
	errors: FieldErrors
}> {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const redirectURL = `${URL}/api/auth/confirm`

	const values = signInWithEmailSchema.safeParse({
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
			emailRedirectTo: redirectURL,
		},
	})

	if (error) {
		throw error
	}

	redirect('/auth/confirm')
}
