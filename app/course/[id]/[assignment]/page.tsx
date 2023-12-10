import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { uploadAssignment } from '@/lib/actions'
import { getAssignment, getRole } from '@/lib/queries'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

export async function generateStaticParams() {
	const supabase = createBrowserClient()

	const { data: assignments } = await supabase
		.from('assignments')
		.select('assignment_id')

	if (!assignments) {
		notFound()
	}

	return assignments.map((assignment) => ({
		assignment: assignment.assignment_id,
	}))
}

type Props = {
	params: {
		assignment: string
	}
}

export default async function Page({ params }: Props) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const assignment = await getAssignment(params.assignment)

	const role = await getRole(user.id)

	if (!assignment) {
		notFound()
	}

	const uploadAssignmentWithId = uploadAssignment.bind(
		null,
		assignment.assignment_id,
	)

	async function submitAssignment(formData: FormData) {
		'use server'
		uploadAssignmentWithId(formData)
	}

	return (
		<main>
			<div className="max-w-2xl mx-auto">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{assignment.title}
				</h1>
				<Separator className="my-8" />
				<div>
					<p className="whitespace-pre-wrap">
						{assignment.description}
					</p>
				</div>
				<div>
					{role === 'student' && (
						<form action={submitAssignment} className="space-y-2">
							<fieldset className="border rounded border-primary p-3 space-y-2">
								<legend className="font-bold">
									Turn in your assignment
								</legend>
								<Label htmlFor="file">Upload file</Label>
								<Input type="file" name="file" id="file" />
							</fieldset>
							<Button type="submit">Turn In</Button>
						</form>
					)}
				</div>
			</div>
		</main>
	)
}
