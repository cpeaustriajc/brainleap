'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Cross1Icon } from '@radix-ui/react-icons'

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
			<Cross1Icon />
		</Button>
	)
}
