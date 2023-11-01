'use client'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { setupProfile } from '@/lib/actions'
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
import { useTransition } from 'react'
import { Input } from './ui/input'
import { useSession } from 'next-auth/react'

export const setupProfileFormSchema = z.object({
	role: z.enum(['student', 'teacher']),
	username: z.string().min(3).max(20),
})

export function SetupProfileForm() {
	const [isPending, startTransition] = useTransition()
	const session = useSession()

	const extractUsername = (email: string) => {
		let username = email.split('@')[0]
		username = username.replace(/[^a-zA-Z0-9]/g, '')
		username = username.toLowerCase()
		return username
	}

	const userName = extractUsername(session?.data?.user?.email  ?? '')

	const form = useForm<z.infer<typeof setupProfileFormSchema>>({
		resolver: zodResolver(setupProfileFormSchema),
		defaultValues: {
			role: 'student',
			username: userName,
		},
	})

	const onSubmit: SubmitHandler<z.infer<typeof setupProfileFormSchema>> = (
		data,
	) => {
		console.log(data)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					name="username"
					control={form.control}
					render={() => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormDescription>
								Specify your username
							</FormDescription>
							<FormControl>
								<Input type="text" placeholder="Username" />
							</FormControl>
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
