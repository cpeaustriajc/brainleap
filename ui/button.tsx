import { cx } from '@/lib/cva.config'

export const button = cx(
	// Base
	'inline-flex items-center justify-center rounded-md text-sm font-medium gap-x-1 w-full ring-offset-background transition-colors',
	'bg-emerald-700 text-emerald-50 hover:bg-emerald-700/90 border border-emerald-600',
	// Disabled
	'disabled:pointer-events-none disabled:opacity-50',
	// Focus
	'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700  focus-visible:outline-offset-2 ',
	'h-9 rounded-md px-3',
)
