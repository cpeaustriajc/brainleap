import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Header } from './header'
import { HeaderSkeleton } from './header-skeleton'

type Props = {
	children: React.ReactNode
}

export default async function AppShell({ children }: Props) {
	const cookieStore = cookies()

	return (
		<>
			<Suspense fallback={<HeaderSkeleton />}>
				<Header />
			</Suspense>
			<div>{children}</div>
		</>
	)
}
