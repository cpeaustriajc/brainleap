import '@/styles/styles.css'
import { Tab, TabList, TabPanel, Tabs } from '@/ui/tabs'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Sign In to Brainleap',
  description: 'Brainleap: An e-learning platform for the modern age.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light dark',
}

export default function AuthRootLayout({
  children,
}: { children: React.ReactNode; tabs: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
