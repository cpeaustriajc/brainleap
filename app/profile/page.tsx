import { SetupProfileForm } from '@/components/setup-profile-form'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { session },
		error: sessionError,
	} = await supabase.auth.getSession()

	if (sessionError) {
		throw sessionError
	}

	const { data, error } = await supabase
		.from('profiles')
		.select()
		.eq('profile_id', session?.user.id ?? '')
		.single()

	if (error) {
		throw error
	}

	return (
		<main>
			<SetupProfileForm profile={data} />
		</main>
	)
}
