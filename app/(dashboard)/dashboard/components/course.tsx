import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card'
import { QueryData } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'

export async function Course({ course }: { course: Tables<'courses'> }) {
  const supabase = createClient()

  const courseInstructorQuery = supabase
    .from('courses')
    .select(`profiles ( full_name, avatar_url )`)
    .limit(1)
    .single()
  type CourseInstructorQuery = QueryData<typeof courseInstructorQuery>
  const { data, error } = await courseInstructorQuery

  if (error) {
    throw error
  }
  const { profiles: instructor }: CourseInstructorQuery = data

  return (
    <Card className="flex flex-col justify-evenly max-w-96">
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">{course.name}</h2>
        <figure>
          <Image
            src={instructor!.avatar_url}
            className="rounded-full"
            width={48}
            height={48}
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(74 222 128)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 20a6 6 0 0 0-12 0'/%3E%3Ccircle cx='12' cy='10' r='4'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E"
            alt={instructor!.full_name}
          />
        </figure>
      </CardHeader>
      <CardContent>
        <p className="col-start-1 row-start-2 text-gray-500">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          className="underline text-center rounded-lg hover:bg-gray-100 text-gray-500  px-4 py-2 h-9 transition-colors underline-offset-2"
          href={`/course/${course.id}`}
        >
          Visit Course
        </Link>
      </CardFooter>
    </Card>
  )
}
