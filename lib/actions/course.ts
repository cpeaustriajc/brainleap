'use server'

import { getUser } from '@/lib/queries/user'
import { createClient } from '@/lib/supabase/action'
import { User } from '@supabase/supabase-js'
import humanId from 'human-id'
import { revalidatePath } from 'next/cache'
import { Tables } from '../database.types'

async function createEnrollment(
  user: User,
  course: Pick<Tables<'courses'>, 'id'>,
) {
  const supabase = createClient()
  const { error } = await supabase.from('enrollments').insert({
    user_id: user.id,
    course_id: course.id,
  })
  if (error) throw error
}

export async function createCourse(formData: FormData) {
  const supabase = createClient()

  const user = await getUser()

  const { data: course, error } = await supabase
    .from('courses')
    .insert({
      id: humanId({ separator: '-', capitalize: false }),
      instructor: user.id,
      name: formData.get('name'),
      description: formData.get('description'),
      category: formData.get('category'),
    })
    .select()
    .single()

  if (error) throw error

  createEnrollment(user, course)

  revalidatePath('/(dashboard)/dashboard', 'layout')
}
