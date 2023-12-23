'use server'

import 'server-only'
import humanId from 'human-id'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const CreateCourseFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long' })
		.max(20, { message: 'Title must not be longer than 20 characters' }),
	description: z
		.string()
		.min(10, { message: 'description must be atleast 10 characters long' })
		.max(160),
	section: z.string(),
	subject: z.string(),
	room: z.string(),
})

export async function createCourse(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const values = CreateCourseFormSchema.parse({
		title: formData.get('title'),
		description: formData.get('description'),
		section: formData.get('section'),
		subject: formData.get('subject'),
		room: formData.get('room'),
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

	await supabase
		.from('profiles')
		.select('user_id, role')
		.eq('user_id', session.user.id)
		.single()

	const { data: insertedCourse, error } = await supabase
		.from('courses')
		.insert({
			course_id: humanId({ separator: '-', capitalize: false }),
			course_name: values.title,
			course_description: values.description,
			section: values.section,
			subject: values.subject,
			room: values.room,
		})
		.select()
		.single()

	if (session) {
		if (!insertedCourse) throw new Error('Class not found')

		const { data: course, error: selectCourseError } = await supabase
			.from('courses')
			.select('*')
			.eq('course_id', insertedCourse?.course_id)
			.single()

		if (selectCourseError) throw selectCourseError

		const { error } = await supabase.from('enrollments').insert({
			user_id: session.user.id,
			course_id: course?.course_id,
		})

		if (error) throw error
	}

	if (error) throw error
}

const JoinCourseFormSchema = z.object({
	courseCode: z.string(),
})

export async function joinCourse(formData: FormData) {
	const parsedData = JoinCourseFormSchema.parse({
		courseCode: formData.get('courseCode'),
	})
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	const { count } = await supabase
		.from('courses')
		.select()
		.eq('course_id', parsedData.courseCode)
		.single()

	if (count === 0) {
		throw new Error('Course not found')
	}

	const { error: insertEnrollmentError } = await supabase
		.from('enrollments')
		.insert({
			course_id: parsedData.courseCode,
			user_id: session.user.id,
		})

	if (insertEnrollmentError) {
		throw insertEnrollmentError
	}
}
