import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getEnrollments } from '@/lib/queries/enrollment'
import { Tables } from '@/lib/database.types'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/table'

export async function Grades({
	assignments,
}: {
	assignments: Tables<'assignments'>[]
}) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const enrollments = await getEnrollments()

	const { data: students, error: studentsError } = await supabase
		.from('profiles')
		.select()
		.in(
			'profile_id',
			enrollments.map((enrollment) => enrollment.user_id),
		)
		.eq('role', 'student')

	if (studentsError) throw studentsError

	const { data: outputs, error: outputsError } = await supabase
		.from('outputs')
		.select()
		.in(
			'assignment_id',
			assignments.map((assignment) => assignment.assignment_id),
		)
		.in(
			'student_id',
			students.map((person) => person.profile_id),
		)

	if (outputsError) throw outputsError

	return (
		<div  >
			<h2  >
				Grades
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Student</TableHead>
						{assignments.map((assignment) => (
							<TableHead key={assignment.assignment_id}>
								{assignment.title}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{students.map((student) => (
						<TableRow key={student.username}>
							<TableCell>
								{student.full_name ?? student.username}
							</TableCell>
							{outputs.map((output) => (
								<TableCell key={output.output_id}>
									{output.grade}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
