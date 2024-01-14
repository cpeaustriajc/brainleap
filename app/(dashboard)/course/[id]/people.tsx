import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/lib/database.types'
import { PersonIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
		<div className="w-1/2 mx-auto">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Instructors
			</h2>
			<ul className="py-4">
				{instructors.map((instructor) => (
					<li
						key={instructor.username}
						className="flex gap-4 items-center"
					>
						<Avatar>
							<AvatarImage
								src={instructor.avatar_url ?? ''}
								alt={instructor.username ?? ''}
							/>
							<AvatarFallback>
								<PersonIcon />
							</AvatarFallback>
						</Avatar>
						<span>
							{instructor.full_name ?? instructor.username}
						</span>
					</li>
				))}
			</ul>

			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Students
			</h2>
			<ul className="py-4 grid gap-4">
				{students.map((student) => (
					<li
						key={student.username}
						className="flex gap-4 items-center"
					>
						<Avatar>
							<AvatarImage
								src={student.avatar_url ?? ''}
								alt={student.username ?? ''}
							/>
							<AvatarFallback>
								<PersonIcon />
							</AvatarFallback>
						</Avatar>
						<span>{student.full_name ?? student.username}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
