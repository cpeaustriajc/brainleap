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
    })
    .merge(baseProfileSchema),
  z
    .object({
      role: z.literal('instructor'),
    })
    .merge(baseProfileSchema),
])

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
})

export const fullNameSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9_]+$/),
})
