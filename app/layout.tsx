import '@/styles/styles.css'

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
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" dir="ltr">
			<body className="font-sans h-dvh antialiased">
				{children}
			</body>
		</html>
	)
}
