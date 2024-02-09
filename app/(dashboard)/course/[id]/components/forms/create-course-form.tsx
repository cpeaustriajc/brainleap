import { createCourse } from '@/lib/actions/course'
import { FormButton } from '@/ui/form'
import { useFormState } from 'react-dom'

export function CreateCourseForm() {
  const [state, action] = useFormState(createCourse, {
    errors: {},
    message: undefined,
  })
  return (
    <form action={action}>
      <label>Class Title</label>
      <input placeholder="Class Title" />
      <label>Section</label>
      <input placeholder="Section" />
      <label>Subject</label>
      <input placeholder="Subject" />
      <label>Room</label>
      <input placeholder="Room" />
      <label>Class Description</label>
      <textarea placeholder="Class Description" />
      <FormButton>Create Class</FormButton>
    </form>
  )
}
