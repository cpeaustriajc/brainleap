import { getUser } from '@/lib/queries/user'
import { createClient } from '@/lib/supabase/server'
import '@vidstack/react/player/styles/base.css'

import { Player } from '@/ui/player'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import {
  DefaultAudioLayout,
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'
import { notFound, redirect } from 'next/navigation'

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

  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('course_id', course.id)

  if (!announcements) {
    notFound()
  }

  return (
    <section className="col-start-2 pt-2">
      {profile.role === 'instructor' && (
        <div>
          <div>
            <p>Get started by sharing the class code: </p>
            <div>{course.id}</div>
          </div>
          <div>
            <p>Category: {course.category}</p>
          </div>
        </div>
      )}

      <div>
        <Player />
      </div>
      <div>
        <div>
          {announcements.length > 0 ? (
            announcements.map(announcement => (
              <div key={announcement.announcement_id}>
                <div>
                  <strong>{announcement.title}</strong>
                </div>
                <div>
                  <p>{announcement.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>This is the start of your classroom.</p>
          )}
        </div>
      </div>
    </section>
  )
}
