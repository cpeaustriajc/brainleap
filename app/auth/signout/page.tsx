import { Form } from '@/ui/form'
import Link from 'next/link'

export default function Page() {
	return (
		<div>
			<h2>Are you sure you want to sign out?</h2>
			<Form action="/api/auth/signout" method="post">
				<button type="submit">Log Out</button>
			</Form>
			<Link href="/">
				<button>Cancel</button>
			</Link>
		</div>
	)
}
