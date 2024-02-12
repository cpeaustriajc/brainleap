import { getUser } from '@/lib/queries/user'
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Form } from '@/ui/rac/form'
import { TextField } from '@/ui/rac/text-field'
import React from 'react'
import { Button } from '@/ui/rac/button'
import { DropZone } from '@/ui/rac/drop-zone'

export default async function CoursePage({
  params,
}: { params: { id: string } }) {
  const supabase = createClient()

  const user = await getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/auth/signin')
  }

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.id)
    .limit(1)
    .single()

  if (!course) {
    notFound()
  }

  const { data: modules } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', course.id)

  if (!modules) {
    notFound()
  }

  const formData = new FormData()

  return (
    <section className="col-start-2 pt-2 flex flex-row gap-x-8 h-full">
      {profile.role === 'instructor' && (
        <div className="flex flex-col basis-1/2 xl:basis-1/4">
          <div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight leading-none">
                {course.name}
              </h2>
              <p>Get started by sharing the class code: </p>
              <div>{course.id}</div>
            </div>
            <div>
              <p>Category: {course.category}</p>
            </div>
          </div>
          <div>
            <Form>
              <TextField
                type="text"
                name="title"
                label="Title"
                description="Specify the title of your module"
              />
              <TextField
                type="text"
                name="description"
                label="Description"
                description="Specify the description of your module"
              />
              <DropZone label="Drop video here" buttonText="Upload Video" />
              <DropZone
                label="Drop thumbnail here"
                buttonText="Upload Thumbnail"
              />
              <Button type="submit">Create Module</Button>
            </Form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {modules.length > 0 ? (
          modules.map(module => (
            <div
              className="flex flex-col aspect-square justify-start max-w-80 rounded-lg h-auto gap-4 border border-gray-200 shadow-xl dark:border-zinc-800 dark:shadow-blue-500/25 shadow-gray-200"
              key={module.id}
            >
              <Link
                href={`${params.id}/${module.id}`}
                className="hover:bg-gray-200 dark:hover:bg-zinc-900 transition-colors rounded-lg"
              >
                {module.video && (
                  <div className="w-fit h-auto aspect-video pb-4">
                    <img
                      className="rounded-tr-lg rounded-tl-lg w-full h-auto block"
                      alt={module.title}
                      src={module.thumbnail}
                      width={360}
                      height={240}
                    />
                  </div>
                )}
                <div className="max-w-prose px-1">
                  <strong className="text-pretty text-zinc-900 dark:text-zinc-400 my-2 text-lg font-semibold leading-none tracking-tight">
                    {module.title}
                  </strong>
                  <p className="text-balance line-clamp-2 text-zinc-500 my-4">
                    {module.description}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center flex-1 items-center">
            <p className="text-gray-400 text-2xl place-self-center text-center">
              Create a new module to get started
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
