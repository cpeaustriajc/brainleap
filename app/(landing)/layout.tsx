import '@/styles/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import Link from 'next/link'
import React from 'react'
import { Header, navigation } from './components/header'

export const metadata = {
  title: 'Brainleap',
  description: 'Brainleap: An e-learning platform for the modern age.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light dark',
}

// Same as the header, but the button part is a div
export function HeaderShell() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <h1 className="text-xl">
            <Link href="/">🧠</Link>
          </h1>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="w-24 h-12 bg-gray-300 animate-pulse rounded-lg px-3 py-2.5" />
        </div>
      </nav>
    </header>
  )
}

export default function LandingPageLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={GeistSans.className}>
      <body className="bg-background">
        <React.Suspense fallback={<HeaderShell />}>
          <Header />
        </React.Suspense>
        <main>
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
