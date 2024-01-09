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

	const profile = await getProfileById(user.id)

	if (!profile) {
		redirect('/auth/signin')
	}

	return <main>{profile.role === 'student' ? student : teacher}</main>
}
