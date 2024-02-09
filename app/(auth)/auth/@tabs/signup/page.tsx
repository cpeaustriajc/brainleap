'use client'

import { signUp } from '@/lib/actions/auth'
import { button } from '@/ui/button'
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
import { useFormState } from 'react-dom'

export default function SignUpPage() {
  const [formState, action] = useFormState(signUp, undefined)
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Welcome to Brainleap! 🧠</CardTitle>
        <CardDescription>
          We&apos;re glad that you&apos;re getting onboard, get started by
          filling out these fields
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-between py-4">
          <Link
            href="/auth/signin/google"
            className={button({ variant: 'outline' })}
          >
            Sign In With Google
          </Link>
          <Link
            href="/auth/signin/email"
            className={button({ variant: 'outline' })}
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
        <form className="flex flex-col gap-2" action={action}>
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" required />
          <Label htmlFor="username">Username</Label>
          <Input type="text" name="username" id="username" required />
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" required />
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" required />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input type="password" name="confirmPassword" id="confirmPassword" />
          <FormButton type="submit">Sign Up</FormButton>
        </form>
      </CardContent>
    </Card>
  )
}
