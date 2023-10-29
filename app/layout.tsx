import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'

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

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<body>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	)
}
