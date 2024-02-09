'use client'

import { signInWithCredentials } from '@/lib/actions/auth'
import { buttonVariants } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { FormButton } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import Link from 'next/link'
import React from 'react'
import { useId } from 'react'
import { useFormState } from 'react-dom'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function Page() {
  const [formState, action] = useFormState(signInWithCredentials, {
    values: {},
  })
  const emailId = useId()
  const passwordId = useId()

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Sign-in to Brainleap 🧠</CardTitle>
        <CardDescription>
          We&apos;re glad that you&apos;re getting onboard, get started by
          filling out these fields. Sign-in with Google, Email, or Email and
          Password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-8">
          <Label htmlFor={emailId}>Email</Label>
          <Input type="email" name="email" id={emailId} />
          <Label htmlFor={passwordId}>Password</Label>
          <Input type="password" name="password" id={passwordId} />
          <FormButton className="w-full cursor-default" type="submit">
            Sign In
          </FormButton>
        </form>
      </CardContent>
    </Card>
  )
}
