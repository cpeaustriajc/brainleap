'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import {
	HamburgerMenuIcon,
	PersonIcon,
	PlusCircledIcon,
} from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { AddClassDialog } from './add-class'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tables } from '@/lib/definitions'
import { Dialog } from './ui/dialog'
import { useState } from 'react'
import { JoinClassDialog } from './join-class'
const DropdownMenu = dynamic(
	() => import('./ui/dropdown-menu').then((mod) => mod.DropdownMenu),
	{
		ssr: false,
		loading: () => (
			<Button
				size="icon"
				variant="secondary"
				className="animate-pulse"
			></Button>
		),
	},
)
const ThemeToggle = dynamic(
	() => import('./theme-toggle').then((mod) => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => (
			<Button
				size="icon"
				className="animate-pulse"
				variant="secondary"
			></Button>
		),
	},
)
const DropdownMenuContent = dynamic(
	() => import('./ui/dropdown-menu').then((mod) => mod.DropdownMenuContent),
	{ ssr: false },
)
const DropdownMenuTrigger = dynamic(
	() => import('./ui/dropdown-menu').then((mod) => mod.DropdownMenuTrigger),
	{
		ssr: false,
		loading: () => (
			<Button
				size="icon"
				variant="secondary"
				className="animate-pulse"
			></Button>
		),
	},
)

export function Header({
	session,
	profile,
}: {
	session: Session | null
	profile: Tables<'profiles'> | null | undefined
}) {
	const [isJoinClassDialogOpen, setIsJoinClassDialogOpen] = useState(false)
	const [isCreateClassDialogOpen, setIsCreateClassDialogOpen] =
		useState(false)
	return (
		<header className="px-4 py-2">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center">
					<div className="px-2 inline-flex items-center">
						<Button asChild variant="link" className="px-0">
							<Link href="/">Doctrina</Link>
						</Button>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<span className="sr-only">Open Class Menu</span>
								<PlusCircledIcon className="w-6 h-6" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{profile?.role === 'instructor' && (
								<Dialog
									open={isCreateClassDialogOpen}
									onOpenChange={setIsCreateClassDialogOpen}
								>
									<DropdownMenuItem
										onClick={(e) => {
											e.preventDefault()
											setIsCreateClassDialogOpen(true)
										}}
									>
										<Button size="lg" variant="ghost">
											Add Class
										</Button>
									</DropdownMenuItem>
									<AddClassDialog />
								</Dialog>
							)}
							<Dialog
								open={isJoinClassDialogOpen}
								onOpenChange={setIsJoinClassDialogOpen}
							>
								<DropdownMenuItem
									onClick={(e) => {
										e.preventDefault()
										setIsJoinClassDialogOpen(true)
									}}
								>
									<Button size="lg" variant="ghost">
										Join Class
									</Button>
								</DropdownMenuItem>
								<JoinClassDialog />
							</Dialog>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<span className="sr-only">Open User Menu</span>
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
