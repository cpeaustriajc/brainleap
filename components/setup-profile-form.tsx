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

export function SetupProfileForm({
	profile,
	message,
}: {
	profile: Tables<'profiles'>
	message: string
}) {
	const action = async (formData: FormData) => {
		'use server'
		updateProfile(formData)
	}

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
				<Label htmlFor="username">Username</Label>
				<Input
					type="text"
					placeholder="Username"
					id="username"
					name="username"
					defaultValue={
						profile.username ?? extractUsername(profile.email)
					}
				/>
				<Label htmlFor="full_name">Display Name</Label>
				<Input
					type="text"
					placeholder="Display Name"
					id="full_name"
					name="full_name"
					defaultValue={profile.full_name ?? ''}
				/>

				<Label htmlFor="email">Email</Label>
				<Input
					type="text"
					placeholder="johndoe@email.com"
					id="email"
					name="email"
					defaultValue={profile.email ?? ''}
				/>
				<Label htmlFor="biography">Biography</Label>
				<Textarea
					placeholder="Tell us a little bit about yourself"
					className="resize-none"
					id="biography"
					name="biography"
					defaultValue={profile.biography ?? ''}
				/>
				<Label htmlFor="university">University</Label>
				<Input
					type="text"
					placeholder="What university do you attend?"
					name="university"
					id="university"
					defaultValue={profile.university ?? ''}
				/>
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

				<Label htmlFor="program">Program</Label>
				<Input
					type="text"
					placeholder="Program"
					name="program"
					id="program"
					defaultValue={profile.program ?? ''}
				/>

				<Label htmlFor="section">Section</Label>
				<Input
					type="text"
					placeholder="Section"
					name="section"
					id="section"
					defaultValue={profile.section ?? ''}
				/>

				<Label htmlFor="position">Position</Label>
				<Input
					type="text"
					placeholder="Position"
					name="position"
					id="position"
					defaultValue={profile.position ?? ''}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}
