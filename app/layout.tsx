import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

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
	children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	return (
			<html lang="en" dir="ltr" suppressHydrationWarning>
				<body>
					<Providers>
						<Header session={session} />
						{children}
					</Providers>
				</body>
			</html>
	)
}
