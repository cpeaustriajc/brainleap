import { Input } from './ui/input'
import { z } from 'zod'
import { Button } from './ui/button'
import { getSupabaseAuthRedirectURL } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Label } from './ui/label'
import { Separator } from './ui/separator'

const authFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
})

export function AuthForm() {
	async function signInWithEmail(formData: FormData) {
		'use server'
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const values = authFormSchema.safeParse({
			email: formData.get('email'),
		})

		if (!values.success) {
			return {
				errors: values.error.flatten().fieldErrors,
			}
		}

		const { error } = await supabase.auth.signInWithOtp({
			email: values.data.email,
			options: {
				data: {
					email: values.data.email,
				},

				emailRedirectTo: getSupabaseAuthRedirectURL('/profile'),
			},
		})

		if (error) {
			throw error
		}
	}
	async function action(formData: FormData) {
		'use server'
		signInWithEmail(formData)
	}

	async function signInWithGoogle() {
		'use server'

		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: getSupabaseAuthRedirectURL('/api/auth/callback'),
			},
		})

		if (error) {
			throw error
		}
	}

	async function signInWithGoogleAction() {
		'use server'
		signInWithGoogle()
	}

	return (
		<div className="flex flex-col space-y-2">
			<form className="flex flex-col space-y-2" action={action}>
				<div>
					<h1 className="text-xl font-bold">Sign in</h1>
					<p className="text-sm">
						Sign in via magic link with your email below
					</p>
				</div>
				<Label htmlFor="email">Email</Label>
				<Input
					placeholder="johndoe@email.com"
					name="email"
					id="email"
				/>
				<Button type="submit">Sign In</Button>
				<Separator />
				<Button type="submit" formAction={signInWithGoogleAction}>
					Sign In With Google
				</Button>
			</form>
		</div>
	)
}
