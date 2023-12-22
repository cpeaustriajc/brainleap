'use server'

import 'server-only'

import { createClient } from './supabase/server'
import { cookies } from 'next/headers'
import { unstable_cache as nextCache } from 'next/cache'
import { notFound } from 'next/navigation'

export const getCourses = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: courses, error } = await supabase.from('courses').select()

		if (error) {
			throw error
		}

		return courses
	},
	['courses'],
	{ tags: ['courses'] },
)

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

export const getCourseIds = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: courses } = await supabase
			.from('courses')
			.select('course_id')

		if (!courses) {
			notFound()
		}

		return courses.map((course) => course.course_id)
	},
	['course_id'],
	{
		tags: ['courseIds'],
	},
)

export const getPostIds = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: posts } = await supabase.from('posts').select('post_id')

		if (!posts) {
			notFound()
		}

		return posts.map((post) => post.post_id)
	},
	['post_id'],
	{ tags: ['postIds'] },
)

export const getPost = nextCache(
	async (id: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: post } = await supabase
			.from('posts')
			.select()
			.eq('post_id', id)
			.single()

		return post
	},
	['post'],
	{ tags: ['post'] },
)

export const getEnrollments = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const {
			data: { session },
			error: authError,
		} = await supabase.auth.getSession()

		if (!session) {
			throw authError
		}
		const {
			user: { id },
		} = session

		const { data: enrollments } = await supabase
			.from('enrollments')
			.select()
			.eq('user_id', id)

		return enrollments
	},
	['enrollments'],
	{
		tags: ['enrollments'],
	},
)

export const getEnrollmentsByCourseId = nextCache(
	async (courseId: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { data: enrollment } = await supabase
			.from('enrollments')
			.select()
			.eq('course_id', courseId)

		if (!enrollment) {
			notFound()
		}

		return enrollment
	},
	['enrollment'],
	{ tags: ['enrollment'] },
)

export const getPosts = nextCache(
	async (courseId: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: posts } = await supabase
			.from('posts')
			.select()
			.eq('course_id', courseId)

		return posts
	},
	['posts'],
	{ tags: ['posts'] },
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
	{ tags: ['profile'] },
)

export const getProfiles = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { data: profiles, error } = await supabase
			.from('profiles')
			.select()

		if (error) {
			throw new Error(error.message)
		}

		return profiles
	},
	['profiles'],
	{
		tags: ['profiles'],
	},
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
	{ tags: ['role'] },
)
