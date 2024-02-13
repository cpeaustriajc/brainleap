'use client'

import { Tables } from '@/lib/database.types'
import { FormButton } from '@/ui/form'
import { TextField } from '@/ui/rac/text-field'
import { Form } from '@/ui/rac/form'
import { updateAvatar, updateProfile } from '@/lib/actions/profile'
import { FileTrigger } from 'react-aria-components'
import { Button } from '@/ui/rac/button'
import Image from 'next/image'
import React from 'react'

export function ProfileForm({
  profile,
}: {
  profile: Pick<
    Tables<'profiles'>,
    'avatar_url' | 'full_name' | 'about' | 'username'
  >
}) {
  return (
    <React.Fragment>
      <div>
        <div className="flex items-center gap-x-4 justify-between">
          <div>
            <h3 className="text-lg font-medium">Avatar</h3>
            <p className="text-sm text-muted-foreground">Update your avatar</p>
          </div>
          <div className="flex items-center gap-x-4">
            <FileTrigger
              onSelect={e => {
                if (e) {
                  const file = Array.from(e)
                  const formData = new FormData()
                  formData.append('avatar', file[0])
                  updateAvatar(formData)
                }
              }}
            >
              <Button>Upload Avatar</Button>
            </FileTrigger>
            <Image
              src={profile.avatar_url}
              width={96}
              height={96}
              className="rounded-full"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(74 222 128)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 20a6 6 0 0 0-12 0'/%3E%3Ccircle cx='12' cy='10' r='4'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E"
              alt={profile.full_name}
            />
          </div>
        </div>
      </div>
      <Form action={updateProfile}>
        <TextField
          name="username"
          label="Username"
          type="text"
          defaultValue={profile.username}
        />
        <TextField
          name="name"
          label="Name"
          type="text"
          defaultValue={profile.full_name}
        />
        <TextField
          name="about"
          label="About You"
          type="text"
          defaultValue={profile.about ?? ''}
        />
        <FormButton type="submit">Update</FormButton>
      </Form>
    </React.Fragment>
  )
}
