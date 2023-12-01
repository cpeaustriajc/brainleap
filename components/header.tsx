'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import {
	HamburgerMenuIcon,
	PersonIcon,
	PlusCircledIcon,
} from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import { Search } from './search'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { AddClassButton } from './add-class'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tables } from '@/lib/definitions'
import { Dialog, DialogTrigger } from './ui/dialog'
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

export function Header({
	session,
	profile,
}: {
	session: Session | null
	profile: Tables<'profiles'> | null | undefined
}) {
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
						<SheetContent side="left">
							<div className="flex flex-col justify-center items-center h-full">
								You are currently not enrolled in any classes.
							</div>
						</SheetContent>
					</Sheet>
					<div className="px-2 inline-flex items-center">
						<Button asChild variant="link" className="px-0">
							<Link href="/">Doctrina </Link>
						</Button>
					</div>
				</div>
				<Search />
				<div className="flex items-center gap-2">
					<Dialog>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<PlusCircledIcon className="w-6 h-6" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DialogTrigger asChild>
									<DropdownMenuItem>
										<Button size="lg" variant="ghost">
											Add Class
										</Button>
									</DropdownMenuItem>
								</DialogTrigger>
							</DropdownMenuContent>
						</DropdownMenu>
						<AddClassButton />
					</Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<Avatar className="h-8 w-8">
									<AvatarImage
										src={profile?.avatar_url || undefined}
									/>
									<AvatarFallback>
										<PersonIcon />
									</AvatarFallback>
								</Avatar>
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
									asChild
									variant="link"
									className="w-full"
								>
									<Link href="/auth/signin">Sign in</Link>
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
