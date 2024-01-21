import { cx } from '@/lib/cva.config'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<main className="max-w-screen-xl mx-auto">
			<header className="flex items-center py-4 justify-between">
				<Link href="/">
					<Image
						src="/doctrina.png"
						alt="Doctrina Logo"
						width={48}
						height={48}
					/>
				</Link>
				<nav className="pt-2 px-4">
					<ul className="flex items-center gap-4">
						{user ? (
							<>
								<li>
									<Link
										href="/dashboard"
										className={cx(
											'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
											'bg-primary text-primary-foreground hover:bg-primary/90',
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
										'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
										'bg-primary text-primary-foreground hover:bg-primary/90',
										'disabled:pointer-events-none disabled:opacity-50',
										'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
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
			<article className="pt-4">
				<section className="grid justify-center justify-items-center gap-4 pt-16">
					<h1 className="text-4xl text-foreground max-w-screen-lg tracking-tight font-bold text-center">
						DOCTRINA: AN E-LEARNING PLATFORM TOOL BASED ON GOOGLE
						CLASSROOM FOR 3RD YEAR ENGINEERING DEPARTMENT AT
						PAMANTASAN NG LUNGSOD NG SAN PABLO
					</h1>
					<h2 className="text-xl font-semibold max-w-screen-md text-center text-secondary-foreground">
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
