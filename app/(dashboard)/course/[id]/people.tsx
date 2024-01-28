import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { UserRoundIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'

export async function People({
	enrolledPeople,
}: {
	enrolledPeople: Tables<'enrollments'>[]
}) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: students, error: studentQueryError } = await supabase
		.from('profiles')
		.select('*')
		.in(
			'profile_id',
			enrolledPeople.map((enrolledPerson) => enrolledPerson.user_id),
		)
		.eq('role', 'student')

	if (studentQueryError) {
		throw new Error(studentQueryError.message)
	}

	const { data: instructors, error: instructorQueryError } = await supabase
		.from('profiles')
		.select('*')
		.in(
			'profile_id',
			enrolledPeople.map((enrolledPerson) => enrolledPerson.user_id),
		)
		.eq('role', 'instructor')

	if (instructorQueryError) {
		throw new Error(instructorQueryError.message)
	}

	return (
		<div>
			<h2>Instructors</h2>
			<ul>
				{instructors.map((instructor) => (
					<li key={instructor.username}>
						<div>
							<Image
								src={instructor.avatar_url ?? ''}
								alt={instructor.username ?? ''}
							/>
							<div>
								<UserRoundIcon />
							</div>
						</div>
						<span>{instructor.full_name ?? instructor.username}</span>
					</li>
				))}
			</ul>

			<h2>Students</h2>
			<ul>
				{students.map((student) => (
					<li key={student.username}>
						<div>
							<Image
								src={student.avatar_url ?? ''}
								alt={student.username ?? ''}
							/>
							<div>
								<UserRoundIcon />
							</div>
						</div>
						<span>{student.full_name ?? student.username}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
