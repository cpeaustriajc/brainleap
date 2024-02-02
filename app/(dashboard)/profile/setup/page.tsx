import { link } from '@/ui/link'
import Link from 'next/link'
import React from 'react'

export default function Page() {
	return (
		<React.Fragment>
			<Link
				className={link}
				href="/profile/setup/username"
			>
				start by setting up your username
			</Link>
		</React.Fragment>
	)
}
