export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="h-dvh flex flex-col justify-center items-center">
			{children}
		</main>
	)
}
