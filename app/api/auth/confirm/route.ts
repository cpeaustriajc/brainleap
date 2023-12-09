import { createClient } from '@/lib/supabase/server'
import { EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const token_hash = searchParams.get('token_hash')
	const type = searchParams.get('type') as EmailOtpType | null
	const next = searchParams.get('next') ?? '/profile'
	const redirectTo = request.nextUrl.clone()
	redirectTo.pathname = next

	if (token_hash && type) {
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { error } = await supabase.auth.verifyOtp({ type, token_hash })

		if (!error) {
			return Response.redirect(redirectTo)
		}
	}

	redirectTo.pathname = '/auth/auth-code-error'
	return Response.redirect(redirectTo)
}
