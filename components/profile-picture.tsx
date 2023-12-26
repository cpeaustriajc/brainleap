'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tables } from '@/lib/database.types'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { PersonIcon } from '@radix-ui/react-icons'
import { useUpload } from '@/hooks/use-upload'

type Props = {
	uid: string
	url: Tables<'profiles'>['avatar_url']
	size: number
}

export function ProfilePicture({ uid, url, size }: Props) {
	const { fileUrl, uploadFile, uploading } = useUpload('avatars', url, uid)

	return (
		<div className="space-y-4">
			<Avatar style={{ width: size, height: size }}>
				<AvatarImage
					src={fileUrl}
					width={size}
					height={size}
					style={{ width: size, height: size }}
				/>
				<AvatarFallback style={{ width: size, height: size }}>
					<PersonIcon style={{ width: size / 2, height: size / 2 }} />
				</AvatarFallback>
			</Avatar>

			<div className={cn(`w-[${size}px]`)}>
				<Button asChild style={{ width: size }}>
					<label htmlFor="single" className="cursor-pointer">
						{uploading ? 'Uploading...' : 'Upload'}
					</label>
				</Button>
				<input
					className="hidden absolute"
					type="file"
					id="single"
					accept="image/*"
					onChange={uploadFile}
					disabled={uploading}
				/>
			</div>
		</div>
	)
}
