'use client'

import { signInWithGoogle } from '@/lib/actions/auth'
import { cx } from '@/lib/cva.config'
import { Button } from '@/ui/button'
import { FormButton, form } from '@/ui/form'
import * as Ariakit from '@ariakit/react'
import { usePathname, useRouter } from 'next/navigation'

export default function GoogleSignIn() {
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
      <Ariakit.DialogHeading>
        Continue Signing in to Google
      </Ariakit.DialogHeading>
      <form className="flex flex-col">
        <FormButton type="submit" formAction={signInWithGoogle}>
          Sign in with Google
        </FormButton>
      </form>
    </Ariakit.Dialog>
  )
}
