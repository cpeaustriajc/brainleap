import { createClient } from '@/lib/supabase/server'
import { FormButton } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Textarea, textarea } from '@/ui/textarea'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { cache } from 'react'

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
    <React.Fragment>
      <section>
        <h2 className="col-span-full text-xl font-bold">Profile Picture</h2>
        <Image
          src={profile.avatar_url}
          alt={profile.full_name}
          width={128}
          height={128}
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(74 222 128)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 20a6 6 0 0 0-12 0'/%3E%3Ccircle cx='12' cy='10' r='4'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E"
        />
        <Label htmlFor="avatar">Update Profile Picture</Label>
        <Input accept="image/*" type="file" name="avatar" id="avatar" />
      </section>
      <section>
        <h2 className="col-span-full text-xl font-bold">Name</h2>
        <p>{profile.full_name}</p>
        <Label htmlFor="full_name">Update name</Label>
        <Input type="text" name="full_name" id="full_name" />
      </section>
      <section>
        <h2 className="col-span-full text-xl font-bold">Username</h2>
        <p>{profile.username}</p>
        <Label htmlFor="username">Update Username</Label>
        <Input id="username" name="username" />
      </section>
      <section>
        <h2 className="col-span-full text-xl font-bold">About</h2>
        <p>
          {!profile.biography ? (
            <span className="text-stone-400">A short sentence about you</span>
          ) : (
            profile.biography
          )}{' '}
        </p>
        <Label htmlFor="biography">Update About You</Label>
        <Textarea name="biography" id="biography" />
      </section>
      <section>
        <h2 className="col-span-full text-xl font-bold">University</h2>
        <p>
          {!profile.university ? (
            <span className="text-stone-400">
              What is the name of your university?
            </span>
          ) : (
            profile.university
          )}
        </p>
        <Label htmlFor="university">Update Univesity</Label>
        <Input type="text" name="university" id="university" />
      </section>
      <section>
        <h2 className="col-span-full text-xl font-bold">Section</h2>
        <p>
          {!profile.section ? (
            <span className="text-stone-400">What is your section?</span>
          ) : (
            profile.section
          )}
        </p>
        <Label htmlFor="section">Update Section</Label>
        <Input type="text" name="section" id="section" />
      </section>
      <FormButton type="submit">Update</FormButton>
    </React.Fragment>
  )
}
