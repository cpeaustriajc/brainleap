import { createClient } from '@/lib/supabase/server'
import { link } from '@/ui/link'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export async function Header() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	return (
		<header>
			<nav>
				<ul>
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
