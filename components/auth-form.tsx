'use client'
import { createBrowserClient } from '@supabase/ssr'
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
import { signInWithEmail } from '@/lib/actions'
import { getSupabaseAuthRedirectURL } from '@/lib/utils'

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

	function onSubmit(data: z.infer<typeof authFormSchema>) {
		signInWithEmail(data.email)
	}

	async function signInWithGoogle() {
		const supabase = createBrowserClient(
			process.env['NEXT_PUBLIC_SUPABASE_URL']!,
			process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
		)

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
						<p className="text-sm text-secondary">
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
									type="email"
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
