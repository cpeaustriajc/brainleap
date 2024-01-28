import React from 'react'
import Link from 'next/link'
import { button } from '@/ui/button'

export default function Page() {
	return (
		<React.Fragment>
			<Link className={button} href="/profile/setup/username">
				Setup Username
			</Link>
		</React.Fragment>
	)
}
