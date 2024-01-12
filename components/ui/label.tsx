'use client'

import { cx } from '@/lib/cva.config'
import ReactAria from 'react-aria-components'

const Label = ({ className, ...props }: ReactAria.LabelProps) => (
	<ReactAria.Label
		className={cx(
			'mb-2 mr-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
			className,
		)}
		{...props}
	/>
)

export { Label }
