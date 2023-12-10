import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
	const { searchParams, origin } = new URL(req.url)
	const code = searchParams.get('code')
	const next = searchParams.get('next') ?? '/'

	if (code) {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { error } = await supabase.auth.exchangeCodeForSession(code)
		if (!error) return Response.redirect(`${origin}${next}`)
	}

	return Response.redirect(`${origin}/auth/auth-code-error`)
}
