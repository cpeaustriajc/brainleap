type LayoutProps = {
	children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<main>
			<h1>Let&apos;s get you setup</h1>
			{children}
		</main>
	)
}
