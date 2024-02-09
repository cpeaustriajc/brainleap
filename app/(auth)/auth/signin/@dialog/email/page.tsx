'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import { cx } from '@/lib/cva.config'
import { Button } from '@/ui/button'
import { form } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import * as Ariakit from '@ariakit/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  children: React.ReactNode
}

function Submit({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  )
}

export default function SignInWithEmail() {
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
      <form className="flex flex-col gap-2" action={signInWithEmail}>
        <h2>Continue Signing In to Email</h2>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="johndoe@email.com"
          required
        />
        <Submit>Submit</Submit>
      </form>
    </Ariakit.Dialog>
  )
}
