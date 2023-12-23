import { Separator } from '@/components/ui/separator'
import { Tables } from '@/lib/database.types'
import { getAnnouncement, getRole } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { getURL } from '@/lib/utils'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

export async function generateStaticParams() {
	const url = getURL('/api/announcement/ids')
	const res = await fetch(url)
	const announcementIds: Tables<'announcements'>['announcement_id'][] =
		await res.json()

	if (!announcementIds) {
		notFound()
	}
	return announcementIds.map((announcementId) => ({
		announcement: announcementId,
	}))
}

type Props = {
	params: {
		announcement: string
	}
}

export default async function Page({ params }: Props) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const announcement = await getAnnouncement(params.announcement)

	const role = await getRole(user.id)

	if (!announcement) {
		notFound()
	}

	return (
		<main>
			<div className="max-w-2xl mx-auto">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{announcement.title}
				</h1>
				<Separator className="my-8" />
				<div>
					<p className="whitespace-pre-wrap">
						{announcement.description}
					</p>
				</div>
			</div>
		</main>
	)
}
