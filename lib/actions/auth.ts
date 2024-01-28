'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signInWithEmailSchema } from '../validations/auth'

export async function signInWithGoogle() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
	})

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	revalidatePath('/', 'layout')
	redirect(data.url)
}

export async function signInWithEmail(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = signInWithEmailSchema.safeParse({
		email: formData.get('email'),
	})

	if (!values.success) {
		return {
			errors: values.error.flatten().fieldErrors,
		}
	}

	const { data, error } = await supabase.auth.signInWithOtp({
		email: values.data.email,
		options: {
			data: {
				email: values.data.email,
			},
		},
	})

	if (error) {
		throw error
	}

	revalidatePath('/', 'layout')
	redirect('/auth/confirm')
}
