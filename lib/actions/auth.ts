'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
	signInWithEmailSchema,
	signUpSchema,
} from '../validations/auth'

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

export async function signUp(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const res = signUpSchema.safeParse({
		name: formData.get('name'),
		username: formData.get('username'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	})

	if (!res.success) {
		throw res.error
	}
	const {
		data: { password, confirmPassword },
	} = res

	if (password !== confirmPassword) {
		throw new Error('Password does not match!')
	}

	const { data, error } = await supabase.auth.signUp({
		email: res.data.email,
		password: res.data.password,
		options: {
			data: {
				email: res.data.email,
				username: res.data.username,
				full_name: res.data.name,
			},
		},
	})
	console.log(data)

	if (error) {
		throw error
	}

	revalidatePath('/', 'layout')
	redirect('/dashboard')
}
