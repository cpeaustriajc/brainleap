import { createServerClient } from '@supabase/ssr'
import React from 'react'

export default function CourseLayout({
  children,
}: { children: React.ReactNode; params: { id: string } }) {
  return <React.Fragment>{children}</React.Fragment>
}
