'use client'

import { useRouter } from 'next/navigation'
import { CrossIcon } from 'lucide-react'

export function CloseDialog() {
	const router = useRouter()

	return (
		<button type="button" onClick={() => router.back()}>
			<span>Close</span>
			<CrossIcon />
		</button>
	)
}
