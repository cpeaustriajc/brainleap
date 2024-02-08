import { createClient } from '@/lib/supabase/server'
import { link } from '@/ui/link'
import Link from 'next/link'
import React from 'react'

export async function Header() {
	const supabase = createClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()

	return (
		<header className="flex justify-between items-center px-4 py-2">
			<h1 className="text-xl">
				<Link href="/">🧠</Link>
			</h1>
			<nav>
				<ul className="flex items-center gap-4">
					{session ? (
						<React.Fragment>
							<li>
								<Link href="/dashboard" className={link}>
									Dashboard
								</Link>
							</li>
							<li>
								<Link href="/auth/signout" className={link}>
									Sign Out
								</Link>
							</li>
						</React.Fragment>
					) : (
						<React.Fragment>
							<li>
								<Link href="/auth/signin" className={link}>
									Sign In
								</Link>
							</li>
							<li>
								<Link href="/auth/signup" className={link}>
									Sign Up
								</Link>
							</li>
						</React.Fragment>
					)}
				</ul>
			</nav>
		</header>
	)
}
