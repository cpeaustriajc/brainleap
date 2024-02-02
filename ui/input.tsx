import { cx } from '@/lib/cva.config'

export const input = cx(
	'flex h-9 w-full rounded-lg border bg-stone-800 border-stone-700 text-sm px-4 py-2',
	'placeholder:text-stone-400 placeholder:font-medium',
	'disabled:cursor-not-allowed disabled:opacity-50',
	'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400',
	'file:bg-stone-800 file:px-2 file:h-full file:rounded file:border file:border-solid hover:file:bg-stone-700 file:transition-colors duration-500 file:border-stone-600',
)
