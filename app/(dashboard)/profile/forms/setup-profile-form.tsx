'use client'

import { ProfilePicture } from '@/components/profile-picture'
import { updateProfile } from '@/lib/actions/profile'
import { Tables } from '@/lib/database.types'
import { useFormState, useFormStatus } from 'react-dom'

function Submit() {
	const { pending } = useFormStatus()

	return (
		<button type="submit" disabled={pending}>
			{pending ? 'Submitting...' : 'Submit'}
		</button>
	)
}

export function SetupProfileForm({
	profile,
}: {
	profile: Tables<'profiles'>
}) {
	const [state, action] = useFormState(updateProfile, null)

	return (
		<div>
			<ProfilePicture url={profile.avatar_url} size={128} />
			<form action={action}>
				<label>Username</label>
				<input placeholder="Username" />
				<label>Display Name</label>
				<input placeholder="Display Name" />
				<label>Email</label>
				<input placeholder="johndoe@email.com" />
				<label>Biography</label>
				<textarea placeholder="Tell us a little bit about yourself" />
				<label>University</label>
				<input
					type="text"
					placeholder="What university do you attend?"
					id="university"
				/>

				<label>Role</label>
				<input type="radio" />
				<label htmlFor="">Student</label>
				<input type="radio" />
				<label htmlFor="">Instructor</label>
				<label htmlFor="program">Program</label>
				<input placeholder="Program" />
				<label>Section</label>
				<input placeholder="Section" />
				<label htmlFor="position">Position</label>
				<input placeholder="Position" />
				<Submit />
			</form>
		</div>
	)
}
