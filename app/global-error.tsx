'use client'

import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<html>
			<body>
				<main className="flex flex-col justify-center items-center h-dvh gap-8">
					<ExclamationTriangleIcon className="text-destructive size-16 self-center" />
					<section className="text-center flex flex-col gap-4">
						<h2 className="text-4xl font-bold text-destructive">
							Oops!
						</h2>
						<p className="text-lg">
							It seems like something went wrong. We&apos;re sorry
							for the inconvenience.
						</p>
					</section>
					<Button onClick={() => reset()}>Try Again</Button>
				</main>
			</body>
		</html>
	)
}
