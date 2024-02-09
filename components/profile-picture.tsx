'use client'

import { Tables } from '@/lib/database.types'
import { UserRoundIcon } from 'lucide-react'
import Image from 'next/image'
import { useTransition } from 'react'

type Props = {
  url: Tables<'profiles'>['avatar_url'] | null
  size: number
}

export function ProfilePicture({ url, size }: Props) {
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <div>
        <div>
          <strong>Profile Picture</strong>
          <p>This is your profile picture</p>
        </div>
        <input type="file" accept={'image/*'} />
        <button type="button" disabled={isPending}>
          {isPending ? 'Uploading...' : 'Change Profile Picture'}
        </button>
      </div>
      <div style={{ width: size, height: size }}>
        <Image
          src={url ?? ''}
          width={size}
          height={size}
          style={{ width: size, height: size }}
          alt="Profile"
        />
        <div style={{ width: size, height: size }}>
          <UserRoundIcon style={{ width: size / 2, height: size / 2 }} />
        </div>
      </div>
    </div>
  )
}
