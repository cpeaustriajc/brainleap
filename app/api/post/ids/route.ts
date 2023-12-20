import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export async function GET() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: posts } = await supabase.from('posts').select('post_id')

	if (!posts) {
		notFound()
	}

	return Response.json(posts.map((post) => post.post_id))
}
