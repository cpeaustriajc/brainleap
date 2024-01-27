import { cx } from '@/lib/cva.config'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
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
		<main className="max-w-screen-xl mx-auto">
			<header className="flex items-center py-4 justify-between">
				<Link href="/">
					<Image
						src="/doctrina.png"
						alt="Doctrina Logo"
						className={cx(
							'focus:outline focus:outline-green-500  rounded-full'
						)}
						priority
						width={36}
						height={36}
					/>
				</Link>
				<nav className="pt-2 px-4">
					<ul className="flex items-center gap-4">
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
			<article className="pt-4">
				<section className="grid justify-center justify-items-center gap-4 pt-16">
					<h1 className="text-4xl text-foreground max-w-screen-lg tracking-tight font-bold text-center">
						{content.hero}
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
