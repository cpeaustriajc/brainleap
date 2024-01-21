import Link from 'next/link'

export default async function Page() {
	return (
		<main className="grid place-items-center h-full place-content-center">
			<p className="text-lg font-medium">The app is getting redesigned</p>
			<Link href="https://github.com/jayzersdotdev/doctrina">
				See the progress in the canary branch of doctrina
			</Link>
		</main>
	)
}
