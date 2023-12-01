import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) await supabase.auth.signOut()

	return NextResponse.redirect(new URL('/', req.url), { status: 302 })
}
