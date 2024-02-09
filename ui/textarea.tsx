import { cx } from '@/lib/cva.config'

export const textarea = cx(
  'inline-flex bg-stone-200 border border-stone-400 px-2 py-2 rounded-lg resize-none',
  'placeholder:text-stone-400 placeholder:font-medium',
  'dark:bg-stone-800 dark:border-stone-700',
  'focus-visible:outline focus-visible:outline-2 dark:focus-visible:outline-green-700 focus-visible:outline-green-400',
)
