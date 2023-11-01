import NextAuth, { DefaultSession } from "next-auth"

declare module 'next-auth' {
	export interface Session {
		user: {
			role: 'student' | 'teacher' | null | undefined
		} & DefaultSession['user']
	}
}
