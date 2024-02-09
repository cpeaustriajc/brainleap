'use client'

import { createAnnouncement } from '@/lib/actions/announcement'
import { cx } from '@/lib/cva.config'
import { Tables } from '@/lib/database.types'
import { Button, button } from '@/ui/button'
import { form } from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { textarea } from '@/ui/textarea'
import { useFormState } from 'react-dom'

export function CreateAnnouncement({ course }: { course: Tables<'courses'> }) {
  const createAnnouncementWithCourseId = createAnnouncement.bind(
    null,
    course.course_id,
  )
  const [state, action] = useFormState(createAnnouncementWithCourseId, {
    message: undefined,
    errors: {},
  })

  return (
    <form className={form} action={action}>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        name="title"
        id="title"
        required
        placeholder="Title of your announcement"
      />
      <Label htmlFor="description">Description</Label>
      <textarea
        placeholder="What is the description about?"
        id="description"
        className={textarea}
        required
        name="description"
      />
      <Label htmlFor="attachment">Upload a file</Label>
      <Input type="file" name="attachment" id="attachment" />
      <Label htmlFor="link">Link</Label>
      <Input
        type="url"
        name="link"
        id="link"
        placeholder="https://google.com"
      />
      <Button className={cx(button, 'col-span-2')} type="submit">
        Announce
      </Button>
    </form>
  )
}
