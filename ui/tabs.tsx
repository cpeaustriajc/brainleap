'use client'

import { cx } from '@/lib/cva.config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {}
export const Tabs = React.forwardRef<HTMLElement, TabsProps>((props, ref) => {
  return (
    <nav ref={ref} className={cx(props.className)}>
      {props.children}
    </nav>
  )
})
Tabs.displayName = 'Tabs'

export interface TabListProps {
  children: React.ReactNode
  className?: string
  orientation: 'vertical' | 'horizontal'
}
export const TabList = React.forwardRef<HTMLUListElement, TabListProps>(
  (props, ref) => {
    return (
      <ul
        className={cx(
          'flex gap-2',
          props.orientation === 'vertical' && 'flex-col',
          props.className,
        )}
        role="tablist"
        aria-orientation={props.orientation}
        ref={ref}
      >
        {props.children}
      </ul>
    )
  },
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

interface TabProps {
  href: string
  className?: string
  children: React.ReactNode
}
export const Tab = React.forwardRef<HTMLAnchorElement, TabProps>(
  (props, ref) => {
    const pathname = usePathname()
    return (
      <Link
        ref={ref}
        href={props.href}
        className={cx(
          pathname === props.href && 'dark:bg-green-600 bg-green-600',
          'rounded h-9 flex items-center px-4 py-4 shadow',
          'hover:bg-stone-300',
          'aria-selected:hover:bg-green-600/90',
          'text-xl dark:text-stone-100 text-stone-950 transition-colors',
          props.className,
        )}
        aria-selected={pathname === props.href}
        role="tab"
      >
        {props.children}
      </Link>
    )
  },
)
Tab.displayName = 'Tab'
