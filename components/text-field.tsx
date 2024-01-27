'use client'

import * as ReactAria from 'react-aria-components'

import { cx } from '@/lib/cva.config'

const TextField = ({ className, ...props }: ReactAria.TextFieldProps) => {
	return (
		<ReactAria.TextField className={cx('w-full', className)} {...props} />
	)
}

const TextFieldDescription = ({ className, ...props }: ReactAria.TextProps) => {
	return (
		<ReactAria.Text
			elementType="div"
			slot="description"
			className={cx('mt-2 text-sm text-muted-foreground', className)}
			{...props}
		/>
	)
}

const TextFieldErrorMessage = ({
	className,
	...props
}: ReactAria.TextProps) => {
	return (
		<ReactAria.Text
			elementType="div"
			slot="error-message"
			className={cx('mt-2 text-sm text-destructive', className)}
			{...props}
		/>
	)
}

export { TextField, TextFieldDescription, TextFieldErrorMessage }
