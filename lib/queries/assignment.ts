import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export const getAssignments = async (courseId: string) => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: assignments } = await supabase
		.from('assignments')
		.select()
		.eq('course_id', courseId)

	return assignments
}
