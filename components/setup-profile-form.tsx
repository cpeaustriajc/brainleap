'use client'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { mutateProfile } from '@/lib/actions'
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
import { useSession } from 'next-auth/react'
import { Textarea } from './ui/textarea'
import { useTransition } from 'react'

export const profileSchema = z.object({
	role: z.enum(['student', 'teacher']),
	username: z.string().min(3).max(20),
	biography: z
		.string()
		.min(10, { message: 'Bio must be at least 10 characters.' })
		.max(160, { message: 'Bio must not be longer than 30 characters.' })
		.optional(),
	email: z.string().email(),
	university: z.string().max(280).optional(),
	program: z.string().max(280).optional(),
	displayName: z.string().max(280).optional(),
})

const extractUsername = (email: string) => {
	let username = email.split('@')[0]
	username = username.replace(/[^a-zA-Z0-9]/g, '')
	username = username.toLowerCase()
	return username
}

export function SetupProfileForm() {
	const session = useSession()
	const username = extractUsername(session?.data?.user.email ?? '')
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			username,
			displayName: session?.data?.user.name ?? '`',
			email: session?.data?.user.email ?? '',
		},
	})

	const onSubmit: SubmitHandler<z.infer<typeof profileSchema>> = (data) => {
		startTransition(() => mutateProfile(data))
	}
	return (
		<Form {...form}>
			<form
				className="max-w-2xl mx-auto my-4 space-y-4"
				onSubmit={form.handleSubmit(onSubmit)}
			>
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
					name="displayName"
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
					name="biography"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Biography</FormLabel>
							<FormDescription>
								Introduce yourself e.g. your hobbies, interests,
								etc.
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
									placeholder="University"
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
												value="teacher"
												id="teacher"
											/>
										</FormControl>
										<FormLabel>Teacher</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				{form.getValues('role') === 'student' && (
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
				)}

				{form.getValues('role') === 'teacher' && (
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
	)
}
