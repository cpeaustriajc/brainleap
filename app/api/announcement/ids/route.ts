import {  getAnnouncementIds } from '@/lib/queries'

export async function GET() {
	const announcementIds = await getAnnouncementIds()

	return Response.json(
		announcementIds.map((announcement_id) => announcement_id),
	)
}
