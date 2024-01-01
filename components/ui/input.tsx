'use client'

import * as React from 'react'
import { Input, type InputProps } from 'react-aria-components'

import { cx } from '@/lib/cva.config'

export interface _InputProps extends Omit<InputProps, 'size'> {
	className?: string
}

const _Input = ({ className, type, ...props }: _InputProps) => {
	return (
		<Input
			type={type}
			className={cx(
				'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	)
}

export { _Input as Input }
