import { clsx, ClassArray } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassArray) {
	return twMerge(clsx(inputs))
}

export function getRandomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}

export const extractUsername = (email: string) => {
	let username = email.split('@')[0]
	username = username.replace(/[^a-zA-Z0-9]/g, '')
	username = username.toLowerCase()
	return username
}

export const getInitials = (name?: string) => {
	const names = name?.split(' ') ?? ''
	let initials = names[0].substring(0, 1).toUpperCase()
	if (names.length > 1) {
		initials += names[names.length - 1].substring(0, 1).toUpperCase()
	}
	return initials
}
