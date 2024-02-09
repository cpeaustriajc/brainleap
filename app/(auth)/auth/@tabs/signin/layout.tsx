import * as React from 'react'

export const metadata = {
  title: 'Sign In to Brainleap',
}

export default function Layout({
  children,
  dialog,
}: { children: React.ReactNode; dialog: React.ReactNode }) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}
