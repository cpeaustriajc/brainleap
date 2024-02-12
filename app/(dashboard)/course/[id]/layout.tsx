import '@vidstack/react/player/styles/base.css'
import React from 'react'

export default function CourseLayout({
  children,
}: { children: React.ReactNode; params: { id: string } }) {
  return <React.Fragment>{children}</React.Fragment>
}
