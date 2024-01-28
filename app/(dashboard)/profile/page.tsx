import { SetupProfileForm } from './forms/setup-profile-form'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		notFound()
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('profile_id', user.id)
		.single()

	if (profileError) {
		throw profileError
	}

	return (
		<main>
			<SetupProfileForm profile={profile} />
		</main>
	)
}
