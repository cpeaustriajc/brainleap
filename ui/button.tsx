import { cx } from '@/lib/cva.config'

export const button = cx(
	// Base
	'inline-flex cursor-default items-center justify-center border rounded-md text-sm font-medium gap-x-1 w-full ring-offset-background transition-colors',
	' text-emerald-50 bg-emerald-500 hover:bg-emerald-500/90 border-emerald-400',
	'dark:bg-emerald-700 dark:hover:bg-emerald-700/90 dark:border-emerald-600',
	// Disabled
	'disabled:pointer-events-none disabled:opacity-50',
	// Focus
	'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700  focus-visible:outline-offset-2 ',
	'h-9 rounded-md px-3',
)
