'use client'

import { cx } from '@/lib/cva.config'
import { CheckIcon, CircleIcon } from 'lucide-react'

export const MenuTrigger = ReactAria.MenuTrigger

export interface MenuContentProps<T>
	extends Omit<ReactAria.PopoverProps, 'children' | 'style'>,
		ReactAria.MenuProps<T> {
	className?: string
	popoverClassName?: string
}

export const MenuPopover = ({
	className,
	offset = 4,
	...props
}: ReactAria.PopoverProps) => (
	<ReactAria.Popover
		offset={offset}
		className={cx(
			// Base
			'z-50 min-w-[8rem] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
			// Entering
			'data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95',
			// Exiting
			'data-[exiting]:animate-out data-[exiting]:zoom-out-95 data-[exiting]:fade-out-0',
			// Top
			'data-[placement=top]:slide-in-from-bottom-2',
			// Right
			'data-[placement=right]:slide-in-from-left-2',
			// Bottom
			'data-[placement=bottom]:slide-in-from-top-2',
			// Left
			'data-[placement=left]:slide-in-from-right-2',
			className,
		)}
		{...props}
	/>
)

export const Menu = <T extends object>({
	className,
	popoverClassName,
	...props
}: MenuContentProps<T>) => {
	return (
		<ReactAria.Menu className={cx('outline-none', className)} {...props} />
	)
}

export const MenuItem = ({
	className,
	children,
	...props
}: ReactAria.MenuItemProps) => {
	return (
		<ReactAria.MenuItem
			className={cx(
				// Base
				'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
				// Focus
				'focus:bg-accent focus:text-accent-foreground ',
				// Disabled
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className,
			)}
			{...props}
		>
			{({ selectionMode }) => (
				<>
					{selectionMode === 'single' ? (
						<CircleIcon
							aria-hidden="true"
							strokeWidth="3"

						/>
					) : selectionMode === 'multiple' ? (
						<CheckIcon
							aria-hidden="true"
							strokeWidth="3"

						/>
					) : null}
					{children}
				</>
			)}
		</ReactAria.MenuItem>
	)
}
