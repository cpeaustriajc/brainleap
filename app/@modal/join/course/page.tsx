import { CloseDialog } from '@/components/close-dialog'
import { ModalBackground } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { joinClass } from '@/lib/actions'

export default function Page() {
	const action = async (formData: FormData) => {
		'use server'
		joinClass(formData)
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
				<Label htmlFor="classCode">Class Code</Label>
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
