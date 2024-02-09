'use client'

import { signInWithCredentials } from '@/lib/actions/auth'
import { buttonVariants } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { FormButton } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { link } from '@/ui/link'
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
          Sign-in with Google, Email, or Email and Password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-between py-4">
          <Link
            href="/auth/signin/google"
            className={buttonVariants({ variant: 'outline' })}
          >
            Sign In With Google
          </Link>
          <Link
            href="/auth/signin/email"
            className={buttonVariants({ variant: 'outline' })}
          >
            Sign In With Email
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
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
