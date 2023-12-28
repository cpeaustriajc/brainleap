'use client'

import { Button } from '@/components/ui/button'
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
				<div>
					<h2>Something went wrong!</h2>
					<Button onClick={() => reset()}>Try Again</Button>
				</div>
			</body>
		</html>
	)
}
