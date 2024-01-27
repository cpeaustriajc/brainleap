'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailSchema } from '../validations/auth'
import { z } from 'zod'
import { getURL } from '../utils'

export async function signInWithGoogle() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: getURL('/api/auth/callback'),
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
	const redirectURL = getURL('/api/auth/confirm')

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
