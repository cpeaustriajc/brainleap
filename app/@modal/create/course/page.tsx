import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addClass } from '@/lib/actions'
import { Cross1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function Page() {
	const action = async (formData: FormData) => {
		'use server'
		addClass(formData)
	}
	return (
		<div className="absolute backdrop-blur w-full h-[100svh] top-0 bg-neutral-800 bg-opacity-5">
			<form
				action={action}
				className="flex flex-col space-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-border p-4 rounded bg-card"
			>
				<div className="grid items-center">
					<Button
						type="button"
						className="justify-self-end"
						size="icon"
						variant="ghost"
						asChild
					>
						<Link href="/">
							<span className="sr-only">Close</span>
							<Cross1Icon />
						</Link>
					</Button>
				</div>
				<fieldset>
					<legend className="text-lg font-semibold my-2">
						Add a class
					</legend>
					<Label htmlFor="title">Class Title</Label>
					<Input
						type="text"
						id="title"
						name="title"
						placeholder="Class Title"
					/>
					<Label htmlFor="description">Class Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Class Description"
					/>
				</fieldset>
				<Button type="submit">Add Class</Button>
			</form>
		</div>
	)
}
