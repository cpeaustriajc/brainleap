'use client'

import { signInWithCredentials } from '@/lib/actions/auth'
import { Button, buttonVariants } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { link } from '@/ui/link'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { startTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    progressive: true,
  })

  function onSubmit(e: z.infer<typeof formSchema>) {
    // Temporary solution until https://github.com/react-hook-form/react-hook-form/pull/11061 gets merged.
    const formData = new FormData()
    formData.append('email', e.email)
    formData.append('password', e.password)

    startTransition(() => {
      signInWithCredentials(formData)
    })
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              formAction={signInWithCredentials}
              className="w-full cursor-default"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p>
          Don&apos;t have an account?{' '}
          <Link className={link} href="/auth/signup">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
