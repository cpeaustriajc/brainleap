'use server'
import { profileSchema } from '@/components/setup-profile-form'
import { z } from 'zod'
import { sql } from '@vercel/postgres'

export async function mutateProfile(data: z.infer<typeof profileSchema>) {
	await sql<
		z.infer<typeof profileSchema>
	>`INSERT INTO users (name, email, biography, university, program, username) VALUES (${data.displayName}, ${data.email}, ${data.biography}, ${data.university}, ${data.program}, ${data.username})`
}
