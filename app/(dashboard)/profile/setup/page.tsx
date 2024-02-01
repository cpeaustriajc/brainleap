import React from 'react'
import Link from 'next/link'

export default function Page() {
	return (
		<React.Fragment>
			<Link
				className="underline underline-offset-4 capitalize text-green-400 font-medium"
				href="/profile/setup/username"
			>
				start by setting up your username
			</Link>
		</React.Fragment>
	)
}
