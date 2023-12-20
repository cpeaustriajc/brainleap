import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export async function GET() {
    const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: courses } = await supabase.from('courses').select('course_id')

	if (!courses) {
		notFound()
	}

	return Response.json(courses.map((course) => course.course_id))
}
