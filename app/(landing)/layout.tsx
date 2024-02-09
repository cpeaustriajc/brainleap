import '@/styles/styles.css'
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
    <html lang="en" dir="ltr">
      <body className="dark:bg-stone-800 bg-white">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
