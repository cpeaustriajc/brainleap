'use client'

import { signInWithEmail } from '@/lib/actions/auth'
import { FormButton } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import React from 'react'

export default function SignInWithEmail() {
  return (
    <React.Fragment>
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
        <FormButton>Submit</FormButton>
      </form>
    </React.Fragment>
  )
}
