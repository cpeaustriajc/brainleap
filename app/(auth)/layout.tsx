import '@/styles/styles.css'
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
}: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="dark:bg-stone-900 dark:text-white bg-white text-stone-900">
        {children}
      </body>
    </html>
  )
}
