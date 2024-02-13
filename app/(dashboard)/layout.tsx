import '@/styles/styles.css'
import '@vidstack/react/player/styles/base.css'

import Link from 'next/link'
import React from 'react'
import { DashboardNavigationMenu } from './components/navigation-menu'
import { GeistSans } from 'geist/font/sans'

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
  return (
    <html dir="ltr" lang="en" className={GeistSans.className}>
      <body className="grid grid-cols-[minmax(auto,240px),1fr] grid-rows-[auto,auto,1fr] bg-background h-dvh">
        <header className="flex items-center px-4 py-2 col-span-2 gap-2">
          <h1 className="pl-2 text-xl">
            <Link href="/">Brainleap 🧠</Link>
          </h1>
          <DashboardNavigationMenu />
        </header>
        <div className="mx-4 px-4 pt-2 rounded-lg col-span-full row-span-2 bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  )
}
