import { signInWithGoogle } from '@/lib/actions/auth'
import { Button } from '@/ui/button'
import { form } from '@/ui/form'

export default function GoogleSignIn() {
  return (
    <form className={form}>
      <h2>Continue Signing in to Google</h2>
      <Button type="submit" formAction={signInWithGoogle} >
        Sign in with Google
      </Button>
    </form>
  )
}
