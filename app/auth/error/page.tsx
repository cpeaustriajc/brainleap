'use client'

import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function Page() {
	return (
		<main className="flex flex-col justify-center items-center h-dvh gap-8">
			<ExclamationTriangleIcon className="text-destructive size-16 self-center" />
			<section className="text-center flex flex-col gap-4">
				<h2 className="text-4xl font-bold text-destructive">Oops!</h2>
				<p className="text-lg">
					It seems like something went wrong. We&apos;re sorry for the
					inconvenience.
				</p>
			</section>
			<Button asChild>
				<Link href="/auth/signin">Try Again</Link>
			</Button>
		</main>
	)
}
