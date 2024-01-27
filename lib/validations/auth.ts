import { z } from 'zod'

export const signInWithEmailSchema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.min(1, { message: 'Email is required' })
		.max(255, { message: 'Email is too long' }),
})
