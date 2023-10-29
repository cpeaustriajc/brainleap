import { clsx, ClassArray } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassArray) {
	return twMerge(clsx(inputs))
}

export function getRandomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}
