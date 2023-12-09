import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tables } from '@/lib/definitions'
import { createClient } from '@/lib/supabase/client'
import { createPostgresTimestamp } from '@/lib/utils'
import { ProfilePicture } from './profile-picture'
import { Label } from './ui/label'

export const baseProfileSchema = z.object({
	id: z.string().uuid().optional(),
	username: z.string().min(3).max(20),
	avatar_url: z.string().url().optional(),
	biography: z
		.string()
		.min(10, { message: 'Bio must be at least 10 characters.' })
		.max(160, { message: 'Bio must not be longer than 30 characters.' })
		.optional(),
	email: z.string().email(),
	university: z.string().max(280).optional(),
	full_name: z.string().max(280).optional(),
})

export const profileSchema = z.discriminatedUnion('role', [
	z.object({ role: z.literal(undefined) }).merge(baseProfileSchema),
	z
		.object({
			role: z.literal('student'),
			section: z.string().max(2).optional(),
			program: z.string().max(280).optional(),
		})
		.merge(baseProfileSchema),
	z
		.object({
			role: z.literal('instructor'),
			position: z.string().max(280).optional(),
		})
		.merge(baseProfileSchema),
])

export function SetupProfileForm({
	profile,
}: {
	profile: Tables<'profiles'> | null
}) {
	async function updateProfile(formData: FormData) {
		const supabase = createClient()
		const date = new Date()
		const updated_at = createPostgresTimestamp(date)

		const values = profileSchema.parse({
			biography: formData.get('biography'),
			email: formData.get('email'),
			full_name: formData.get('full_name'),
			role: formData.get('role'),
			section: formData.get('section'),
			university: formData.get('university'),
			username: formData.get('username'),
			program: formData.get('program'),
			position: formData.get('position'),
		})

		const {
			data: { session },
			error: sessionError,
		} = await supabase.auth.getSession()

		if (sessionError) {
			throw sessionError
		}

		if (values.role === 'student') {
			const { error } = await supabase
				.from('profiles')
				.update({
					full_name: values.full_name,
					username: values.username,
					biography: values.biography,
					program: values.program,
					section: values.section,
					university: values.university,
					email: values.email,
					updated_at,
				})
				.eq('profile_id', session?.user.id ?? '')

			if (error) {
				throw error
			}
		} else if (values.role === 'instructor') {
			const { error } = await supabase
				.from('profiles')
				.update({
					avatar_url: values.avatar_url,
					full_name: values.full_name,
					username: values.username,
					biography: values.biography,
					position: values.position,
					email: values.email,
					role: values.role,
					updated_at,
				})
				.eq('profile_id', session?.user.id ?? '')
			if (error) {
				throw error
			}
		}
	}

	const action = async (formData: FormData) => {
		'use server'
		updateProfile(formData)
	}

	return (
		<div className="max-w-2xl mx-auto space-y-2">
			<ProfilePicture
				uid={profile?.profile_id ?? ''}
				url={profile?.avatar_url ?? ''}
				size={128}
			/>
			<form className="my-4 space-y-4" action={action}>
				<Label htmlFor="username">Username</Label>
				<Input
					type="text"
					placeholder="Username"
					id="username"
					name="username"
				/>
				<Label htmlFor="full_name">Display Name</Label>
				<Input
					type="text"
					placeholder="Display Name"
					id="full_name"
					name="full_name"
				/>

				<Label htmlFor="email">Email</Label>
				<Input
					type="text"
					placeholder="johndoe@email.com"
					id="email"
					name="email"
				/>
				<Label htmlFor="biography">Biography</Label>
				<Textarea
					placeholder="Tell us a little bit about yourself"
					className="resize-none"
					id="biography"
					name="biography"
				/>
				<Label htmlFor="university">University</Label>
				<Input
					type="text"
					placeholder="What university do you attend?"
					name="university"
					id="university"
				/>

				<Label htmlFor="student">Student</Label>
				<Input type="radio" name="role" id="student" value="student" />

				<Label htmlFor="instructor">Instructor</Label>
				<Input
					type="radio"
					name="role"
					id="instructor"
					value="instructor"
				/>

				<Label htmlFor="program">Program</Label>
				<Input
					type="text"
					placeholder="Program"
					name="program"
					id="program"
				/>

				<Label htmlFor="section">Section</Label>
				<Input
					type="text"
					placeholder="Section"
					name="section"
					id="section"
				/>

				<Label htmlFor="position">Position</Label>
				<Input
					type="text"
					placeholder="Position"
					name="position"
					id="position"
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}
