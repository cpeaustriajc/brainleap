import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'
import { SessionProvider } from './providers'
import { getServerSession } from 'next-auth'

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
	const session = await getServerSession()
	return (
		<SessionProvider session={session}>
			<html lang="en" dir="ltr" suppressHydrationWarning>
				<body>
					<Providers>
						<Header />
						{children}
					</Providers>
				</body>
			</html>
		</SessionProvider>
	)
}
