import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createStaticClient } from '@/lib/supabase/static'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
	params: {
		id: string
		assignment: string
	}
	student: React.ReactNode
	instructor: React.ReactNode
}

export async function generateStaticParams() {
	const supabase = createStaticClient()
	const { data: assignments, error } = await supabase
		.from('assignments')
		.select('assignment_id')

	if (error) {
		throw new Error(`${error.message}`)
	}

	return assignments.map((assignment) => ({
		assignment: assignment.assignment_id,
	}))
}

export default async function Page({ student, instructor }: Props) {
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
		.eq('profile_id', user.id)
		.limit(1)
		.single()

	if (!profile) {
		redirect('/auth/signin')
	}

	return <main>{profile.role === 'student' ? student : instructor}</main>
}
