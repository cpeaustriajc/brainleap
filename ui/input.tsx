import { cx } from '@/lib/cva.config'

export const input = cx(
	'flex h-9 w-full rounded-lg border text-sm px-4 py-2',
	'bg-stone-200 border-stone-400',
	'dark:bg-stone-800 dark:border-stone-700',
	'placeholder:text-stone-400 placeholder:font-medium',
	'disabled:cursor-not-allowed disabled:opacity-50',
	'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400',
	'file:bg-stone-200 file:px-2 file:h-full file:rounded file:border file:border-solid file:transition-colors file:duration-500 file:border-stone-400',
	'file:dark:bg-stone-800 file:dark:border-stone-700',
	'hover:dark:file:bg-stone-700 hover:file:bg-stone-300',
)
