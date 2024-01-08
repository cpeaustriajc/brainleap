'use client'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tables } from '@/lib/database.types'
import { extractUsername } from '@/lib/utils'
import { cx } from '@/lib/cva.config'
import { ProfilePicture } from './profile-picture'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { updateProfile } from '@/lib/actions/profile'
import { TextField } from './text-field'
import { useFormState } from 'react-dom'

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
			<ProfilePicture
				uid={profile.profile_id}
				url={profile.avatar_url}
				size={128}
			/>
			<form className="my-4 space-y-4" action={action}>
				<TextField
					type="text"
					name="username"
					defaultValue={
						profile.username ?? extractUsername(profile.email)
					}
				>
					<Label>Username</Label>
					<Input type="text" placeholder="Username" />
				</TextField>
				<TextField
					type="text"
					name="full_name"
					defaultValue={profile.full_name ?? ''}
				>
					<Label>Display Name</Label>
					<Input type="text" placeholder="Display Name" />
				</TextField>
				<TextField name="email" defaultValue={profile.email ?? ''}>
					<Label>Email</Label>
					<Input type="text" placeholder="johndoe@email.com" />
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
					type="text"
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

				<Label htmlFor="role">Role</Label>

				<RadioGroup
					defaultValue={profile.role ?? 'student'}
					id="role"
					name="role"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="student"
							id="student"
							title="Student"
						/>
						<Label htmlFor="student">Student</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="instructor"
							id="instructor"
							title="Instructor"
						/>
						<Label htmlFor="instructor">Instructor</Label>
					</div>
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
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}
