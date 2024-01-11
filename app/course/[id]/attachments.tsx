import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Tables } from '@/lib/database.types';
import { getFilename } from '@/lib/utils';
import Link from 'next/link';
import { FileIcon } from '@radix-ui/react-icons';


export function Attachments({
	attachment,
}: {
	attachment: Tables<'announcements'>['attachment'];
}) {
	if (!attachment) return null;

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data } = supabase.storage.from('files').getPublicUrl(attachment);
	const filename = getFilename(attachment);
	return (
		<Button asChild variant="outline" size="lg">
			<Link href={data.publicUrl} download target="_blank">
				<FileIcon className="size-4" />
				<span className="pl-2">{filename}</span>
			</Link>
		</Button>
	);
}
