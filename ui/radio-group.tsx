'use client'

import * as React from 'react'
import { CheckIcon } from 'lucide-react'
import { labelVariants } from '@/ui/label'

import { cx } from '@/lib/cva.config'

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof ReactAria.RadioGroup>,
	React.ComponentPropsWithoutRef<typeof ReactAria.RadioGroup>
>(({ className, orientation = 'vertical', ...props }, ref) => {
	return (
		<ReactAria.RadioGroup
			className={(values) =>
				cx(
					{
						'grid gap-2': orientation === 'vertical',
						'flex items-center gap-2': orientation === 'horizontal',
					},
					typeof className === 'function'
						? className(values)
						: className,
				)
			}
			{...props}
			ref={ref}
		/>
	)
})
RadioGroup.displayName = 'RadioGroup'

const Radio = React.forwardRef<
	React.ElementRef<typeof ReactAria.Radio>,
	React.ComponentPropsWithoutRef<typeof ReactAria.Radio>
>(({ className, children, ...props }, ref) => {
	return (
		<ReactAria.Radio
			ref={ref}
			className={(values) =>
				cx(
					'group flex items-center gap-x-2 data-[focused]:outline-none',
					labelVariants,
					typeof className === 'function'
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{(values) => (
				<>
					<span>{values.isSelected && <CheckIcon />}</span>
					{typeof children === 'function'
						? children(values)
						: children}
				</>
			)}
		</ReactAria.Radio>
	)
})
Radio.displayName = 'Radio'

export { RadioGroup, Radio }
