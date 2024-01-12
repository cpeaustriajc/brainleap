import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<h2 className="text-4xl tracking-tight">
				Are you sure you want to sign out?
			</h2>
			<form
				action="/api/auth/signout"
				className="grid gap-2"
				method="POST"
			>
				<Button type="submit" size="lg">
					Log Out
				</Button>
			</form>
			<Link href="/">
				<Button variant="ghost" size="lg">
					Cancel
				</Button>
			</Link>
		</div>
	)
}
