'use client'

import { gradeOutput } from '@/lib/actions/output'
import { FormButton } from '@/ui/form'
import { useFormState } from 'react-dom'
import { OutputProps } from './output'

export function CreateOutputGrade({
  output,
  courseId,
  assignmentId,
}: OutputProps) {
  const [state, action] = useFormState(
    gradeOutput.bind(null, courseId, assignmentId, output.output_id),
    {
      message: undefined,
      errors: {},
    },
  )

  return (
    <form action={action}>
      <div>
        <div>
          <label>Grade</label>
          <button type="button">-</button>
          <input />
          <button type="button">+</button>
        </div>
        <FormButton>Submit</FormButton>
      </div>
    </form>
  )
}
