'use client'

import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useEffect, useTransition } from 'react'
import { Tables } from '@/lib/definitions'
import { createClient } from '@/lib/supabase/client'
import { createPostgresTimestamp } from '@/lib/utils'
import { useRouter } from 'next/router'

export const baseProfileSchema = z.object({
	id: z.string().uuid().optional(),
	username: z.string().min(3).max(20),
	picture: z.string().url().optional(),
	biography: z
		.string()
		.min(10, { message: 'Bio must be at least 10 characters.' })
		.max(160, { message: 'Bio must not be longer than 30 characters.' })
		.optional(),
	email: z.string().email(),
	university: z.string().max(280).optional(),
	full_name: z.string().max(280).optional(),
})

export const profileSchema = z.discriminatedUnion('role', [
	z.object({ role: z.literal(undefined) }).merge(baseProfileSchema),
	z
		.object({
			role: z.literal('student'),
			section: z.string().max(2).optional(),
			program: z.string().max(280).optional(),
		})
		.merge(baseProfileSchema),
	z
		.object({
			role: z.literal('instructor'),
			position: z.string().max(280).optional(),
		})
		.merge(baseProfileSchema),
])

export function SetupProfileForm({
	profile,
}: {
	profile: Tables<'profiles'> | null
}) {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			picture: profile?.avatar_url ?? undefined,
			username: profile?.username ?? undefined,
			full_name: profile?.full_name ?? undefined,
			university: undefined,
			biography: undefined,
			section: undefined,
			email: profile?.email ?? undefined,
			program: undefined,
			role: profile?.role ?? 'student',
			position: undefined,
		},
	})

	const watchRole = form.watch('role')

	useEffect(() => {
		if (watchRole === 'student') {
			form.register('university')
			form.register('section')
			form.unregister('position')
		} else if (watchRole === 'instructor') {
			form.register('position')
			form.unregister('university')
			form.unregister('section')
		}
	}, [watchRole, form])

	async function updateProfile(data: z.infer<typeof profileSchema>) {
		const supabase = createClient()
		const date = new Date()
		const updated_at = createPostgresTimestamp(date)

		const {
			data: { session },
			error: sessionError,
		} = await supabase.auth.getSession()

		if (sessionError) {
			throw sessionError
		}

		if (data.role === 'student') {
			const { error } = await supabase
				.from('profiles')
				.update({
					full_name: data.full_name,
					username: data.username,
					biography: data.biography,
					program: data.program,
					section: data.section,
					university: data.university,
					email: data.email,
					updated_at,
				})
				.eq('profile_id', session?.user.id ?? '')

			if (error) {
				throw error
			}
		} else if (data.role === 'instructor') {
			const { error } = await supabase
				.from('profiles')
				.update({
					full_name: data.full_name,
					username: data.username,
					biography: data.biography,
					position: data.position,
					email: data.email,
					role: data.role,
					updated_at,
				})
				.eq('profile_id', session?.user.id ?? '')
			if (error) {
				throw error
			}
		}

		router.push('/')
	}

	const onSubmit: SubmitHandler<z.infer<typeof profileSchema>> = (data) => {
		startTransition(() => updateProfile(data))
	}

	return (
		<>
		{/* <form action={}>

		</form> */}
			<Form {...form}>
				<form
					className="max-w-2xl mx-auto my-4 space-y-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{/* <FormField
					name="picture"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<div>
								<Avatar>
									<AvatarImage
										src={form.getValues('picture')}
									/>
									<AvatarFallback>
										{getInitials(
											form.getValues('displayName'),
										)}
									</AvatarFallback>
								</Avatar>
							</div>
							<FormLabel>Picture</FormLabel>
							<FormDescription>
								Upload a picture of yourself
							</FormDescription>
							<FormControl>
								<Input type="file" placeholder="Picture" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}
					<FormField
						name="username"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormDescription>
									Specify your username
								</FormDescription>
								<FormControl>
									<Input
										type="text"
										placeholder="Username"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="full_name"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Display Name</FormLabel>
								<FormDescription>
									Specify your Display Name
								</FormDescription>
								<FormControl>
									<Input
										type="text"
										placeholder="Diplay Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="email"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormDescription>
									Specify your Email
								</FormDescription>
								<FormControl>
									<Input
										type="email"
										placeholder="johndoe@email.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="biography"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Biography</FormLabel>
								<FormDescription>
									Introduce yourself e.g. your hobbies,
									interests, etc.
								</FormDescription>
								<FormControl>
									<Textarea
										placeholder="Tell us a little bit about yourself"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="university"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>University</FormLabel>
								<FormDescription>
									What is the name of your university?
								</FormDescription>
								<FormControl>
									<Input
										type="text"
										placeholder="Harvard University"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="role"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<FormDescription>
									Are you a student or a teacher?
								</FormDescription>
								<FormControl>
									<RadioGroup
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormItem>
											<FormControl>
												<RadioGroupItem
													value="student"
													id="student"
												/>
											</FormControl>
											<FormLabel>Student</FormLabel>
										</FormItem>

										<FormItem>
											<FormControl>
												<RadioGroupItem
													value="instructor"
													id="instructor"
												/>
											</FormControl>
											<FormLabel>Instructor</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					{watchRole === 'student' ? (
						<>
							<FormField
								name="program"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Program</FormLabel>
										<FormDescription>
											What is your current program?
										</FormDescription>
										<FormControl>
											<Input
												type="text"
												placeholder="Program"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="section"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Section</FormLabel>
										<FormDescription>
											What is your current section?
										</FormDescription>
										<FormControl>
											<Input
												type="text"
												placeholder="Section"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					) : (
						<FormField
							name="position"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Position</FormLabel>
									<FormDescription>
										What is your current position?
									</FormDescription>
									<FormControl>
										<Input
											{...field}
											placeholder="Your current position"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<Button type="submit" disabled={isPending}>
						Submit
					</Button>
				</form>
			</Form>
		</>
	)
}
