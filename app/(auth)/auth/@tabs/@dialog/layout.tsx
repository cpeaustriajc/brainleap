'use client'

import { cx } from '@/lib/cva.config'
import { form } from '@/ui/form'
import * as Ariakit from '@ariakit/react'
import { usePathname, useRouter } from 'next/navigation'

export default function SignInDialogLayout({
  children,
}: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const close = () => router.back()
  return (
    <Ariakit.Dialog
      open
      onClose={close}
      portal={false}
      backdrop={<div className="backdrop-blur h-dvh" />}
      autoFocusOnHide={element => {
        if (!element) {
          const selector = `[href="${pathname}"]`
          const finalFocus = document.querySelector<HTMLElement>(selector)
          finalFocus?.focus()
        }
        return true
      }}
      className={cx(form, 'z-10 fixed')}
    >
      {children}
    </Ariakit.Dialog>
  )
}
