import { getUser } from '@/lib/queries/user'
import { createClient } from '@/lib/supabase/server'
import { unstable_noStore } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { Course } from './components/course'

export default async function Page() {
  unstable_noStore()

  const supabase = createClient()

  const user = await getUser()

  const enrollments = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', user.id)

  if (!enrollments.data) {
    notFound()
  }

  const course_id = enrollments.data.map(enrollment => enrollment.course_id)

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .in('course_id', course_id)

  if (!courses) {
    return notFound()
  }

  return (
    <section className="col-start-1 row-start-2">
      <ul className="p-4">
        {courses.map(course => (
          <Course key={course.course_id} course={course} />
        ))}
      </ul>
    </section>
  )
}
