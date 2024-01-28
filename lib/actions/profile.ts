'use server'

import { createClient } from '@/lib/supabase/server'
import { profileSchema } from '@/lib/validations/profile'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createPostgresTimestamp } from '../utils'

export async function updateProfile(
	previousState: unknown,
	formData: FormData,
) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const date = new Date()
	const updated_at = createPostgresTimestamp(date)

	const values = profileSchema.parse({
		biography: formData.get('biography'),
		email: formData.get('email'),
		full_name: formData.get('full_name'),
		role: formData.get('role'),
		section: formData.get('section'),
		university: formData.get('university'),
		username: formData.get('username'),
		program: formData.get('program'),
		position: formData.get('position'),
	})

	const {
		data: { session },
		error: sessionError,
	} = await supabase.auth.getSession()

	if (sessionError) {
		throw sessionError
	}

	if (!session) {
		redirect('/auth/signin')
	}

	const {
		user: { id },
	} = session

	if (values.role === 'student') {
		const { error } = await supabase
			.from('profiles')
			.update({
				full_name: values.full_name,
				username: values.username,
				biography: values.biography,
				program: values.program,
				section: values.section,
				university: values.university,
				email: values.email,
				role: values.role,
				updated_at,
			})
			.eq('profile_id', id)

		if (error) {
			throw error
		}
	} else if (values.role === 'instructor') {
		const { error } = await supabase
			.from('profiles')
			.update({
				full_name: values.full_name,
				username: values.username,
				biography: values.biography,
				university: values.university,
				email: values.email,
				role: values.role,
				updated_at,
				avatar_url: values.avatar_url,
				position: values.position,
			})
			.eq('profile_id', id)

		if (error) {
			throw error
		}
	}

	revalidatePath('/profile')

	redirect('/dashboard')
}

export async function uploadAvatar(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser()

	if (userError) {
		throw userError
	}

	if (!user) {
		redirect('/auth/signin')
	}

	const file = formData.get('avatar') as File

	const fileExt = file.name.split('.').pop()
	const filePath = `${user.id}-${Math.random()}.${fileExt}`

	const { error } = await supabase.storage
		.from('avatars')
		.upload(filePath, file)

	if (error) {
		throw error
	}

	const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`

	await supabase
		.from('profiles')
		.update({ avatar_url: fileUrl })
		.eq('profile_id', user.id)

	revalidatePath('/profile')
}

export async function updateUsername(formData: FormData) {
	'use server'
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const username = formData.get('username') as string | null
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	const { error } = await supabase
		.from('profiles')
		.update({ username, updated_at: new Date().toISOString() })
		.eq('profile_id', session.user.id)

	if (error) {
		throw error
	}

	revalidatePath('/profile')
	redirect('/profile/setup/name')
}

export async function updateName(formData: FormData) {
	'use server'
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const full_name = formData.get('name') as string | null

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	const { error } = await supabase
		.from('profiles')
		.update({ full_name, updated_at: new Date().toISOString() })
		.eq('profile_id', session.user.id)

	if (error) {
		throw error
	}

	revalidatePath('/profile')
	redirect('/profile/setup/avatar')
}
