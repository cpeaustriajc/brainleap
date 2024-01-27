import { SignInWithGoogle } from '@/components/sign-in-with-google'
import { SignInWithEmail } from '@/components/sign-in-with-email'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
export default function Page() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign in</CardTitle>
				<CardDescription>
					Sign in via Google or by sending a magic link to your email.
				</CardDescription>
			</CardHeader>
			<CardContent>
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
			</CardContent>
		</Card>
	)
}
