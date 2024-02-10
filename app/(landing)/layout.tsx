import '@/styles/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Header } from './components/header'

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

export default function LandingPageLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={GeistSans.className}>
      <body className="bg-background">
        <Header />
        <main>
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
