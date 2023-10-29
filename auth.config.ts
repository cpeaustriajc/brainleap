import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
	providers: [],
	pages: {
		signIn: '/auth/signin',
		newUser: '/auth/signup',
	},
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user
			const isOnProfile = nextUrl?.pathname.startsWith('/profile')

			if (isOnProfile) {
				if (isLoggedIn) return true
				return false
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/', nextUrl))
			}
			return true
		},
	},
} satisfies NextAuthConfig
