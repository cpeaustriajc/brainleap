import { SignInWithGoogle } from '@/components/sign-in-with-google'
import { SignInWithEmail } from '@/components/sign-in-with-email'

export default function Page() {
	return (
		<div>
			<div>
				<strong>Sign in</strong>
				<p>
					Sign in via Google or by sending a magic link to your email.
				</p>
			</div>
			<div>
				<SignInWithGoogle />
				<div>
					<div>
						<span />
					</div>
					<div>
						<span>Or continue with</span>
					</div>
				</div>
				<SignInWithEmail />
			</div>
		</div>
	)
}
