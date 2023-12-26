import { z } from "zod";
import { baseProfileSchema } from "./profile";


export const baseProfileSchema = z.object({
	id: z.string().uuid().optional(),
	username: z.string(),
	// .min(3, { message: 'Username must contain at least 3 characters' })
	// .max(20, {
	// 	message: 'Username must not be longer than 20 characters.',
	// }),
	avatar_url: z.string().url().optional(),
	biography: z
		.string()
		// .min(10, { message: 'Bio must be at least 10 characters.' })
		// .max(160, { message: 'Bio must not be longer than 30 characters.' })
		.optional(),
	email: z.string().email({ message: 'Invalid email address.' }),
	university: z.string().max(280).optional(),
	full_name: z.string().max(280).optional(),
});export const profileSchema = z.discriminatedUnion('role', [
	z.object({ role: z.literal(undefined) }).merge(baseProfileSchema),
	z
		.object({
			role: z.literal('student'),
			section: z.string().max(2).optional(),
			program: z.string().max(280).optional(),
		})
		.merge(baseProfileSchema),
	z
		.object({
			role: z.literal('instructor'),
			position: z.string().max(280).optional(),
		})
		.merge(baseProfileSchema),
])

