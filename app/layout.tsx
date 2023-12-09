import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/queries'
import { Suspense } from 'react'
import { HeaderSkeleton } from '@/components/header-skeleton'

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
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession()

	const profilePromise = getProfile(session)

	if (error) {
		throw error
	}

	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<body>
				<Providers>
					<Suspense fallback={<HeaderSkeleton />}>
						<Header profilePromise={profilePromise} />
					</Suspense>
					{children}
				</Providers>
				{modal}
			</body>
		</html>
	)
}
