import { Button } from '@/components/ui/button'

export default function Page() {
	return (
		<div className='flex flex-col justify-center items-center gap-4'>
			<h2 className="text-4xl tracking-tight">
				Are you sure you want to sign out?
			</h2>
			<form action="/api/auth/signout" method="POST">
				<Button type="submit" size="lg">Log Out</Button>
			</form>
		</div>
	)
}
