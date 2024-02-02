import React from 'react'
import { Header } from './components/header'

type Props = {
	children: React.ReactNode
}

export default function LandingPageLayout({ children }: Props) {
	return (
		<html lang="en" dir="ltr">
			<body className="dark:bg-stone-800 bg-white">
				<Header />
				<main>{children}</main>
			</body>
		</html>
	)
}
