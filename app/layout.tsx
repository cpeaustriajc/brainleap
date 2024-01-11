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
}

type Props = {
	modal: React.ReactNode
	children: React.ReactNode
}

export default function RootLayout({ modal, children }: Props) {
	return (
		<html lang="en" dir="ltr">
			<body>
				<Providers>{children}</Providers>
				{modal}
			</body>
		</html>
	)
}
