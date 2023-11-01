'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import {
	HamburgerMenuIcon,
	PersonIcon,
	ChevronRightIcon,
} from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { Search } from './search'
const DropdownMenu = dynamic(
	() => import('./ui/dropdown-menu').then((mod) => mod.DropdownMenu),
	{ ssr: false },
)
const DropdownMenuContent = dynamic(
	() => import('./ui/dropdown-menu').then((mod) => mod.DropdownMenuContent),
	{ ssr: false },
)
const DropdownMenuTrigger = dynamic(
	() => import('./ui/dropdown-menu').then((mod) => mod.DropdownMenuTrigger),
	{ ssr: false },
)
const Sheet = dynamic(() => import('./ui/sheet').then((mod) => mod.Sheet), {
	ssr: false,
})
const SheetContent = dynamic(
	() => import('./ui/sheet').then((mod) => mod.SheetContent),
	{ ssr: false },
)
const SheetTrigger = dynamic(
	() => import('./ui/sheet').then((mod) => mod.SheetTrigger),
	{ ssr: false },
)

export function Header() {
	const { data, status } = useSession()
	const activeUser = data?.user
	const profilePath =
		activeUser?.role === 'teacher' ? '/profile/teacher' : '/profile/student'

	return (
		<header className="px-4 py-2">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost">
								<HamburgerMenuIcon />
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
				<Search />
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost">
								<PersonIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" align="end">
							<Button asChild variant="link" size="icon">
								{status === 'authenticated' ? (
									<Link href={profilePath}>Profile</Link>
								) : (
									<Button
										asChild
										variant="link"
										className="w-full"
									>
										<Link href="/auth/signin">Sign in</Link>
									</Button>
								)}
							</Button>
						</DropdownMenuContent>
					</DropdownMenu>
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}
