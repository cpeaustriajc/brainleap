'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="flex flex-col w-1/2 mx-auto justify-center items-center h-lvh">
			<h1 className="text-destructive font-bold text-4xl text-center">
				Something went wrong with the authentication
			</h1>
			<Button asChild variant="link">
				<Link href="/auth/signin">Click here to try again.</Link>
			</Button>
		</div>
	)
}
