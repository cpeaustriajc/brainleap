'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tables } from '@/lib/definitions'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { PersonIcon } from '@radix-ui/react-icons'

type Props = {
	uid: string
	url: Tables<'profiles'>['avatar_url']
	size: number
}

export function ProfilePicture({ uid, url, size }: Props) {
	const supabase = createClient()
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage
					.from('avatars')
					.download(path)
				if (error) {
					throw error
				}

				const url = URL.createObjectURL(data)

				setAvatarUrl(url)
			} catch (error) {
				console.error('Error downloading image: ', error)
			}
		}

		if (url) downloadImage(url)
	}, [url, supabase])

	const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
		event,
	) => {
		try {
			setUploading(true)

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = event.target.files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${uid}-${Math.random()}.${fileExt}`

			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file)

			if (uploadError) {
				throw uploadError
			}

			// onUpload(filePath)
		} catch (error) {
			alert('Error uploading avatar!')
		} finally {
			setUploading(false)
		}
	}

	return (
		<div className="space-y-4">
			<Avatar style={{ width: size, height: size }}>
				<AvatarImage
					src={avatarUrl ?? ''}
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
					onChange={uploadAvatar}
					disabled={uploading}
				/>
			</div>
		</div>
	)
}
