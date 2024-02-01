import { cx } from '@/lib/cva.config'
import { createClient } from '@/lib/supabase/server'
import { button } from '@/ui/button'
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
								<Link
									href="/dashboard"
									className="font-medium underline underline-offset-4 text-green-400 hover:text-green-200 transition-colors duration-500"
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									href="/auth/signout"
									className="font-medium underline underline-offset-4 text-green-400 hover:text-green-200 transition-colors duration-500"
								>
									Sign Out
								</Link>
							</li>
						</React.Fragment>
					) : (
						<React.Fragment>
							<li>
								<Link
									href="/auth/signin"
									className="font-medium underline underline-offset-4 text-green-400 hover:text-green-200 transition-colors duration-500"
								>
									Sign In
								</Link>
							</li>
							<li>
								<Link
									href="/auth/signup"
									className="font-medium underline underline-offset-4 text-green-400 hover:text-green-200 transition-colors duration-500"
								>
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
