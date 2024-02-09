'use client'

import { signInWithGoogle } from '@/lib/actions/auth'
import { FormButton } from '@/ui/form'
import * as Ariakit from '@ariakit/react'
import * as React from 'react'

export default function GoogleSignIn() {
  return (
    <React.Fragment>
      <Ariakit.DialogHeading>
        Continue Signing in to Google
      </Ariakit.DialogHeading>
      <form className="flex flex-col">
        <FormButton type="submit" formAction={signInWithGoogle}>
          Sign in with Google
        </FormButton>
      </form>
    </React.Fragment>
  )
}
