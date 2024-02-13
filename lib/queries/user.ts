import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { unstable_cache as cache } from 'next/cache'

export const getUser = cache(
  async () => {
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
  },
  ['user'],
  { tags: ['user'] },
)
