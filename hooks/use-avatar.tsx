'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function useAvatar(
	url: string | null | undefined,
	uid: string | null | undefined,
) {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
	const [uploading, setUploading] = useState(false)
	const supabase = createClient()

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

		if (url)
			url.startsWith('https://') ? setAvatarUrl(url) : downloadImage(url)
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

			const { error } = await supabase.storage
				.from('avatars')
				.upload(filePath, file)

			if (error) {
				throw error
			}
		} catch (error) {
			alert('Error uploading avatar!')
		} finally {
			setUploading(false)
		}
	}

	return { avatarUrl, uploadAvatar, uploading }
}
