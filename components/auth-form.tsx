import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { SignInWithGoogle } from './sign-in-with-google'
import { signInWithEmail } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'

export function AuthForm({ message }: { message: string }) {
	async function action(formData: FormData) {
		'use server'
		const result = await signInWithEmail(formData)

		if (result?.errors) {
			console.error(result?.errors)
			return redirect(
				'/auth/signin?message=Something went wrong. Please try again.',
			)
		}

		return redirect(
			'/auth/signin?message=We have sent you an email. Please check for confirmation.',
		)
	}

	return (
		<div className="flex flex-col space-y-2">
			<form className="flex flex-col space-y-2">
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
				/>
				<Button formAction={action} type="submit">
					Sign In
				</Button>
			</form>
			<Separator />
			<SignInWithGoogle />
			{message && (
				<p
					className="text-primary font-semibold"
					aria-live="polite"
					role="status"
				>
					{message}
				</p>
			)}
		</div>
	)
}
