'use client'

import * as React from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import * as ReactAria from 'react-aria-components'
import { labelVariants } from '@/components/ui/label'

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
					<span className="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-background group-data-rac-disabled:opacity-50 group-data-rac-focus-visible:ring-2 group-data-rac-focus-visible:ring-ring group-data-rac-focus-visible:ring-offset-2">
						{values.isSelected && (
							<CheckIcon className="h-2.5 w-2.5 fill-current text-current" />
						)}
					</span>
					{typeof children === 'function'
						? children(values)
						: children}
				</>
			)}
		</ReactAria.Radio>
	)
})
Radio.displayName = "Radio"

export { RadioGroup, Radio }
