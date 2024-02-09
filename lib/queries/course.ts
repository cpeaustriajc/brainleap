import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export const getCourseById = async (id: string) => {
  const supabase = createClient()
  const { data: course } = await supabase
    .from('courses')
    .select()
    .eq('course_id', id)
    .single()

  return course
}
export const getCourseIds = async () => {
  const supabase = createClient()
  const { data: courses } = await supabase.from('courses').select('course_id')

  if (!courses) {
    notFound()
  }

  return courses.map(course => course.course_id)
}

export const getCourses = async () => {
  const supabase = createClient()
  const { data: courses, error } = await supabase.from('courses').select()

  if (error) {
    throw error
  }

  return courses
}
