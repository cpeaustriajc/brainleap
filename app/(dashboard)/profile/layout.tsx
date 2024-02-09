import { buttonVariants } from '@/ui/button'
import Link from 'next/link'
import React from 'react'

export default function ProfileLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex flex-row">{children}</div>
    </React.Fragment>
  )
}
