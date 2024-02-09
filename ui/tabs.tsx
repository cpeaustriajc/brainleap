'use client'

import { cx } from '@/lib/cva.config'
import * as AriaKit from '@ariakit/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {}
export function Tabs(props: AriaKit.TabProviderProps) {
  const router = useRouter()
  const selectedId = usePathname()
  return (
    <AriaKit.TabProvider
      selectedId={selectedId}
      setSelectedId={id => router.push(id || selectedId)}
      {...props}
    />
  )
}

export const TabList = React.forwardRef<HTMLDivElement, AriaKit.TabListProps>(
  ({className, ...props}, ref) => (
    <AriaKit.TabList
      ref={ref}
      className={cx(
        'inline-flex h-10 justify-center items-center p-1 bg-muted rounded-sm w-full',
        className
      )}
      {...props} />
  ),
)
TabList.displayName = 'TabList'

interface TabItemProps {
  className?: string
  children: React.ReactNode
}
export const TabItem = React.forwardRef<HTMLLIElement, TabItemProps>(
  (props, ref) => {
    return (
      <li ref={ref} role="presentation">
        {props.children}
      </li>
    )
  },
)

export const Tab = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>((props, ref) => {
  const id = props.href.toString()
  return (
    <AriaKit.Tab
      id={id}
      className={cx(
        'rounded-sm inline-flex text-sm justify-center items-center whitespace-nowrap px-3 py-1.5 font-medium ring-offset-background outline-none',
        'focus-visible:ring focus-visible:ring-primary',
        'aria-selected:text-foreground aria-selected:bg-background aria-selected:shadow',
        'text-muted-foreground transition-all',
        props.className,
      )}
      render={<Link ref={ref} {...props} />}
    />
  )
})
Tab.displayName = 'Tab'

export const TabPanel = React.forwardRef<HTMLDivElement, AriaKit.TabPanelProps>(
  (props, ref) => {
    const tab = AriaKit.useTabContext()
    if (!tab) throw new Error('TabPanel must be wrapped in a Tabs component')

    const tabId = tab.useState('selectedId')

    return <AriaKit.TabPanel ref={ref} tabId={tabId} {...props} />
  },
)
