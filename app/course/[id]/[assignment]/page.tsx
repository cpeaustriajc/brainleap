import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { uploadAssignment } from '@/lib/actions'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
	const supabase = createBrowserClient()

	const { data: assignments } = await supabase
		.from('assignments')
		.select('assignment_id')

	return assignments?.map((assignment) => ({
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
	const { data: assignment } = await supabase
		.from('assignments')
		.select()
		.eq('assignment_id', params.assignment)
		.single()

	if (!assignment) {
		notFound()
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
					<form action={uploadAssignment} className="space-y-2">
						<div className="space-y-2">
							<Label htmlFor="file">Upload file</Label>
							<Input type="file" name="file" id="file" />
						</div>
						<Button type="submit">Turn In</Button>
					</form>
				</div>
			</div>
		</main>
	)
}
