import { z } from "zod";


export const assignmentSchema = z.object({
	title: z.string(),
	description: z.string(),
	attachment: z.instanceof(File),
	link: z.string(),
	due_date: z.string(),
	due_time: z.string(),
})
