import { SetupProfileForm } from '@/components/setup-profile-form'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

type Props = {
	searchParams: {
		message: string
	}
}

export default async function Page({ searchParams }: Props) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { message } = searchParams

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
			<SetupProfileForm profile={profile} message={message} />
		</main>
	)
}
