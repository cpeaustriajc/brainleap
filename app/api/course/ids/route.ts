import { getCourseIds } from '@/lib/queries/course'

export async function GET() {
	const courseIds = await getCourseIds()

	return Response.json(courseIds.map((courseId) => courseId))
}
