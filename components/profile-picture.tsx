'use client'

import { useTransition } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Tables } from '@/lib/database.types'
import { UserRoundIcon } from 'lucide-react'
import { uploadAvatar } from '@/lib/actions/profile'

type Props = {
	url: Tables<'profiles'>['avatar_url'] | null
	size: number
}

export function ProfilePicture({ url, size }: Props) {
	const [isPending, startTransition] = useTransition()

	return (
		<div  >
			<div  >
				<div>
					<strong>Profile Picture</strong>
					<p>This is your profile picture</p>
				</div>
				<ReactAria.FileTrigger
					onSelect={(e) => {
						if (e) {
							const formData = new FormData()
							formData.set('avatar', e[0])
							startTransition(() => {
								uploadAvatar(formData)
							})
						}
					}}
					acceptedFileTypes={['image/*']}
				>
					<button disabled={isPending}>
						{isPending ? 'Uploading...' : 'Change Profile Picture'}
					</button>
				</ReactAria.FileTrigger>
			</div>
			<Avatar style={{ width: size, height: size }}>
				<AvatarImage
					src={url!}
					width={size}
					height={size}
					style={{ width: size, height: size }}
				/>
				<AvatarFallback style={{ width: size, height: size }}>
					<UserRoundIcon
						style={{ width: size / 2, height: size / 2 }}
					/>
				</AvatarFallback>
			</Avatar>
		</div>
	)
}
