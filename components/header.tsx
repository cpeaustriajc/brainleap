'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import {
	HamburgerMenuIcon,
	PersonIcon,
	ChevronRightIcon,
} from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import { Search } from './search'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import {
	Session,
	createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
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

export function Header({ session }: { session: Session | null }) {
	const supabase = createClientComponentClient()
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
							{session ? (
								<>
									<DropdownMenuItem>
										<Button asChild variant="link">
											<Link href="/profile">Profile</Link>
										</Button>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<form
											action="/api/auth/signout"
											method="POST"
										>
											<Button
												type="submit"
												variant="link"
											>
												Log Out
											</Button>
										</form>
									</DropdownMenuItem>
								</>
							) : (
								<Button
									variant="link"
									className="w-full"
									onClick={() => {
										supabase.auth.signInWithOAuth({
											provider: 'google',
											options: {
												redirectTo: '/profile'
											}
										})
									}}
								>
									Sign in
								</Button>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}
