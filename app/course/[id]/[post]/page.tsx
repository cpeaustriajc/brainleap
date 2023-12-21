import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { uploadAssignment } from '@/lib/actions'
import { Tables } from '@/lib/database.types'
import { getPost, getRole } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

export async function generateStaticParams() {
	const res = await fetch('/api/post/ids')
	const postIds: Tables<'posts'>['post_id'][] = await res.json()

	if (!postIds) {
		notFound()
	}
	return postIds.map((postId) => ({
		post: postId,
	}))
}

type Props = {
	params: {
		post: string
	}
}

export default async function Page({ params }: Props) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/auth/signin')
	}

	const post = await getPost(params.post)

	const role = await getRole(user.id)

	if (!post) {
		notFound()
	}

	const uploadAssignmentWithId = uploadAssignment.bind(null, post.post_id)

	async function submitAssignment(formData: FormData) {
		'use server'
		uploadAssignmentWithId(formData)
	}

	return (
		<main>
			<div className="max-w-2xl mx-auto">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{post.title}
				</h1>
				<Separator className="my-8" />
				<div>
					<p className="whitespace-pre-wrap">{post.description}</p>
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
