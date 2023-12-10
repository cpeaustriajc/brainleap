'use server'

import 'server-only'

import { createClient } from './supabase/server'
import { cookies } from 'next/headers'
import { unstable_cache as nextCache } from 'next/cache'
import { notFound } from 'next/navigation'

export const getCourses = nextCache(async () => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: courses, error } = await supabase.from('courses').select()

	if (error) {
		throw error
	}

	return courses
}, ['courses'])

export const getCourse = nextCache(
	async (id: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: course } = await supabase
			.from('courses')
			.select()
			.eq('course_id', id)
			.single()

		return course
	},
	['course'],
)

export const getCourseIds = nextCache(async () => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: courses } = await supabase.from('courses').select('course_id')

	if (!courses) {
		notFound()
	}

	return courses.map((course) => course.course_id)
}, ['courseIds'])

export const getAssignmentIds = nextCache(async () => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: assignments } = await supabase
		.from('assignments')
		.select('assignment_id')

	if (!assignments) {
		notFound()
	}

	return assignments.map((assignment) => assignment.assignment_id)
}, ['assignmentIds'])

export const getAssignment = nextCache(
	async (id: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: assignment } = await supabase
			.from('assignments')
			.select()
			.eq('assignment_id', id)
			.single()

		return assignment
	},
	['assignment'],
)

export const getEnrollments = nextCache(async () => {
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
}, ['enrollments'])

export const getAssignments = nextCache(
	async (courseId: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: assignments } = await supabase
			.from('assignments')
			.select()
			.eq('course_id', courseId)

		return assignments
	},
	['assignments'],
)

export const getProfile = nextCache(
	async (id: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { data: profile, error } = await supabase
			.from('profiles')
			.select()
			.eq('profile_id', id)
			.single()

		if (error) {
			throw new Error(error.message)
		}

		return profile
	},
	['profile'],
)

export const getRole = nextCache(
	async (id: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { data, error } = await supabase
			.from('profiles')
			.select('role')
			.eq('role_id', id)
			.single()

		if (error) {
			throw new Error(error.message)
		}

		return data.role
	},
	['role'],
)
