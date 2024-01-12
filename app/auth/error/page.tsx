'use client'

import { buttonVariants } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function Page() {
	return (
		<section className="grid place-items-center gap-4">
			<ExclamationTriangleIcon className="text-destructive size-16 self-center" />
			<div className="text-center flex flex-col gap-4">
				<h2 className="text-4xl font-bold text-destructive">Oops!</h2>
				<p className="text-lg">
					It seems like something went wrong. We&apos;re sorry for the
					inconvenience.
				</p>
			</div>
			<Link href="/auth/signin" className={buttonVariants()}>
				Try Again
			</Link>
		</section>
	)
}
