import React from 'react'
import { Header } from './components/header'

type Props = {
	children: React.ReactNode
}

export default function LandingPageLayout({ children }: Props) {
	return (
		<React.Fragment>
			<Header />
			<main>{children}</main>
		</React.Fragment>
	)
}
