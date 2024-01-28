import { cx } from '@/lib/cva.config'
import { createClient } from '@/lib/supabase/server'
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
									className={cx(
										'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
										'bg-green-500 text-green-50 hover:bg-primary/90',
										'disabled:pointer-events-none disabled:opacity-50',
										'focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600  focus-visible:outline-offset-2 ',
										'h-9 rounded-md px-3',
									)}
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									href="/auth/signout"
									className={cx(
										'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
										'bg-green-600 text-green-50 hover:bg-green-600/90',
										'disabled:pointer-events-none disabled:opacity-50',
										'focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600  focus-visible:outline-offset-2 ',
										'h-9 rounded-md px-3',
									)}
								>
									Sign Out
								</Link>
							</li>
						</React.Fragment>
					) : (
						<li>
							<Link
								href="/auth/signin"
								className={cx(
									'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
									'bg-green-600 text-green-50  hover:bg-green-600/90',
									'disabled:pointer-events-none disabled:opacity-50',
									'focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600  focus-visible:outline-offset-2 ',
									'h-10 px-4 py-2',
								)}
							>
								Sign In
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}
