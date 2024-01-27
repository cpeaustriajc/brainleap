'use client'

import * as React from 'react'
import * as ReactAria from 'react-aria-components'

import { cx } from '@/lib/cva.config'

const Tabs = ReactAria.Tabs

const TabList = React.forwardRef<
	React.ElementRef<typeof ReactAria.TabList>,
	React.ComponentPropsWithoutRef<typeof ReactAria.TabList>
>(({ className, ...props }, ref) => (
	<ReactAria.TabList
		ref={ref}
		className={cx(
			'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
			className,
		)}
		{...props}
	/>
))
TabList.displayName = 'TabList'

const Tab = React.forwardRef<
	React.ElementRef<typeof ReactAria.Tab>,
	React.ComponentPropsWithoutRef<typeof ReactAria.Tab>
>(({ className, ...props }, ref) => (
	<ReactAria.Tab
		ref={ref}
		className={cx(
			'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			'disabled:pointer-events-none disabled:opacity-50',
			'rac-selected:bg-background rac-selected:text-foreground rac-selected:shadow',
			className,
		)}
		{...props}
	/>
))
Tab.displayName = 'Tab'

const TabPanel = React.forwardRef<
	React.ElementRef<typeof ReactAria.TabPanel>,
	React.ComponentPropsWithoutRef<typeof ReactAria.TabPanel>
>(({ className, ...props }, ref) => (
	<ReactAria.TabPanel
		ref={ref}
		className={cx(
			'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			className,
		)}
		{...props}
	/>
))
TabPanel.displayName = 'TabPanel'

export { Tabs, TabList, Tab, TabPanel }
