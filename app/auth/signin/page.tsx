import { SignInWithGoogle } from '@/components/sign-in-with-google'
import { SignInWithEmail } from '@/components/sign-in-with-email'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
export default function Page() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl tracking-tight font-bold">
					Sign in
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Sign in via Google or by sending a magic link to your email.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<SignInWithGoogle />
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-card px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				<SignInWithEmail />
			</CardContent>
		</Card>
	)
}
