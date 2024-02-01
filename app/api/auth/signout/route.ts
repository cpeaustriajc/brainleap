import { createClient } from '@/lib/supabase/action'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) await supabase.auth.signOut()

	return Response.redirect(new URL('/', req.url), 302)
}
