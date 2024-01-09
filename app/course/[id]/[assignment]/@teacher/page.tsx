import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { getEnrollments } from '@/lib/queries/enrollment'
import { createClient } from '@/lib/supabase/server'
import { QueryData } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Output } from '@/components/output'
import { getAssignmentById } from '@/lib/queries/assignment'

export default async function TeacherView({
	params,
}: {
	params: { assignment: string; id: string }
}) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const enrollments = await getEnrollments()

	if (!enrollments) {
		notFound()
	}

	const { data: enrolledPeople } = await supabase
		.from('profiles')
		.select()
		.in(
			'profile_id',
			enrollments.map((enrollment) => enrollment.user_id),
		)

	if (!enrolledPeople) notFound()

	const assignment = await getAssignmentById(params.assignment)

	if (!assignment) {
		notFound()
	}

	const students = enrolledPeople?.filter(
		(profile) => profile.role === 'student',
	)

	const outputWithStudentsQuery = supabase
		.from('outputs')
		.select(
			'output_id, attachment, submitted_at, grade, profiles ( full_name, username ) ',
		)
		.eq('assignment_id', assignment.assignment_id)
		.eq('student_id', students?.map((student) => student.profile_id))

	type OutputWithStudents = QueryData<typeof outputWithStudentsQuery>

	const { data: outputWithStudentsResult, error: outputWithStudentsError } =
		await outputWithStudentsQuery

	if (outputWithStudentsError) throw outputWithStudentsError

	const outputsWithStudents: OutputWithStudents = outputWithStudentsResult

	const { data: courseIdResult, error: courseIdError } = await supabase
		.from('courses')
		.select('course_id')
		.eq('course_id', params.id)
		.single()

	if (courseIdError) {
		throw new Error(`${courseIdError.message}`)
	}

	return (
		<div>
			<h1 className="mx-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{assignment.title}
			</h1>
			<Separator className="my-8" />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Student</TableHead>
						<TableHead>Grade</TableHead>
						<TableHead>Output</TableHead>
						<TableHead>Submitted At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						{outputsWithStudents?.map((output) => (
							<Output
								key={output.output_id}
								output={output}
								courseId={courseIdResult.course_id}
								assignmentId={assignment.assignment_id}
							/>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
