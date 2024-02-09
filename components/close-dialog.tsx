'use client'

import { CrossIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CloseDialog() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      <span>Close</span>
      <CrossIcon />
    </button>
  )
}
