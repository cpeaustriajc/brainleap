import React from 'react'

export default async function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<React.Fragment>
			<main className="col-start-2 row-span-2 bg-stone-50 dark:bg-stone-900 px-4 rounded-lg">
				{children}
			</main>
		</React.Fragment>
	)
}
