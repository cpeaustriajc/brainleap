'use client'

import { MenuIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { activeUser } from '@/app/mock'
import { ThemeToggle } from './theme-toggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from './ui/input'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronRightIcon } from 'lucide-react'

export function Header() {
	const profilePath =
		activeUser.role === 'teacher' ? '/profile/teacher' : '/profile/student'

	return (
		<header className="px-4 py-2">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center">
					<Sheet id="menu-btn">
						<SheetTrigger asChild>
							<Button variant="ghost">
								<MenuIcon />
							</Button>
						</SheetTrigger>
						<SheetContent side="left"></SheetContent>
					</Sheet>
					<div className="px-2 inline-flex items-center">
						<Button asChild variant="link" className="px-0">
							<Link href="/">Doctrina </Link>
						</Button>

						<ChevronRightIcon className="text-primary" />
						<Button asChild variant="link" className="px-0">
							<Link href="/courses/cpe314">CPE314</Link>
						</Button>
					</div>
				</div>
				<search>
					<Input type="search" id="query" placeholder="Search" />
				</search>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost">
								<UserIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" align="end">
							<Button asChild variant="link" size="icon">
								<Link href={profilePath}>Profile</Link>
							</Button>
						</DropdownMenuContent>
					</DropdownMenu>
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}
