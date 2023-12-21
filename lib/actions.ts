'use server'

import 'server-only'

import { cookies, headers } from 'next/headers'
import { z } from 'zod'
import { createClient } from './supabase/server'
import humanId from 'human-id'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

const createCourseFormSchema = z.object({
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

const joinClassFormSchema = z.object({
	classCode: z.string(),
})

const uploadFileSchema = z.object({
	file: z.instanceof(File),
})

const createPostFormSchema = z.object({
	title: z.string(),
	description: z.string(),
	dueDate: z.string(),
})

const deleteAssignmentFormSchema = z.object({
	assignment: z.string(),
})

const authFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
})

export async function joinCourse(formData: FormData) {
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
		throw new Error('Course not found')
	}

	const { error: insertEnrollmentError } = await supabase
		.from('enrollments')
		.insert({
			course_id: parsedData.classCode,
			user_id: session?.user.id,
		})

	if (insertEnrollmentError) {
		throw insertEnrollmentError
	}
}

export async function createCourse(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const values = createCourseFormSchema.parse({
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
		throw new Error('Session not found')
	}

	const { data } = await supabase
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

	revalidateTag('courses')

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

export async function createPost(courseId: string, formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = createPostFormSchema.parse({
		title: formData.get('postTitle'),
		description: formData.get('postDescription'),
		dueDate: formData.get('postDueDate'),
	})

	const { data } = await supabase
		.from('courses')
		.select('course_id')
		.eq('course_id', courseId)
		.single()

	const { error } = await supabase.from('posts').insert({
		course_id: courseId,
		title: values.title,
		description: values.description,
		due_date: values.dueDate,
	})

	if (error) {
		throw error
	}

	revalidatePath(`/class/${data?.course_id}`)
}

export async function uploadAssignment(
	assignmentId: string,
	formData: FormData,
) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = uploadFileSchema.parse({
		file: formData.get('file'),
	})

	const { data: file, error } = await supabase.storage
		.from('files')
		.upload(values.file.name, values.file, {
			contentType: values.file.type,
		})

	if (!file) {
		throw new Error('File not found!')
	}

	const { error: assignmentError } = await supabase
		.from('outputs')
		.update({
			file_path: [file.path],
		})
		.eq('assignment_id', assignmentId)

	if (assignmentError) {
		throw assignmentError
	}

	if (error) {
		throw error
	}
}

export async function deleteFile(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = deleteAssignmentFormSchema.parse({
		assignment: formData.get('assignment'),
	})

	const { error } = await supabase.storage
		.from('files')
		.remove([values.assignment])

	if (error) {
		throw error
	}
}

export async function signInWithGoogle() {
	const origin = headers().get('origin')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${origin}/api/auth/callback`,
		},
	})

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	redirect(data.url)
}

export async function signInWithEmail(formData: FormData) {
	const origin = headers().get('origin')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const values = authFormSchema.safeParse({
		email: formData.get('email'),
	})

	if (!values.success) {
		return {
			errors: values.error.flatten().fieldErrors,
		}
	}

	const { error } = await supabase.auth.signInWithOtp({
		email: values.data.email,
		options: {
			data: {
				email: values.data.email,
			},
			emailRedirectTo: `${origin}/api/auth/confirm`,
		},
	})

	if (error) {
		return { errors: error }
	}
}
