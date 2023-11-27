import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

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
	const cookieStore = cookies()
	const supabase = createServerClient(
		process.env['NEXT_PUBLIC_SUPABASE_URL']!,
		process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
		{
			cookies: {
				get: (name: string) => {
					return cookieStore.get(name)?.value
				},
			},
		},
	)
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
