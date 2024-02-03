'use server'

import { createClient } from '@/lib/supabase/action'
import { fullNameSchema, usernameSchema } from '@/lib/validations/profile'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

export async function updateAvatar(formData: FormData) {
	await uploadAvatar(formData)
	redirect('/profile')
}

export async function updateUsername(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const res = usernameSchema.safeParse({
		username: formData.get('username'),
	})
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	if (!res.success) {
		return {
			errors: res.error,
		}
	}

	const { error } = await supabase
		.from('profiles')
		.update({
			username: res.data.username,
			updated_at: new Date().toISOString(),
		})
		.eq('profile_id', session.user.id)

	if (error) {
		throw error
	}

	revalidatePath('/profile')
}

export async function updateName(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const res = fullNameSchema.safeParse({
		full_name: formData.get('name'),
	})

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	if (!res.success) {
		return {
			error: res.error,
		}
	}

	const { error } = await supabase
		.from('profiles')
		.update({ full_name: res.data.name, updated_at: new Date().toISOString() })
		.eq('profile_id', session.user.id)

	if (error) {
		throw error
	}

	revalidatePath('/profile')
}

export async function updateUniversity(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const university = formData.get('university') as string

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	const { error } = await supabase
		.from('profiles')
		.update({
			university: university,
			updated_at: new Date().toISOString(),
		})
		.eq('profile_id', session.user.id)

	if (error) {
		throw error
	}

	revalidatePath('/profile')
}

export async function updateSection(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	// const res = profileSchema.safeParse({
	// 	section: formData.get('section'),
	// })
	const section = formData.get('section') as string

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	// if (!res.success) {
	// 	return {
	// 		error: res.error,
	// 	}
	// }

	const { error } = await supabase
		.from('profiles')
		.update({
			section: section,
			updated_at: new Date().toISOString(),
		})
		.eq('profile_id', session.user.id)

	if (error) {
		throw error
	}

	revalidatePath('/profile')
}
