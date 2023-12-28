import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function GET() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const res = await supabase.from('assignments').select()

	if (!res.data)
		return Response.json({ message: 'No data found' }, { status: 404 })

	return Response.json(res.data, { status: 200 })
}
