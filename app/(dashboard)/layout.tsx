import { createClient } from '@/lib/supabase/server'
import '@/styles/styles.css'
import { Tab, TabItem, TabList, Tabs } from '@/ui/tabs'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

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

  const res = await supabase.auth.getUser()

  if (res.error) {
    throw res.error
  }

  if (!res.data.user) {
    redirect('/auth/signin')
  }

  const enrollee = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', res.data.user.id)

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
      <body className="grid grid-cols-[minmax(auto,240px),1fr] grid-rows-[auto,auto,1fr] bg-stone-100 dark:bg-stone-800 h-dvh">
        <header className="flex justify-between items-center px-4 bg-stone-100 dark:bg-stone-800 py-2 col-span-2">
          <h1 className="pl-2 text-xl">
            <Link href="/">Brainleap 🧠</Link>
          </h1>
        </header>
        <Tabs>
          <TabList>
            <TabItem>
              <Tab href="/dashboard">Dashboard</Tab>
            </TabItem>
            <TabItem>
              <Tab href="/profile">Profile</Tab>
            </TabItem>
          </TabList>
        </Tabs>
        {children}
      </body>
    </html>
  )
}
