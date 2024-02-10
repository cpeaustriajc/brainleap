import { getUser } from '@/lib/queries/user'
import { createClient } from '@/lib/supabase/server'
import { Separator } from '@/ui/separator'
import React from 'react'
import { ProfileForm } from './components/profile-form'

export default async function ProfilePage() {
  const supabase = createClient()

  const user = await getUser()

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(
      'avatar_url, full_name, username, biography, university, section, program',
    )
    .eq('id', user.id)
    .single()

  if (profileError) {
    throw profileError
  }

  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}
