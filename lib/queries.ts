'use server'

import 'server-only'

import { createClient } from './supabase/server'
import { cookies } from 'next/headers'
import { Session } from '@supabase/supabase-js'

export async function getCourses() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: courses, error } = await supabase.from('courses').select()

	if (error) {
		throw error
	}

	return courses
}

export async function getCourse(id: string) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: course } = await supabase
		.from('courses')
		.select()
		.eq('course_id', id)
		.single()

	return course
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

export async function getProfile() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		return null
	}

	const { data: profile, error } = await supabase
		.from('profiles')
		.select()
		.eq('profile_id', session.user.id)
		.single()

	if (error) {
		throw error
	}

	return profile
}
