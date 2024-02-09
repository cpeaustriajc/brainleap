'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import { Button } from '@/ui/button'
import { form } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
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
  return (
    <form className={form} action={signInWithEmail}>
      <h2>Continue Signing In to Email</h2>
      <Label>Email</Label>
      <Input
        type="email"
        name="email"
        placeholder="johndoe@email.com"
        required
      />
      <Submit>Submit</Submit>
    </form>
  )
}
