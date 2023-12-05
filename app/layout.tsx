import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'
import { cookies } from 'next/headers'
import { PostgrestError } from '@supabase/supabase-js'
import { Tables } from '@/lib/definitions'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
	title: 'Doctrina',
	description: 'Doctrina: An e-learning platform for the modern age.',
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	colorScheme: 'dark light',
}

type Props = {
	modal: React.ReactNode
	children: React.ReactNode
}

export default async function RootLayout({ modal, children }: Props) {
	let profile: Tables<'profiles'> | null | undefined = null
	let error: PostgrestError | null = null

	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		throw new Error('Session not found.')
	}

	if (session) {
		const result = await supabase
			.from('profiles')
			.select()
			.eq('profile_id', session.user.id)
			.single()
		profile = result.data
		error = result.error
	}

	if (error) {
		throw error
	}
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<body>
				<Providers>
					<Header session={session} profile={profile} />
					{children}
				</Providers>
				{modal}
			</body>
		</html>
	)
}
