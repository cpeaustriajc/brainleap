import { Button } from '@/ui/button'
import { Form } from '@/ui/form'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<h2 className="text-4xl tracking-tight">
				Are you sure you want to sign out?
			</h2>
			<Form
				action="/api/auth/signout"
				method="post"
			>
				<Button type="submit" size="lg">
					Log Out
				</Button>
			</Form>
			<Link href="/">
				<Button variant="ghost" size="lg">
					Cancel
				</Button>
			</Link>
		</div>
	)
}
