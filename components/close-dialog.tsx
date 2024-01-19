'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { CrossIcon } from 'lucide-react'

export function CloseDialog() {
	const router = useRouter()

	return (
		<Button
			type="button"
			className="justify-self-end"
			size="icon"
			variant="ghost"
			onPress={() => router.back()}
		>
			<span className="sr-only">Close</span>
			<CrossIcon />
		</Button>
	)
}
