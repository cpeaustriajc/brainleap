import { signInWithGoogle } from '@/lib/actions/auth'
import { button } from '@/ui/button'
import { form } from '@/ui/form'

export default function GoogleSignIn() {
	return (
		<form className={form}>
			<h2>Continue Signing in to Google</h2>
			<button type="submit" formAction={signInWithGoogle} className={button}>
				Sign in with Google
			</button>
		</form>
	)
}
