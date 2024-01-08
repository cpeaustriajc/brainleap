import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tables } from '@/lib/database.types'
import { getEnrollments } from '@/lib/queries/enrollment'
import { createClient } from '@/lib/supabase/server'
import { QueryData } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Output } from '@/components/output'

export const TeacherView = async ({
	assignment,
}: {
	assignment: Tables<'assignments'>
}) => {
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

	const { data, error } = await outputWithStudentsQuery

	if (error) throw error

	const outputsWithStudents: OutputWithStudents = data

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
							<Output key={output.output_id} output={output} />
						))}
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
