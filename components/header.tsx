'use client'

import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { PersonIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tables } from '@/lib/database.types'
import { useUpload } from '@/hooks/use-upload'
import humanId from 'human-id'

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
	profile,
}: {
	profile: Pick<Tables<'profiles'>, 'avatar_url' | 'username' | 'role'>
}) {
	const { fileUrl } = useUpload(
		'avatars',
		profile.avatar_url,
		profile.username || humanId(),
	)

	return (
		<header className="px-4 py-2 border-b">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center">
					<div className="px-2 inline-flex items-center">
						<Link
							href="/"
							className={buttonVariants({
								variant: 'ghost',
								size: 'icon',
								className: 'px-0',
							})}
						>
							<Image
								src="/doctrina.png"
								width={80}
								height={80}
								alt="The Logo of Doctrina"
								priority
							/>
							<span className="sr-only">Home</span>
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{profile && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<span className="sr-only">
										Open Class Menu
									</span>
									<PlusCircledIcon className="w-6 h-6" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{profile.role === 'instructor' && (
									<DropdownMenuItem>
										<Link
											href="/create/course"
											className={buttonVariants({
												size: 'lg',
												variant: 'ghost',
											})}
										>
											Create Course
										</Link>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem>
									<Link
										href="/join/course"
										className={buttonVariants({
											size: 'lg',
											variant: 'ghost',
										})}
									>
										Enroll Course
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<span className="sr-only">Open User Menu</span>
								<Avatar className="h-8 w-8">
									<AvatarImage src={fileUrl || undefined} />
									<AvatarFallback>
										<PersonIcon />
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" align="end">
							{profile ? (
								<>
									<DropdownMenuItem>
										<Link
											href="/profile"
											className={buttonVariants({
												variant: 'link',
											})}
										>
											Profile
										</Link>
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
								<Link
									href="/auth/signin"
									className={buttonVariants({
										variant: 'link',
										className: 'w-full',
									})}
								>
									Sign in
								</Link>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
