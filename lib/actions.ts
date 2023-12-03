'use server'

import 'server-only'

import { cookies } from 'next/headers'
import { z } from 'zod'
import { createClient } from './supabase/server'
import { v4 as uuidv4 } from 'uuid'
import humanId from 'human-id'
import { revalidatePath } from 'next/cache'

const addClassFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long' })
		.max(20, { message: 'Title must not be longer than 20 characters' }),
	description: z
		.string()
		.min(10, { message: 'description must be atleast 10 characters long' })
		.max(160),
})

const joinClassFormSchema = z.object({
	classCode: z.string(),
})

const uploadFileSchema = z.object({
	file: z.instanceof(File),
})

export async function joinClass(formData: FormData) {
	const parsedData = joinClassFormSchema.parse({
		classCode: formData.get('classCode'),
	})
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()
	const { count } = await supabase
		.from('courses')
		.select()
		.eq('course_id', parsedData.classCode)
		.single()

	if (count === 0) {
		throw new Error('Class not found')
	}

	const { error: insertEnrollmentError } = await supabase
		.from('enrollments')
		.insert({
			course_id: parsedData.classCode,
			user_id: session?.user.id,
			enrollment_id: uuidv4(),
		})

	if (insertEnrollmentError) {
		throw insertEnrollmentError
	}
}

export async function addClass(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const values = addClassFormSchema.parse({
		title: formData.get('title'),
		description: formData.get('description'),
	})

	const {
		data: { session },
		error: sessionError,
	} = await supabase.auth.getSession()

	if (sessionError) {
		throw sessionError
	}
	if (!session) {
		throw new Error('Session not found')
	}

	const { data } = await supabase
		.from('profiles')
		.select('user_id, role')
		.eq('user_id', session.user.id)
		.single()

	console.log(data)

	const { data: insertedCourse, error } = await supabase
		.from('courses')
		.insert({
			course_id: humanId({ separator: '-', capitalize: false }),
			course_name: values.title,
			course_description: values.description,
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
			enrollment_id: uuidv4(),
			user_id: session.user.id,
			course_id: course?.course_id,
		})

		if (error) throw error
	}

	revalidatePath('/')

	if (error) throw error
}

export async function updateFile(formData: FormData) {
	const values = uploadFileSchema.parse({
		file: formData.get('file'),
	})

	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { error } = await supabase.storage
		.from('avatars')
		.upload('public/avatar1.png', values.file, {})
}
