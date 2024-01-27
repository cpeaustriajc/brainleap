import '@/styles/styles.css'
import { Providers } from './providers'

export const metadata = {
	title: 'Brainleap',
	description: 'Brainleap: An e-learning platform for the modern age.',
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	colorScheme: 'light dark'
}

type Props = {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" dir="ltr">
			<body className=" dark:text-stone-50 dark:bg-stone-900 font-sans antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
