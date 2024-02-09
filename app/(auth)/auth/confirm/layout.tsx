import React from 'react'

export default function ConfirmPageLayout({
  children,
}: { children: React.ReactNode }) {
  return <main className="grid place-items-center h-dvh">{children}</main>
}
