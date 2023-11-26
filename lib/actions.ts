'use server'
import { profileSchema } from '@/components/setup-profile-form'
import { z } from 'zod'

export async function mutateProfile(data: z.infer<typeof profileSchema>) {
	await prisma?.user.upsert({
		where: {
			username: data.username,
		},
		update: {
			...data,
		},
		create: {
			...data,
		},
	})
}

export async function getUser(username: string) {
	const user = await prisma?.user.findUnique({
		where: {
			username,
		},
	})

	return user
}

export async function getUsers() {
	const users = prisma?.user.findMany()
	return users
}
