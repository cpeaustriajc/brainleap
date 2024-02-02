'use client'

import { cx } from '@/lib/cva.config'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export function Tabs() {
	const params = useParams<{ id: string }>()
	const pathname = usePathname()
	console.log(pathname)
	return (
		<nav className="col-start-2 dark:bg-stone-900 p-4 rounded-tl-lg">
			<ul className="flex gap-2" role="tablist" aria-orientation="horizontal">
				<li
					className={cx(
						pathname === `/course/${params.id}` && 'bg-stone-800',
						'rounded h-9 flex items-center px-4 py-2',
					)}
					role="presentation"
				>
					<Link
						href={`/course/${params.id}`}
						className="text-xl dark:text-stone-300"
						role="tab"
					>
						Announcements
					</Link>
				</li>
				<li
					className={cx(
						pathname === `/course/${params.id}/assignments` && 'bg-stone-800',
						'rounded h-9 flex items-center px-4 py-4',
					)}
					role="presentation"
				>
					<Link
						href={`/course/${params.id}/assignments`}
						className="text-xl dark:text-stone-300"
						role="tab"
					>
						Assignments
					</Link>
				</li>
				<li
					className={cx(
						pathname === `/course/${params.id}/grades` && 'bg-stone-800',
						'rounded h-9 flex items-center px-4 py-4',
					)}
					role="presentation"
				>
					<Link
						href={`/course/${params.id}/grades`}
						className="text-xl dark:text-stone-300"
						role="tab"
					>
						Grades
					</Link>
				</li>
				<li
					className={cx(
						pathname === `/course/${params.id}/people` && 'bg-stone-800',
						'rounded h-9 flex items-center px-4 py-4',
					)}
					role="presentation"
				>
					<Link
						href={`/course/${params.id}/people`}
						className="text-xl dark:text-stone-300"
						role="tab"
					>
						People
					</Link>
				</li>
			</ul>
		</nav>
	)
}
