'use server'

import { createClient } from '@/lib/supabase/action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { assignmentSchema } from '../validations/assignment'

const constructDueDate = (date: string, time: string) => {
  const [hours, minutes] = time.split(':')
  const [year, month, day] = date.split('-')

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
  )
}

type FieldErrors = z.inferFlattenedErrors<
  typeof assignmentSchema
>['fieldErrors']
type FormState = {
  errors: FieldErrors | undefined
  message: string | undefined
}

export async function createAssignment(
  course_id: string,
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = createClient()

  const dueDate = constructDueDate(
    formData.get('dueDate') as string,
    formData.get('dueTime') as string,
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not found')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('profile_id')
    .eq('profile_id', user.id)
    .limit(1)
    .single()

  if (profileError) {
    throw new Error(profileError.message)
  }

  const results = assignmentSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    attachment: formData.get('attachment'),
    link: formData.get('link'),
    due_date: formData.get('dueDate'),
    due_time: formData.get('dueTime'),
  })

  if (!results.success) {
    return {
      errors: results.error.flatten().fieldErrors,
      message: undefined,
    }
  }

  if (results.data.attachment.name === 'undefined' && !results.data.link) {
    const { error: assignmentError } = await supabase
      .from('assignments')
      .insert({
        title: results.data.title,
        due_date: dueDate.toLocaleDateString(),
        course_id: course_id,
        instructor_id: profile.profile_id,
      })

    if (assignmentError) {
      throw assignmentError
    }

    revalidatePath(`/courses/${course_id}`)
  }

  if (results.data.link && results.data.attachment.name === 'undefined') {
    const { error: assignmentError } = await supabase
      .from('assignments')
      .insert({
        title: results.data.title,
        due_date: dueDate.toLocaleDateString(),
        link: results.data.link,
        course_id: course_id,
        instructor_id: profile.profile_id,
      })

    if (assignmentError) {
      throw assignmentError
    }

    revalidatePath(`/courses/${course_id}`)
  }

  if (results.data.attachment && results.data.link) {
    const { data: assignmentFiles, error: assignmentFilesError } =
      await supabase.storage
        .from('files')
        .upload(
          `assignments/${results.data.attachment.name}`,
          results.data.attachment,
          {
            upsert: true,
          },
        )

    if (assignmentFilesError) {
      throw assignmentFilesError
    }

    const { error: assignmentError } = await supabase
      .from('assignments')
      .insert({
        title: results.data.title,
        due_date: dueDate.toLocaleDateString(),
        attachment: assignmentFiles.path,
        link: results.data.link,
        course_id: course_id,
        instructor_id: profile.profile_id,
      })

    if (assignmentError) {
      throw assignmentError
    }

    revalidatePath(`/courses/${course_id}`)
  }

  return {
    errors: undefined,
    message: 'Assignment created successfully',
  }
}
