'use client'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Tables } from '@/lib/database.types'
import { extractUsernameFromEmail } from '@/lib/utils'
import { cx } from '@/lib/cva.config'
import { ProfilePicture } from '@/components/profile-picture'
import { Label } from '@/ui/label'
import { RadioGroup, Radio } from '@/ui/radio-group'
import { updateProfile } from '@/lib/actions/profile'
import { TextField } from '@/components/text-field'
import { useFormState, useFormStatus } from 'react-dom'
import { Form } from '@/ui/form'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<Button className="w-full" type="submit" isDisabled={pending}>
			{pending ? 'Submitting...' : 'Submit'}
		</Button>
	)
}

export function SetupProfileForm({
	profile,
	message,
}: {
	profile: Tables<'profiles'>
	message: string
}) {
	const [state, action] = useFormState(updateProfile, null)

	return (
		<div className="max-w-2xl mx-auto space-y-2">
			<p
				className={cx(
					message ? 'visible' : 'invisible',
					'fixed z-50 bottom-4 right-4 flex flex-col items-center justify-center text-center text-sm text-gray-500 bg-gray-100 rounded-md py-2 px-4',
				)}
			>
				{message}
			</p>
			<ProfilePicture url={profile.avatar_url} size={128} />
			<Form className="py-4" action={action}>
				<TextField
					type="text"
					name="username"
					defaultValue={
						profile.username ??
						extractUsernameFromEmail(profile.email)
					}
				>
					<Label>Username</Label>
					<Input placeholder="Username" />
				</TextField>
				<TextField
					type="text"
					name="full_name"
					defaultValue={profile.full_name ?? ''}
				>
					<Label>Display Name</Label>
					<Input placeholder="Display Name" />
				</TextField>
				<TextField name="email" defaultValue={profile.email ?? ''}>
					<Label>Email</Label>
					<Input placeholder="johndoe@email.com" />
				</TextField>
				<TextField
					name="biography"
					defaultValue={profile.biography ?? ''}
				>
					<Label>Biography</Label>
					<Textarea
						placeholder="Tell us a little bit about yourself"
						className="resize-none"
					/>
				</TextField>
				<TextField
					defaultValue={profile.university ?? ''}
					name="university"
				>
					<Label>University</Label>
					<Input
						type="text"
						placeholder="What university do you attend?"
						id="university"
					/>
				</TextField>

				<RadioGroup
					name="role"
					defaultValue={profile.role ?? 'student'}
				>
					<Label>Role</Label>
					<Radio value="student">Student</Radio>
					<Radio value="instructor">Instructor</Radio>
				</RadioGroup>
				<TextField
					type="text"
					defaultValue={profile.program ?? ''}
					name="program"
				>
					<Label htmlFor="program">Program</Label>
					<Input placeholder="Program" />
				</TextField>
				<TextField
					type="text"
					defaultValue={profile.section ?? ''}
					name="section"
				>
					<Label>Section</Label>
					<Input placeholder="Section" />
				</TextField>
				<TextField
					name="position"
					type="text"
					defaultValue={profile.position ?? ''}
				>
					<Label htmlFor="position">Position</Label>
					<Input placeholder="Position" />
				</TextField>
				<Submit />
			</Form>
		</div>
	)
}
