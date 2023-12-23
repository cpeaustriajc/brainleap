'use server'

import 'server-only'

import { createClient } from './supabase/server'
import { cookies } from 'next/headers'
import { unstable_cache as nextCache } from 'next/cache'
import { notFound, redirect } from 'next/navigation'

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

export const getAnnouncementIds = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: announcements } = await supabase.from('announcements').select('announcement_id')

		if (!announcements) {
			notFound()
		}

		return announcements.map((announcements) => announcements.announcement_id)
	},
	['announcement_ids'],
	{ tags: ['announcementIds'] },
)

export const getAnnouncement = nextCache(
	async (id: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: announcement } = await supabase
			.from('announcements')
			.select()
			.eq('announcement_id', id)
			.single()

		return announcement
	},
	['announcement'],
	{ tags: ['announcement'] },
)

export const getEnrollments = nextCache(
	async () => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { data: enrollments } = await supabase
			.from('enrollments')
			.select()

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

export const getAnnouncements = nextCache(
	async (courseId: string) => {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data: announcements } = await supabase
			.from('announcements')
			.select()
			.eq('course_id', courseId)

		return announcements
	},
	['announcements'],
	{ tags: ['announcements'] },
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
			.eq('profile_id', id)
			.single()

		if (error) {
			throw new Error(error.message)
		}

		return data.role
	},
	['role'],
	{ tags: ['role'] },
)
