'use client'

import { cx } from '@/lib/cva.config'
import { Tables } from '@/lib/database.types'
import { BookmarkIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import ReactAria from 'react-aria-components'

export function AsideTabs({
	courses,
}: {
	courses: Pick<Tables<'courses'>, 'course_id' | 'course_name' | 'section'>[]
}) {
	const pathname = usePathname()
	return (
		<ReactAria.Tabs
			selectedKey={pathname}
			orientation="vertical"
			className={cx(
				'flex',
				// Horizontal
				'rac-orientation-horizontal:flex-col rac-orientation-horizontal:[--border-width:0_0_2px_0]',
				// Vertical
				'rac-orientation-vertical:[--border-width:0_2px_0_0]',
				'w-full',
			)}
		>
			<ReactAria.TabList
				aria-label="Tabs"
				className={cx(
					'group',
					'flex border-[length:var(--border-width)] border-slate-200 dark:border-slate-700',
					// Vertical
					'rac-orientation-vertical:flex-col',
					'w-full',
				)}
			>
				<ReactAria.Tab
					id="/"
					href="/"
					className={cx(
						'relative shrink-0 cursor-pointer border-[length:var(--border-width)] border-transparent px-4 py-2 text-muted-foreground outline-none transition-colors',
						// Focus-visible
						'focus-visible:ring-2 focus-visible:ring-slate-400',
						// Disabled
						'disabled:cursor-not-allowed disabled:opacity-40',
						// Horizontal
						'group-rac-orientation-horizontal:border-[width:var(--border-width)] group-rac-orientation-horizontal:top-[2px]',
						// Vertical
						'group-rac-orientation-vertical:border-[width:var(--border-width)] group-rac-orientation-vertical:left-[2px] group-rac-orientation-vertical:inline-flex',
						// Selected
						'rac-selected:border-[length:var(--border-width)] rac-selected:border-primary rac-selected:text-foreground',
					)}
				>
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-secondary transition-all p-2">
							<HomeIcon className="w-8 h-8" />
						</div>
						<span>Home</span>
					</div>
				</ReactAria.Tab>
				<ReactAria.Tab
					id="/profile"
					href="/profile"
					className={cx(
						'relative shrink-0 cursor-pointer border-[length:var(--border-width)] border-transparent px-4 py-2 text-muted-foreground outline-none transition-colors',
						// Focus-visible
						'focus-visible:ring-2 focus-visible:ring-slate-400',
						// Disabled
						'disabled:cursor-not-allowed disabled:opacity-40',
						// Horizontal
						'group-rac-orientation-horizontal:border-[width:var(--border-width)] group-rac-orientation-horizontal:top-[2px]',
						// Vertical
						'group-rac-orientation-vertical:border-[width:var(--border-width)] group-rac-orientation-vertical:left-[2px] group-rac-orientation-vertical:inline-flex',
						// Selected
						'rac-selected:border-[length:var(--border-width)] rac-selected:border-primary rac-selected:text-foreground',
					)}
				>
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-secondary transition-all p-2">
							<PersonIcon className="w-8 h-8" />
						</div>
						<span>Profile</span>
					</div>
				</ReactAria.Tab>
				{courses.map((course) => (
					<ReactAria.Tab
						id={`/course/${course.course_id}`}
						href={`/course/${course.course_id}`}
						key={course.course_id}
						className={cx(
							'relative shrink-0 cursor-pointer border-[length:var(--border-width)] border-transparent px-4 py-2 text-muted-foreground outline-none transition-colors',
							// Focus-visible
							'focus-visible:ring-2 focus-visible:ring-slate-400',
							// Disabled
							'disabled:cursor-not-allowed disabled:opacity-40',
							// Horizontal
							'group-rac-orientation-horizontal:border-[width:var(--border-width)] group-rac-orientation-horizontal:top-[2px]',
							// Vertical
							'group-rac-orientation-vertical:border-[width:var(--border-width)] group-rac-orientation-vertical:left-[2px] group-rac-orientation-vertical:inline-flex',
							// Selected
							'rac-selected:border-[length:var(--border-width)] rac-selected:border-primary rac-selected:text-foreground',
						)}
					>
						<div className="flex items-center gap-2">
							<div className="rounded-full bg-secondary transition-all p-2">
								<BookmarkIcon className="w-8 h-8" />
							</div>
							<div>
								<p>{course.course_name}</p>
								<p className="text-muted-foreground">
									{course.section}
								</p>
							</div>
						</div>
					</ReactAria.Tab>
				))}
			</ReactAria.TabList>
		</ReactAria.Tabs>
	)
}
