import { cx } from '@/lib/cva.config'
import { signInWithCredentials } from '@/lib/actions/auth'
import { label } from '@/ui/label'
import { input } from '@/ui/input'
import { button } from '@/ui/button'
import Link from 'next/link'

export default function Page() {
	return (
		<article
			className={cx(
				'border border-stone-800 grid gap-y-4 bg-stone-900 rounded-lg p-4',
			)}
		>
			<header className="max-w-prose">
				<strong>Sign in</strong>
				<p>Sign in via Google or by sending a magic link to your email.</p>
			</header>
			<form className="grid gap-4" action={signInWithCredentials}>
				<label className={label}>Email</label>
				<input className={input} type="email" name="email" id="email" />
				<label className={label}>Password</label>
				<input
					className={input}
					type="password"
					name="password"
					id="password"
				/>
				<button className={button} type="submit">
					Sign In
				</button>
			</form>
			<div className="flex gap-4">
				<Link
					href="/auth/signin/google"
					className="w-full  text-center font-medium underline underline-offset-4 text-green-400 hover:text-green-200 transition-colors duration-500"
				>
					Sign In With Google
				</Link>
				<Link
					href="/auth/signin/email"
					className="w-full text-center font-medium underline underline-offset-4 text-green-400 hover:text-green-200 transition-colors duration-500"
				>
					Sign In With Email
				</Link>
			</div>
		</article>
	)
}
