import { signUp } from '@/lib/actions/auth'
import { cx } from '@/lib/cva.config'
import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'
import { link } from '@/ui/link'
import Link from 'next/link'

export default function SignUpPage() {
	return (
		<form className={cx(form)} action={signUp}>
			<header className="max-w-prose">
				<h2 className="font-bold text-xl text-pretty">
					Welcome to Brainleap! 🧠
				</h2>
				<p>
					We&apos;re glad that you&apos;re getting onboard, get
					started by filling out these fields
				</p>
			</header>
			<label className={cx(label)} htmlFor="name">
				Name
			</label>
			<input
				className={cx(input)}
				type="text"
				name="name"
				id="name"
				required
			/>
			<label className={cx(label)} htmlFor="username">
				Username
			</label>
			<input
				className={cx(input)}
				type="text"
				name="username"
				id="username"
				required
			/>
			<label className={cx(label)} htmlFor="email">
				Email
			</label>
			<input
				className={cx(input)}
				type="email"
				name="email"
				id="email"
				required
			/>
			<label className={cx(label)} htmlFor="password">
				Password
			</label>
			<input
				className={cx(input)}
				type="password"
				name="password"
				id="password"
				required
			/>
			<label className={cx(label)} htmlFor="confirmPassword">
				Confirm Password
			</label>
			<input
				className={cx(input)}
				type="password"
				name="confirmPassword"
				id="confirmPassword"
			/>
			<button className={cx(button)} type="submit">
				Sign Up
			</button>
			<div className="flex justify-center">
				<p>
					Already have an account?{' '}
					<Link className={link} href="/auth/signin">
						Sign In
					</Link>
				</p>
			</div>
		</form>
	)
}
