import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export const getAssignments = async (courseId: string) => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: assignments } = await supabase
		.from('assignments')
		.select()
		.eq('course_id', courseId)

	return assignments
}

export const getAssignmentById = async (assignmentId: string) => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: assignment } = await supabase
		.from('assignments')
		.select()
		.eq('assignment_id', assignmentId)
		.single()

	return assignment
}
