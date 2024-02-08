import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { getFilename } from '@/lib/utils'
import { FileIcon } from 'lucide-react'
import Link from 'next/link'

export function Attachments({
	attachment,
}: {
	attachment: Tables<'announcements'>['attachment']
}) {
	if (!attachment) return null

	const supabase = createClient()
	const { data } = supabase.storage.from('files').getPublicUrl(attachment)
	const filename = getFilename(attachment)
	return (
		<Link href={data.publicUrl} download target="_blank">
			<FileIcon />
			<span>{filename}</span>
		</Link>
	)
}
