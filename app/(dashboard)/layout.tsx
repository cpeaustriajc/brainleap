import { getUser } from '@/lib/queries/user'
import { createClient } from '@/lib/supabase/server'
import '@/styles/styles.css'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/ui/navigation-menu'
import * as Ariakit from '@ariakit/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { DashboardNavigationMenu } from './components/navigation-menu'

export const metadata = {
  title: 'Brainleap - Dashboard',
  description: 'Brainleap: An e-learning platform for the modern age.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light dark',
}

export default async function DashboardRootLayout({
  children,
}: { children: React.ReactNode }) {
  const supabase = createClient()

  const user = await getUser()

  const enrollee = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', user.id)

  if (enrollee.error) {
    throw enrollee.error
  }

  const courses = await supabase
    .from('courses')
    .select('course_id, course_name')
    .in(
      'course_id',
      enrollee.data.map(course_id => course_id.course_id),
    )

  if (courses.error) {
    throw courses.error
  }
  return (
    <html dir="ltr" lang="en">
      <body className="grid grid-cols-[minmax(auto,240px),1fr] grid-rows-[auto,auto,1fr] bg-background h-dvh">
        <header className="flex items-center px-4 py-2 col-span-2 gap-2">
          <h1 className="pl-2 text-xl">
            <Link href="/">Brainleap 🧠</Link>
          </h1>
          <DashboardNavigationMenu />
        </header>
        <div className="mx-4 px-4 pt-2 rounded-lg col-span-full row-span-2 border bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  )
}
