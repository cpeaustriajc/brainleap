export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="h-dvh flex justify-center items-center">
			{children}
		</section>
	)
}
