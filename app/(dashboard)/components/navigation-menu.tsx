'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DashboardNavigationMenu() {
  const pathname = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/dashboard" className={navigationMenuTriggerStyle({className: pathname !== "/dashboard" && "text-muted-foreground" })}>
            Dashboard
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/profile" className={navigationMenuTriggerStyle({className: pathname !== "/profile" && "text-muted-foreground" })}>
            Profile
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
