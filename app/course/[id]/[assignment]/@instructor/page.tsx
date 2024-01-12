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
import { Suspense } from 'react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

export async function generateStaticParams() {
	const supabase = createBrowserClient()
	const { data: assignments, error } = await supabase
		.from('assignments')
		.select('assignment_id')

	if (error) {
		throw new Error(`${error.message}`)
	}

	return assignments.map((assignment) => ({
		assignment: assignment.assignment_id,
	}))
}

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

	const { data: students } = await supabase
		.from('profiles')
		.select()
		.in(
			'profile_id',
			enrollments.map((enrollment) => enrollment.user_id),
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
			'output_id, attachment, submitted_at, grade, profiles ( full_name, username ) ',
		)
		.eq('assignment_id', assignment.assignment_id)
		.in(
			'student_id',
			students.map((student) => student.profile_id),
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
		<div className="px-4 pt-4">
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
						<Suspense fallback={null}>
							{outputsWithStudents?.map((output) => (
								<Output
									key={output.output_id}
									output={output}
									courseId={courseIdResult.course_id}
									assignmentId={assignment.assignment_id}
								/>
							))}
						</Suspense>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
