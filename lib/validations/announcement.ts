import { z } from "zod";


export const announcementSchema = z.object({
	title: z.string(),
	description: z.string(),
	attachment: z.instanceof(File),
})
