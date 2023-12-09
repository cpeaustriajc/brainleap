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
	async function onSubmit(formData: FormData) {
		'use server'
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const values = authFormSchema.parse(formData)

		const { error } = await supabase.auth.signInWithOtp({
			email: values.email,
			options: {
				data: {
					email: values.email,
				},

				emailRedirectTo: getSupabaseAuthRedirectURL('/profile'),
			},
		})

		if (error) {
			throw error
		}
	}

	async function signInWithGoogle() {
		'use server'

		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: getSupabaseAuthRedirectURL('/api/auth/callback'),
			},
		})
	}
	return (
		<div className="flex flex-col space-y-2">
			<form className="flex flex-col space-y-2" action={onSubmit}>
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
				<Button formAction={signInWithGoogle}>
					Sign In With Google
				</Button>
			</form>
		</div>
	)
}
