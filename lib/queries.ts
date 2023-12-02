'use server'

import 'server-only'

import { createClient } from './supabase/server'
import { cookies } from 'next/headers'

export async function getClasses() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: classes } = await supabase.from('classes').select()

	return classes
}

export async function getEnrollments() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data: enrollments } = await supabase
		.from('enrollments')
		.select()
		.eq('user_id', session?.user.id ?? '')

	return enrollments
}
