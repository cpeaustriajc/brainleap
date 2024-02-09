import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card'
import { link } from '@/ui/link'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

export async function Course({ course }: { course: Tables<'courses'> }) {
  const supabase = createClient()

  const res = await supabase.auth.getSession()

  if (res.error) {
    throw res.error
  }

  if (!res.data.session) {
    redirect('/auth/signin')
  }

  const profile = await supabase
    .from('profiles')
    .select('role')
    .eq('id', res.data.session.user.id)
    .limit(1)
    .single()

  const instructor = await supabase
    .from('profiles')
    .select('avatar_url, full_name')
    .eq('id', course.instructor_id)
    .limit(1)
    .single()

  const assignments = await supabase
    .from('assignments')
    .select('*')
    .eq('course_id', course.course_id)

  if (profile.error) {
    throw profile.error
  }

  if (!profile.data) {
    redirect('/auth/signin')
  }

  if (instructor.error) {
    throw instructor.error
  }

  if (assignments.error) {
    throw assignments.error
  }

  if (!assignments.data) {
    notFound()
  }

  const hasPendingAssignments = assignments.data.length > 0

  // biome-ignore format: It is much more readable when it is in a single line
  const message = `You currently have ${hasPendingAssignments ? `pending classworks to ${profile.data.role === 'instructor' ? 'grade' : 'complete'}` : 'no pending classworks'}`;

  return (
    <Card className="grid gap-y-2 max-w-96">
      <CardHeader className="grid grid-rows-2 grid-cols-2 place-content-center">
        <strong className="col-start-1">{course.course_name}</strong>
        <p className="col-start-1 row-start-2">{course.course_description}</p>
        <figure className=" row-span-2 justify-self-end">
          <Image
            src={instructor.data.avatar_url}
            width={48}
            height={48}
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(74 222 128)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 20a6 6 0 0 0-12 0'/%3E%3Ccircle cx='12' cy='10' r='4'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E"
            alt={instructor.data.full_name}
          />
        </figure>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
      <CardFooter className="place-self-center">
        <Link className={link} href={`/course/${course.course_id}`}>
          View More
        </Link>
      </CardFooter>
    </Card>
  )
}
