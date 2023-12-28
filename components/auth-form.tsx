import { Separator } from './ui/separator'
import { SignInWithGoogle } from './sign-in-with-google'
import { SignInWithEmail } from './sign-in-with-email'

export function AuthForm() {
	return (
		<div className="flex flex-col space-y-2">
			<SignInWithEmail />
			<Separator />
			<SignInWithGoogle />
		</div>
	)
}
