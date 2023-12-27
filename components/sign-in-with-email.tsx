import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { signInWithEmail } from '@/lib/actions/auth'

export function SignInWithEmail() {
	return (
		<form action={signInWithEmail} className="flex flex-col space-y-2">
			<div>
				<h1 className="text-xl font-bold">Sign in</h1>
				<p className="text-sm">
					Sign in via magic link with your email below
				</p>
			</div>
			<Label htmlFor="email">Email</Label>
			<Input
				placeholder="johndoe@email.com"
				id="email"
				name="email"
				required
			/>
			<Button type="submit">Sign In</Button>
		</form>
	)
}
