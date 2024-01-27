import * as React from 'react'

import { cx } from '@/lib/cva.config'
import * as ReactAria from 'react-aria-components'

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<ReactAria.TextArea
				className={cx(
					'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
					'placeholder:text-muted-foreground',
					'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
					'disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Textarea.displayName = 'Textarea'

export { Textarea }
