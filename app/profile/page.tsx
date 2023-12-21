import AppShell from '@/components/app-shell'
import { SetupProfileForm } from '@/components/setup-profile-form'
import { getProfile } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
	searchParams: {
		message: string
	}
}

export default async function Page({ searchParams }: Props) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { message } = searchParams
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const profile = await getProfile(user.id)

	if (!profile) {
		throw new Error('Profile not found')
	}

	return (
		<AppShell>
			<main>
				<SetupProfileForm profile={profile} message={message} />
			</main>
		</AppShell>
	)
}
