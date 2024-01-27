'use client'

import Link from 'next/link'

export function Header() {
	return (
		<header>
			<div>
				<div>
					<div>
						<Link href="/">
							<span>Home</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
