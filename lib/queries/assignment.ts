import { createClient } from '@/lib/supabase/server'

export const getAssignments = async (courseId: string) => {
	const supabase = createClient()
	const { data: assignments } = await supabase
		.from('assignments')
		.select()
		.eq('course_id', courseId)

	return assignments
}

export const getAssignmentById = async (assignmentId: string) => {
	const supabase = createClient()
	const { data: assignment } = await supabase
		.from('assignments')
		.select()
		.eq('assignment_id', assignmentId)
		.single()

	return assignment
}
