import { buttonVariants } from '@/ui/button'
import Link from 'next/link'
import React from 'react'

export function OAuth() {
  return (
    <React.Fragment>
      <div className="flex gap-2 justify-between py-4">
        <Link
          href="/auth/~/google"
          className={buttonVariants({ variant: 'outline' })}
        >
          Sign In With Google
        </Link>
        <Link
          href="/auth/~/email"
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
    </React.Fragment>
  )
}
