import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'
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
	const profilePromise = getProfile()

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
