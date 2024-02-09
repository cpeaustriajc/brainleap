'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'
import React from 'react'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  children: React.ReactNode
}

function Submit({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button className={button} type="submit" disabled={pending}>
      {children}
    </button>
  )
}

export default function SignInWithEmail() {
  return (
    <form className={form} action={signInWithEmail}>
      <h2>Continue Signing In to Email</h2>
      <label className={label}>Email</label>
      <input
        className={input}
        type="email"
        name="email"
        placeholder="johndoe@email.com"
        required
      />
      <Submit>Submit</Submit>
    </form>
  )
}
