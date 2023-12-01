import { Button } from './ui/button'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'
import { DialogContent, DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from './ui/textarea'

const classFormSchema = z.object({
	id: z.string().uuid().optional(),
	title: z.string().min(3).max(20),
	description: z.string().min(10).max(160),
})

export function AddClassButton() {
	const form = useForm<z.infer<typeof classFormSchema>>({
		resolver: zodResolver(classFormSchema),
		defaultValues: {
			id: '',
			description: '',
			title: '',
		},
	})
	async function addClass() {
		const supabase = createBrowserClient<Database>(
			process.env['NEXT_PUBLIC_SUPABASE_URL']!,
			process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
		)
	}
	return (
		<>
			<DialogContent>
				<DialogHeader>Add Class</DialogHeader>
				<Form {...form}>
					<form className="space-y-8">
						<FormField
							name="title"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Class Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Class Title"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Class Description</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type="submit" size="lg">
							Submit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</>
	)
}
