'use client'

import { cva } from '@/lib/cva.config'
import * as ReactAria from 'react-aria-components'

export const labelVariants = cva({
	base: [
		'text-sm font-medium leading-none rac-peer-disabled:cursor-not-allowed rac-peer-disabled:opacity-70 rac-disabled:cursor-not-allowed rac-disabled:opacity-70',
	],
})

const Label = ({ className, ...props }: ReactAria.LabelProps) => (
	<ReactAria.Label className={labelVariants({ className })} {...props} />
)

export { Label }
