import { cx } from '@/lib/cva.config'

export const input = cx(
	'flex h-9 w-full rounded-lg border bg-stone-800 border-stone-700 px-2 py-2 text-sm',
	'placeholder:text-stone-400 placeholder:font-medium',
	'disabled:cursor-not-allowed disabled:opacity-50',
	'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400',
)
