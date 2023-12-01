import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams, origin } = new URL(req.url)
	const code = searchParams.get('code')
	const next = searchParams.get('next') ?? '/'
	if (code) {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { error } = await supabase.auth.exchangeCodeForSession(code)
		if (!error) return NextResponse.redirect(`${origin}${next}`)
	}

	return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
