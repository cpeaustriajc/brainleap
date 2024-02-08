import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export const getEnrollments = async () => {
	const supabase = createClient()

	const { data: enrollments } = await supabase.from('enrollments').select()

	if (!enrollments) {
		notFound()
	}

	return enrollments
}

export const getEnrollmentsByCourseId = async (courseId: string) => {
	const supabase = createClient()

	const { data: enrollment } = await supabase
		.from('enrollments')
		.select()
		.eq('course_id', courseId)

	if (!enrollment) {
		notFound()
	}

	return enrollment
}
