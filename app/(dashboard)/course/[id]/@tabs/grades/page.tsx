import { getEnrollments } from '@/lib/queries/enrollment'
import { createClient } from '@/lib/supabase/server'

export default async function Grades() {
  const supabase = createClient()

  const enrollments = await getEnrollments()

  const { data: students, error: studentsError } = await supabase
    .from('profiles')
    .select()
    .in(
      'profile_id',
      enrollments.map(enrollment => enrollment.user_id),
    )
    .eq('role', 'student')

  if (studentsError) throw studentsError

  // const { data: outputs, error: outputsError } = await supabase
  // 	.from('outputs')
  // 	.select()
  // 	.in(
  // 		'assignment_id',
  // 		assignments.map((assignment) => assignment.assignment_id),
  // 	)
  // 	.in(
  // 		'student_id',
  // 		students.map((person) => person.profile_id),
  // 	)

  // if (outputsError) throw outputsError

  return (
    <div>
      <h2>Grades</h2>
      <table>
        <th>
          <tr>
            <th>Student</th>
            {/* {assignments.map((assignment) => (
							<th key={assignment.assignment_id}>{assignment.title}</th>
						))} */}
          </tr>
        </th>
        <tbody>
          {students.map(student => (
            <tr key={student.username}>
              <td>{student.full_name ?? student.username}</td>
              {/* {outputs.map((output) => (
								<td key={output.output_id}>{output.grade}</td>
							))} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
