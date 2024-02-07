import { createClient } from '@/lib/supabase/action'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const code = searchParams.get('code')
	const next = searchParams.get('next') ?? '/profile'
	const redirectTo = req.nextUrl.clone()
	redirectTo.pathname = next
	redirectTo.searchParams.delete('code')

	if (code) {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { error } = await supabase.auth.exchangeCodeForSession(code)

		if (!error) {
			redirectTo.searchParams.delete('next')
			return NextResponse.redirect(redirectTo)
		}
	}

	redirectTo.pathname = '/auth/error'
	return NextResponse.redirect(redirectTo)
}
