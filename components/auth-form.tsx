'use client'
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { getSupabaseAuthRedirectURL } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const authFormSchema = z.object({
	email: z.string().email(),
})

type AuthFormSchema = z.infer<typeof authFormSchema>

export function AuthForm() {
	const form = useForm<AuthFormSchema>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			email: '',
		},
	})

	async function onSubmit(values: z.infer<typeof authFormSchema>) {
		const supabase = createClient()
		const { error } = await supabase.auth.signInWithOtp({
			email: values.email ?? '',
			options: {
				emailRedirectTo: getSupabaseAuthRedirectURL('/profile'),
				shouldCreateUser: true,
			},
		})

		if (error) {
			throw error
		}
	}

	async function signInWithGoogle() {
		const supabase = createClient()

		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: getSupabaseAuthRedirectURL('/api/auth/callback'),
			},
		})
	}
	return (
		<div className="flex flex-col space-y-2">
			<Form {...form}>
				<form
					className="flex flex-col space-y-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div>
						<h1 className="text-xl font-bold">Sign in</h1>
						<p className="text-sm">
							Sign in via magic link with your email below
						</p>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<Input
									placeholder="johndoe@email.com"
									{...field}
								/>
								<FormDescription>
									We will send you a magic link to sign in
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Sign In</Button>
				</form>
			</Form>
			<hr />
			<div className="flex flex-col">
				<Button onClick={signInWithGoogle}>Sign In With Google</Button>
			</div>
		</div>
	)
}
