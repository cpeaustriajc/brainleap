import { z } from 'zod'
import { DialogContent } from './ui/dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Button } from './ui/button'

const joinClassSchema = z.object({
	classCode: z.string().uuid({ message: 'Invalid class code.' }),
})

export function JoinClassDialog() {
	const form = useForm<z.infer<typeof joinClassSchema>>({
		resolver: zodResolver(joinClassSchema),
		defaultValues: {
			classCode: '',
		},
	})

	return (
		<DialogContent>
			<Form {...form}>
				<form>
					<FormField
						name="classCode"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Class Code</FormLabel>
								<FormControl>
									<Input
										placeholder="Class Code"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Enter the class code provided by your
									instructor.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Join Class</Button>
				</form>
			</Form>
		</DialogContent>
	)
}
