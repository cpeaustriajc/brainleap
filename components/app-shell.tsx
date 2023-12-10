import { Suspense } from 'react'
import { Header } from './header'
import { HeaderSkeleton } from './header-skeleton'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

type Props = {
	children: React.ReactNode
}

export default async function AppShell({ children }: Props) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const { id } = user

	const profilePromise = getProfile(id)

	return (
		<>
			<Suspense fallback={<HeaderSkeleton />}>
				<Header profilePromise={profilePromise} />
			</Suspense>
			<div className="flex flex-col">{children}</div>
		</>
	)
}
