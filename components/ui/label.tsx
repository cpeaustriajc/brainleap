'use client'

import { cx } from '@/lib/cva.config'
import { LabelProps, Label } from 'react-aria-components'

const _Label = ({ className, ...props }: LabelProps) => (
	<Label
		className={cx(
			'mb-2 mr-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
			className,
		)}
		{...props}
	/>
)

export { _Label as Label }
