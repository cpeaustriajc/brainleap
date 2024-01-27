'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
	return (
		<header>
			<div>
				<div>
					<div>
						<Link href="/">
							<Image
								src="/doctrina.png"
								width={80}
								height={80}
								alt="The Logo of Doctrina"
								priority
							/>
							<span>Home</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
