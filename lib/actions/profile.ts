'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { profileSchema } from '@/lib/validations/profile'
import { createPostgresTimestamp } from '../utils'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function updateProfile(previousState: any, formData: FormData) {
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

	redirect('/')
}
