import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Fragment } from 'react'
import { CreateOutputGrade } from './forms/create-output-grade-form'

export type OutputProps = {
	output: Omit<Tables<'outputs'>, 'assignment_id' | 'student_id'> & {
		profiles: Pick<Tables<'profiles'>, 'full_name' | 'username'> | null
	}
	courseId: string
	assignmentId: string
}

export async function Output({ output, courseId, assignmentId }: OutputProps) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: file } = await supabase.storage
		.from('files')
		.createSignedUrl(output.attachment, 3600)
	const submittedAt = new Date(output.submitted_at)
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}

	return (
		<Fragment key={output.output_id}>
			<td>{output.profiles?.full_name ?? output.profiles?.username} </td>
			<td>
				<CreateOutputGrade
					output={output}
					courseId={courseId}
					assignmentId={assignmentId}
				/>
			</td>
			<td>
				{file ? (
					<Link href={file.signedUrl} target="_blank">
						View
					</Link>
				) : (
					<span>No file</span>
				)}
			</td>
			<td>{submittedAt.toLocaleDateString('en-US', options)}</td>
		</Fragment>
	)
}
