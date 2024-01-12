'use client'

import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { PersonIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tables } from '@/lib/database.types'
import { useUpload } from '@/hooks/use-upload'
import humanId from 'human-id'
import * as ReactAria from 'react-aria-components'

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
						<ReactAria.MenuTrigger>
							<Button
								aria-label="Class Menu"
								variant="ghost"
								size="icon"
							>
								<span className="sr-only">Open Class Menu</span>
								<PlusCircledIcon className="w-6 h-6" />
							</Button>
							<ReactAria.Popover placement="bottom right">
								<ReactAria.Menu>
									{profile.role === 'instructor' && (
										<ReactAria.MenuItem id="create-course">
											<Link
												href="/create/course"
												className={buttonVariants({
													size: 'lg',
													variant: 'ghost',
												})}
											>
												Create Course
											</Link>
										</ReactAria.MenuItem>
									)}
									<ReactAria.MenuItem id="join-course">
										<Link
											href="/join/course"
											className={buttonVariants({
												size: 'lg',
												variant: 'ghost',
											})}
										>
											Enroll Course
										</Link>
									</ReactAria.MenuItem>
								</ReactAria.Menu>
							</ReactAria.Popover>
						</ReactAria.MenuTrigger>
					)}
					<ReactAria.MenuTrigger>
						<Button variant="ghost" size="icon">
							<span className="sr-only">Open User Menu</span>
							<Avatar className="h-8 w-8">
								<AvatarImage src={fileUrl || undefined} />
								<AvatarFallback>
									<PersonIcon />
								</AvatarFallback>
							</Avatar>
						</Button>
						<ReactAria.Popover placement="bottom right">
							<ReactAria.Menu>
								{profile ? (
									<>
										<ReactAria.MenuItem>
											<Link
												href="/profile"
												className={buttonVariants({
													variant: 'link',
												})}
											>
												Profile
											</Link>
										</ReactAria.MenuItem>
										<ReactAria.MenuItem>
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
										</ReactAria.MenuItem>
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
							</ReactAria.Menu>
						</ReactAria.Popover>
					</ReactAria.MenuTrigger>
				</div>
			</div>
		</header>
	)
}
