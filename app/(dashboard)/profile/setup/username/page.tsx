import { updateUsername } from '@/lib/actions/profile'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Session } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const getUsername = async (session: Session) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('profile_id', session.user.id)
    .limit(1)
    .single()

  if (error) {
    throw error
  }

  // Return empty string if no username is found
  if (!data || !data.username) {
    return ''
  }

  return data.username
}

export default async function SetupUsernamePage() {
  const supabase = createClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const username = await getUsername(session)

  return (
    <>
      <p>Let&apos;s start with you username</p>

      <form action={updateUsername}>
        <Input
          type="text"
          name="username"
          id="username"
          required
          placeholder="coolusername"
          defaultValue={username}
          minLength={6}
          maxLength={20}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}
