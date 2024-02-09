import '@/styles/styles.css'
import React from 'react'

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
