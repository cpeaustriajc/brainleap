'use client'

import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { UserRoundIcon, PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Tables } from '@/lib/database.types'
import { MenuTrigger, Menu, MenuItem, MenuPopover } from '../ui/menu'
import {
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from '../ui/dialog'
import { useState } from 'react'
import { CreateCourseForm } from './create-course-form'
import { EnrollCourseForm } from './enroll-course-form'

export function Header({
	profile,
}: {
	profile: Pick<Tables<'profiles'>, 'avatar_url' | 'username' | 'role'>
}) {
	const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false)
	const [isCreateCourseMenuOpen, setIsCreateCourseMenuOpen] = useState(false)
	const [isEnrollCourseMenuOpen, setIsEnrollCourseMenuOpen] = useState(false)

	return (
		<header  >
			<div  >
				<div  >
					<div  >
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
							<span  >Home</span>
						</Link>
					</div>
				</div>
				<div  >
					{profile && (
						<MenuTrigger
							isOpen={isCourseMenuOpen}
							onOpenChange={setIsCourseMenuOpen}
						>
							<button aria-label="Class Menu">
								<PlusCircleIcon   />
							</button>
							<MenuPopover>
								<Menu
									placement="bottom right"
									onAction={(key) => {
										switch (key) {
											case 'createCourse':
												setIsCreateCourseMenuOpen(true)
												break
											case 'joinCourse':
												setIsEnrollCourseMenuOpen(true)
												break
										}
									}}
								>
									{profile.role === 'instructor' && (
										<MenuItem id="createCourse">
											Create Course
										</MenuItem>
									)}
									<MenuItem id="joinCourse">
										Enroll Course
									</MenuItem>
								</Menu>
							</MenuPopover>
						</MenuTrigger>
					)}
					<DialogOverlay
						isOpen={isCreateCourseMenuOpen}
						onOpenChange={setIsCreateCourseMenuOpen}
					>
						<DialogContent
							isOpen={isCreateCourseMenuOpen}
							onOpenChange={setIsCreateCourseMenuOpen}
						>
							<DialogHeader>
								<DialogTitle>Create a new course</DialogTitle>
							</DialogHeader>
							<CreateCourseForm />
						</DialogContent>
					</DialogOverlay>
					<MenuTrigger>
						<button>
							<span  >Open User Menu</span>
							<Avatar  >
								<AvatarImage src={profile.avatar_url!} />
								<AvatarFallback>
									<UserRoundIcon />
								</AvatarFallback>
							</Avatar>
						</button>
						<MenuPopover>
							<Menu placement="bottom right">
								{profile ? (
									<>
										<MenuItem href="/profile">
											Profile
										</MenuItem>
										<MenuItem href="/auth/signout">
											Sign Out
										</MenuItem>
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
							</Menu>
						</MenuPopover>
					</MenuTrigger>
					<DialogOverlay
						isOpen={isEnrollCourseMenuOpen}
						onOpenChange={setIsEnrollCourseMenuOpen}
					>
						<DialogContent
							isOpen={isEnrollCourseMenuOpen}
							onOpenChange={setIsEnrollCourseMenuOpen}
						>
							<DialogHeader>
								<DialogTitle>Enroll in a Course</DialogTitle>
							</DialogHeader>
							<EnrollCourseForm />
						</DialogContent>
					</DialogOverlay>
				</div>
			</div>
		</header>
	)
}
