
export const metadata = {
	title: 'Brainleap - Dashboard',
	description: 'Brainleap: An e-learning platform for the modern age.',
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	colorScheme: 'light dark',
}

	children,
}: { children: React.ReactNode }) {
	return (
		<html dir="ltr" lang="en">
			<body className="dark:bg-stone-800">{children}</body>
		</html>
	)
}
