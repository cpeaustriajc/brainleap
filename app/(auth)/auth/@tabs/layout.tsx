import React from 'react'

export default function AuthTabsLayout({
  dialog,
  children,
}: { dialog: React.ReactNode; children: React.ReactNode }) {
  return (
    <React.Fragment>
      {dialog}
      {children}
    </React.Fragment>
  )
}
