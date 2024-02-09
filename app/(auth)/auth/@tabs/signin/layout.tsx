import * as React from 'react'

export default function Layout({
  children,
  dialog,
}: { children: React.ReactNode; dialog: React.ReactNode }) {
  return (
    <React.Fragment>
      {children}
      {dialog}
    </React.Fragment>
  )
}
