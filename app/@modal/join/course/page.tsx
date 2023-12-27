import { CloseDialog } from '@/components/close-dialog'
import { ModalBackground } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createEnrollment } from '@/lib/actions/enrollment'
import { revalidateTag } from 'next/cache'

export default function Page() {
	const action = async (formData: FormData) => {
		'use server'
		createEnrollment(formData)
		revalidateTag('courses')
		revalidateTag('enrollments')
	}

	return (
		<ModalBackground>
			<form
				action={action}
				className="flex flex-col space-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-border p-4 rounded bg-card w-64"
			>
				<div className="grid items-center">
					<CloseDialog />
				</div>
				<Label htmlFor="classCode" className="text-2xl">
					Class Code
				</Label>
				<p className="text-xs px-1">
					Ask your teacher for the class code. Then enter it here.
				</p>
				<Input
					type="text"
					id="classCode"
					name="classCode"
					placeholder="Class Code"
				/>
				<Button type="submit">Join Class</Button>
			</form>
		</ModalBackground>
	)
}
