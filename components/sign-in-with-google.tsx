import { signInWithGoogle } from '@/lib/actions/auth'
import { Button } from './ui/button'

export function SignInWithGoogle() {
	return (
		<form action={signInWithGoogle} className="flex flex-col">
			<Button type="submit">Sign in with Google</Button>
		</form>
	)
}
