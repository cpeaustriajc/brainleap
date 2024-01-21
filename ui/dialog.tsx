'use client'

import { CrossIcon } from 'lucide-react'
import { VariantProps } from 'cva'
import { cx, cva } from '@/lib/cva.config'
import * as ReactAria from 'react-aria-components'

const sheetVariants = cva({
	base: [
		'fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out',
		'data-[entering]:duration-500 data-[entering]:animate-in',
		'data-[exiting]:duration-300  data-[exiting]:animate-out',
	],
	variants: {
		side: {
			top: [
				'inset-x-0 top-0 border-b',
				'data-[entering]:slide-in-from-top',
				'data-[exiting]:slide-out-to-top',
			],
			bottom: [
				'inset-x-0 bottom-0 border-t',
				'data-[entering]:slide-in-from-bottom',
				'data-[exiting]:slide-out-to-bottom',
			],
			left: [
				'inset-y-0 left-0 h-full w-3/4 border-r',
				'data-[entering]:slide-in-from-left',
				'data-[exiting]:slide-out-to-left',
				'sm:max-w-sm',
			],
			right: [
				'inset-y-0 right-0 h-full w-3/4 border-l',
				'data-[entering]:slide-in-from-right',
				'data-[exiting]:slide-out-to-right',
				'sm:max-w-sm',
			],
		},
	},
})

export const DialogTrigger = ReactAria.DialogTrigger

export const DialogOverlay = ({
	className,
	isDismissable = true,
	...props
}: ReactAria.ModalOverlayProps) => (
	<ReactAria.ModalOverlay
		isDismissable={isDismissable}
		className={cx(
			'fixed inset-0 z-[100] bg-black/80',
			'data-[entering]:animate-in data-[entering]:fade-in-0',
			'data-[exiting]:duration-300 data-[exiting]:animate-out data-[exiting]:fade-out-0',
		)}
		{...props}
	/>
)

export interface DialogContentProps
	extends Omit<
			React.ComponentPropsWithoutRef<typeof ReactAria.Modal>,
			'children'
		>,
		VariantProps<typeof sheetVariants> {
	children?: ReactAria.DialogProps['children']
	role?: ReactAria.DialogProps['role']
	closeButton?: boolean
}

export const DialogContent = ({
	className,
	children,
	side,
	role,
	closeButton = true,
	...props
}: DialogContentProps) => (
	<ReactAria.Modal
		className={cx(
			!side &&
				'fixed left-[50%] top-[50%] z-[110] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg duration-200 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[entering]:slide-in-from-left-1/2 data-[entering]:slide-in-from-top-[48%] data-[exiting]:slide-out-to-left-1/2 data-[exiting]:slide-out-to-top-[48%] sm:rounded-lg md:w-full',
			side && sheetVariants({ side }),
			side && 'h-full p-6',
			className,
		)}
		{...props}
	>
		<ReactAria.Dialog
			role={role}
			className={cx(!side && 'grid h-full gap-4', 'h-full outline-none')}
		>
			{(values) => (
				<>
					{typeof children === 'function'
						? children(values)
						: children}
					{closeButton && (
						<ReactAria.Button
							onPress={values.close}
							className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[entering]:bg-accent data-[entering]:text-muted-foreground"
						>
							<CrossIcon className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</ReactAria.Button>
					)}
				</>
			)}
		</ReactAria.Dialog>
	</ReactAria.Modal>
)

export const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cx(
			'flex flex-col space-y-1.5 text-center sm:text-left',
			className,
		)}
		{...props}
	/>
)

export const DialogTitle = ({
	className,
	...props
}: ReactAria.HeadingProps) => (
	<ReactAria.Heading
		slot="title"
		className={cx(
			'text-lg font-semibold leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
)