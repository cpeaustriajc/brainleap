'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function useUpload<T>(bucket: string, url: string | null, uid: string) {
	const [fileUrl, setFileUrl] = useState<string>('')
	const [uploading, setUploading] = useState(false)
	const supabase = createClient()

	useEffect(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage
					.from(bucket)
					.download(path)

				if (error) {
					throw error
				}

				const url = URL.createObjectURL(data)

				setFileUrl(url)
			} catch (error) {
				console.error('Error downloading image: ', error)
			}
		}

		if (url)
			url.startsWith('https://') ? setFileUrl(url) : downloadImage(url)
	}, [bucket, url, supabase])

	const uploadFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
		try {
			setUploading(true)

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select a file to upload.')
			}

			const file = event.target.files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${uid}-${Math.random()}.${fileExt}`

			const { error } = await supabase.storage
				.from(bucket)
				.upload(filePath, file)

			if (error) {
				throw error
			}
		} catch (error) {
			alert(`Error uploading to ${bucket}!`)
		} finally {
			setUploading(false)
		}
	}

	return { fileUrl, uploadFile, uploading }
}
