import { z } from 'zod'

const baseProfileSchema = z.object({
	id: z.string().uuid().optional(),
	username: z.string(),
	avatar_url: z.string().url().optional(),
	biography: z.string().optional(),
	email: z.string().email({ message: 'Invalid email address.' }),
	university: z.string().optional(),
	full_name: z.string().optional(),
})

export const profileSchema = z.discriminatedUnion('role', [
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
			position: z.string().optional(),
		})
		.merge(baseProfileSchema),
])
