import { signInWithCredentials } from '@/lib/actions/auth'
import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'
import { link } from '@/ui/link'
import Link from 'next/link'

export default function Page() {
	return (
		<form className={form}>
			<header className="max-w-prose">
				<h2 className="font-bold text-xl text-pretty">
					Sign-in to Brainleap 🧠
				</h2>
				<p>Sign-in with Google, Email, or Email and Password</p>
			</header>
			<label className={label}>Email</label>
			<input className={input} type="email" name="email" id="email" />
			<label className={label}>Password</label>
			<input className={input} type="password" name="password" id="password" />
			<button
				formAction={signInWithCredentials}
				className={button}
				type="submit"
			>
				Sign In
			</button>
			<div className="flex gap-4">
				<Link href="/auth/signin/google" className={link}>
					Sign In With Google
				</Link>
				<Link href="/auth/signin/email" className={link}>
					Sign In With Email
				</Link>
			</div>
			<div className="flex justify-center">
				<p>
					Don't have an account?{' '}
					<Link className={link} href="/auth/signup">
						Sign Up
					</Link>
				</p>
			</div>
		</form>
	)
}
