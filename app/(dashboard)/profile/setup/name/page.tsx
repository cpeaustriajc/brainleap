import { updateName } from '@/lib/actions/profile'
import { createClient } from '@/lib/supabase/server'
import { Button, button } from '@/ui/button'
import { form } from '@/ui/form'
import { Input, input } from '@/ui/input'
import { Label, label } from '@/ui/label'
import { Session } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const getName = async (session: Session) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('profile_id', session.user.id)
    .limit(1)
    .single()

  if (error) {
    throw error
  }

  // Return empty string if no username is found
  if (!data || !data.full_name) {
    return ''
  }

  return data.full_name
}

export default async function Page() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/signin')
  }

  const fullName = await getName(session)

  return (
    <div>
      <form className={form} action={updateName}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          defaultValue={fullName}
        />
        <Button type="submit">
          Submit Name
        </Button>
      </form>
    </div>
  )
}
