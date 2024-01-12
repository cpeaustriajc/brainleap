import dynamic from 'next/dynamic'
import { HeaderSkeleton } from './header-skeleton'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

const Header = dynamic(() => import('./header').then((mod) => mod.Header), {
	loading: () => <HeaderSkeleton />,
})

const Aside = dynamic(() => import('./aside').then((mod) => mod.Aside), {
	loading: () => <div className="w-64" />,
})

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
			<Header profile={profile} />
			<div className="flex w-full h-full z-0 relative overflow-hidden">
				<Aside />
				{children}
			</div>
		</>
	)
}
