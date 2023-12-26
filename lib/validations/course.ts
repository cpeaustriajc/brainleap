'use server';
import { z } from "zod";

export const courseSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long' })
		.max(20, { message: 'Title must not be longer than 20 characters' }),
	description: z
		.string()
		.min(10, { message: 'description must be atleast 10 characters long' })
		.max(160),
	section: z.string(),
	subject: z.string(),
	room: z.string(),
});export const joinCourseSchema = z.object({
	courseCode: z.string(),
})

