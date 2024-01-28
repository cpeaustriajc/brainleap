import { Header } from './_components/header'

type Props = {
	children: React.ReactNode
}

export default function LandingPageLayout({ children }: Props) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
