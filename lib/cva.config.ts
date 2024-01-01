import { defineConfig } from 'cva'
import { twMerge } from 'tailwind-merge'

export const { cva, compose, cx } = defineConfig({
	hooks: {
		onComplete: (className) => twMerge(className),
	},
})
