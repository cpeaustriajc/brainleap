'use client'

import { updateName } from '@/lib/actions/profile'
import { Tables } from '@/lib/database.types'
import {
  Form,
  FormButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { useForm } from 'react-hook-form'

export function ProfileForm({
  profile,
}: {
  profile: Pick<
    Tables<'profiles'>,
    | 'avatar_url'
    | 'full_name'
    | 'biography'
    | 'university'
    | 'section'
    | 'program'
    | 'username'
  >
}) {
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      username: profile.username,
      name: profile.full_name,
      biography: profile.biography,
    },
  })

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          name="username"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="biography"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>About You</FormLabel>
              <FormControl>
                <Textarea />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton type="submit">Update</FormButton>
      </form>
    </Form>
  )
}
