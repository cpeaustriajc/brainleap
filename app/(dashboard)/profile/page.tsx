import { createClient } from '@/lib/supabase/server'
import { Form, FormButton, FormField, FormItem } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import { Textarea, textarea } from '@/ui/textarea'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { cache } from 'react'
import { ProfileForm } from './components/profile-form'

const getUser = cache(async () => {
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  if (!user) {
    redirect('/auth/signin')
  }

  return user
})

export default async function ProfilePage() {
  const supabase = createClient()

  const user = await getUser()

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(
      'avatar_url, full_name, username, biography, university, section, program',
    )
    .eq('profile_id', user.id)
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
