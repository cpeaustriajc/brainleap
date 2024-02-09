import { createEnrollment } from '@/lib/actions/enrollment'
import { useFormState, useFormStatus } from 'react-dom'

function Submit() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      {pending ? 'Joining Class...' : 'Join Class'}
    </button>
  )
}

export function EnrollCourseForm() {
  const [state, action] = useFormState(createEnrollment, {
    errors: {},
    message: undefined,
  })
  return (
    <form action={action}>
      <label>Class Code</label>
      <input placeholder="Class Code" />
      <Submit />
    </form>
  )
}
