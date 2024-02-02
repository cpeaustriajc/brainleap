import { Tables } from '@/lib/database.types'
import Link from 'next/link'

export function Tabs({
	courses,
}: { courses: Array<Pick<Tables<'courses'>, 'course_id' | 'course_name'>> }) {
	return (
		<nav className="col-start-1 px-2 row-span-3">
			<ul
				className="grid py-4 gap-2"
				role="tablist"
				aria-orientation="vertical"
			>
				<li role="presentation" className="">
					<Link
						role="tab"
						href="/dashboard"
						className="inline-flex w-full shadow-inner bg-stone-800 shadow-stone-700/50 border-stone-700/50 border rounded-lg h-9 items-center px-4 py-2 text-xl text-stone-200 hover:text-green-200 transition-colors"
					>
						Home
					</Link>
				</li>
				{courses.length > 0 &&
					courses.map((course) => (
						<li key={course.course_id} role="presentation">
							<Link
								href={`/course/${course.course_id}`}
								className="inline-flex w-full shadow-inner bg-stone-800 shadow-stone-700/50 border-stone-700/50 border rounded-lg h-9 items-center px-4 py-2 text-xl text-stone-200 hover:text-green-200 transition-colors"
								role="tab"
							>
								{course.course_name}
							</Link>
						</li>
					))}
			</ul>
		</nav>
	)
}
