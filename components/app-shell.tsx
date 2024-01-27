import { Suspense } from 'react'
import { Header } from './header'
import { HeaderSkeleton } from './header-skeleton'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Aside } from './aside'

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

	const { data: profile, error } = await supabase
		.from('profiles')
		.select('username, avatar_url, role')
		.eq('profile_id', id)
		.limit(1)
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return (
		<>
			<Suspense fallback={<HeaderSkeleton />}>
				<Header profile={profile} />
			</Suspense>
			<div className="flex w-full h-full z-0 relative overflow-hidden">
				<Suspense fallback={<AsideSkeleton />}>
					<Aside />
				</Suspense>
				{children}
			</div>
		</>
	)
}

function AsideSkeleton() {
	return (
		<div className="min-w-64 h-dvh border-r flex flex-col gap-4 pl-4 pt-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					className="w-32 h-12 bg-slate-200 animate-pulse rounded-lg"
				/>
			))}
		</div>
	)
}
