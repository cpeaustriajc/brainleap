import { cx } from '@/lib/cva.config'
import { SignInWithEmail } from './magic-link-form'
import { OAuthForm } from './oauth-form'

export default function Page() {
	return (
		<article
			className={cx(
				'border border-stone-800 grid gap-y-4 bg-stone-900 rounded-lg p-4',
			)}
		>
			<header className="max-w-prose">
				<strong>Sign in</strong>
				<p>Sign in via Google or by sending a magic link to your email.</p>
			</header>
			<OAuthForm />
			<SignInWithEmail />
		</article>
	)
}
