export default function DashboardRootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html dir="ltr" lang="en">
			<body className="dark:bg-stone-800">{children}</body>
		</html>
	)
}
