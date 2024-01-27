'use client'

import { cva, cx } from '@/lib/cva.config'

export const labelVariants = cva({
	base: [
		'text-sm font-medium leading-none rac-peer-disabled:cursor-not-allowed rac-peer-disabled:opacity-70 rac-disabled:cursor-not-allowed rac-disabled:opacity-70',
	],
})

const Label = ({ className, ...props }: ReactAria.LabelProps) => (
	<ReactAria.Label className={cx(labelVariants(), className)} {...props} />
)

export { Label }
