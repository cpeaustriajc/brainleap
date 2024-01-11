import { createClient as createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getProfileById } from '@/lib/queries/profile'

type Props = {
	params: {
		id: string
		assignment: string
	}
	student: React.ReactNode
	teacher: React.ReactNode
}

export default async function Page({ student, teacher }: Props) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('role')
		.limit(1)
		.single()

	if (!profile) {
		redirect('/auth/signin')
	}

	return <main>{profile.role === 'student' ? student : teacher}</main>
}
