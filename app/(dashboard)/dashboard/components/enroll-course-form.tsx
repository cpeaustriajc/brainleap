import { createEnrollment } from '@/lib/actions/enrollment'
import { FormButton } from '@/ui/form'
import { useFormState } from 'react-dom'

export function EnrollCourseForm() {
  const [state, action] = useFormState(createEnrollment, {
    errors: {},
    message: undefined,
  })
  return (
    <form action={action}>
      <label>Class Code</label>
      <input placeholder="Class Code" />
      <FormButton>Enroll</FormButton>
    </form>
  )
}
