'use server'

import 'server-only'

import { createClient } from './supabase/server'
import { cookies } from 'next/headers'

export async function getCourses() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: courses } = await supabase.from('courses').select()

	return courses
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

export async function getAssignments(courseId: string) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: assignments } = await supabase
		.from('assignments')
		.select()
		.eq('course_id', courseId)

	return assignments
}
