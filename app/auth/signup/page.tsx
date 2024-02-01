import { cx } from '@/lib/cva.config'
import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'

export default function SignUpPage() {
	return (
		<form
			className={cx(
				form,
				'bg-stone-600 shadow-xl shadow-stone-950/50 rounded-md p-4 max-w-96',
			)}
		>
			<header className="max-w-prose">
				<h2 className="font-bold text-xl text-pretty">Welcome to Brainleap! 🧠</h2>
				<p>
					We're glad that you're getting onboard, get started by filling out
					these fields
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
			<button className={cx(button)} type="submit">
				Sign Up
			</button>
		</form>
	)
}
