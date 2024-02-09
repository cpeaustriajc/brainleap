import { getAssignmentById } from '@/lib/queries/assignment'
import { getEnrollments } from '@/lib/queries/enrollment'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { QueryData } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Output } from './components/output'

export default async function TeacherView({
  params,
}: {
  params: { assignment: string; id: string }
}) {
  const supabase = createServerClient()
  const enrollments = await getEnrollments()

  if (!enrollments) {
    notFound()
  }

  const { data: students } = await supabase
    .from('profiles')
    .select()
    .in(
      'id',
      enrollments.map(enrollment => enrollment.user_id),
    )
    .eq('role', 'student')

  if (!students) notFound()

  const assignment = await getAssignmentById(params.assignment)

  if (!assignment) {
    notFound()
  }

  const outputWithStudentsQuery = supabase
    .from('outputs')
    .select(
      'output_id, attachment, submitted_at, grade, course_id, profiles ( full_name, username ) ',
    )
    .eq('assignment_id', assignment.assignment_id)
    .in(
      'student_id',
      students.map(student => student.id),
    )

  type OutputWithStudents = QueryData<typeof outputWithStudentsQuery>

  const { data: outputWithStudentsResult, error: outputWithStudentsError } =
    await outputWithStudentsQuery

  if (outputWithStudentsError) throw outputWithStudentsError

  const outputsWithStudents: OutputWithStudents = outputWithStudentsResult

  const { data: courseIdResult, error: courseIdError } = await supabase
    .from('courses')
    .select('course_id')
    .eq('course_id', params.id)
    .limit(1)
    .single()

  if (courseIdError) {
    throw new Error(courseIdError.message)
  }

  return (
    <div>
      <h1>{assignment.title}</h1>
      <table>
        <th>
          <tr>
            <th>Student</th>
            <th>Grade</th>
            <th>Output</th>
            <th>Submitted At</th>
          </tr>
        </th>
        <tbody>
          <tr>
            <Suspense fallback={null}>
              {outputsWithStudents?.map(output => (
                <Output
                  key={output.output_id}
                  output={output}
                  courseId={courseIdResult.course_id}
                  assignmentId={assignment.assignment_id}
                />
              ))}
            </Suspense>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
