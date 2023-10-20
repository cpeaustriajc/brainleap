import { Header } from '@/components/header'
import '@/styles/styles.css'
import { Providers } from './providers'

export const metadata = {
	title: 'Doctrina',
	description: 'Doctrina: An e-learning platform for the modern age.',
}

export default function RootLayout({ children }) {
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
