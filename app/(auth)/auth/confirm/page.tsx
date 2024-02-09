import { CheckCircleIcon, CheckIcon } from 'lucide-react'
import React from 'react'

export default function Page() {
  return (
    <article className="rounded-md border border-stone-200 dark:border-stone-800 aspect-square gap-y-12 grid content-center p-4">
      <header className="grid grid-flow-col place-items-center justify-center gap-x-2">
        <h1 className="text-4xl font-bold text-green-600">Magic Link Sent</h1>
        <CheckCircleIcon className="text-green-600 size-8" />
      </header>
      <footer>
        <p className="max-w-sm text-center">
          We have sent a magic link to your email address. Please check your
          inbox and click on the link to proceed.
        </p>
      </footer>
    </article>
  )
}
