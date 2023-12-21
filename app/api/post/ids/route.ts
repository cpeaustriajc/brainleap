import { getPostIds } from '@/lib/queries'

export async function GET() {
	const postIds = await getPostIds()

	return Response.json(postIds.map((post_id) => post_id))
}
