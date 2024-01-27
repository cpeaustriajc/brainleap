import { cx } from '@/lib/cva.config'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export const content = {
	hero: 'Meet your next assistant to a better learning experience.',
	about: 'Brainleap is a collaborative e-learning platform tool that is focused on using AI as an assistant.',
}

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	return (
		<main>
			<header>
				<nav>
					<ul>
						{session ? (
							<>
								<li>
									<Link
										href="/dashboard"
										className={cx(
											'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
											'bg-green-500 text-green-50 hover:bg-primary/90',
											'disabled:pointer-events-none disabled:opacity-50',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
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
											'bg-primary text-primary-foreground hover:bg-primary/90',
											'disabled:pointer-events-none disabled:opacity-50',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
											'h-9 rounded-md px-3',
										)}
									>
										Sign Out
									</Link>
								</li>
							</>
						) : (
							<li>
								<Link
									href="/auth/signin"
									className={cx(
										'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
										'bg-green-600 text-green-50  hover:bg-green-600/90',
										'disabled:pointer-events-none disabled:opacity-50',
										'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600  ring-offset-stone-900 focus-visible:ring-offset-2 ',
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
			<article>
				<section>
					<h1>{content.hero}</h1>
					<h2>
						A collaborative e-learning platform tool based on Google
						Classroom for 3rd year engineering department at
						Pamantasan ng Lungsod ng San Pablo
					</h2>
				</section>

				<section>
					<p></p>
				</section>
			</article>
		</main>
	)
}
