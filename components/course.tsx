import Link from 'next/link'

export function Course() {
	return (
		<Link href="/course/cpe314">
			<div className="border w-64 h-64 rounded px-4 py-2">
				<h2 className="font-bold">Course Title</h2>
			</div>
		</Link>
	)
}
