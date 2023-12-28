import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tables } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/server'
import { cn, createPostgresTimestamp, extractUsername } from '@/lib/utils'
import { ProfilePicture } from './profile-picture'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { profileSchema } from '@/lib/validations/profile'

export function SetupProfileForm({
	profile,
	message,
}: {
	profile: Tables<'profiles'>
	message: string
}) {
	async function updateProfile(formData: FormData) {
		'use server'
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const date = new Date()
		const updated_at = createPostgresTimestamp(date)

		const values = profileSchema.safeParse({
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

		if (!session) {
			redirect('/auth/signin')
		}

		const {
			user: { id },
		} = session

		if (!values.success) {
			throw values.error
		}

		if (values.data.role === 'student') {
			const { error } = await supabase
				.from('profiles')
				.update({
					full_name: values.data.full_name,
					username: values.data.username,
					biography: values.data.biography,
					program: values.data.program,
					section: values.data.section,
					university: values.data.university,
					email: values.data.email,
					updated_at,
				})
				.eq('profile_id', id)

			if (error) {
				throw error
			}
		} else if (values.data.role === 'instructor') {
			const { error } = await supabase
				.from('profiles')
				.update({
					avatar_url: values.data.avatar_url,
					full_name: values.data.full_name,
					username: values.data.username,
					biography: values.data.biography,
					position: values.data.position,
					email: values.data.email,
					role: values.data.role,
					updated_at,
				})
				.eq('profile_id', id)

			if (error) {
				throw error
			}
		}
		revalidateTag('profile')
	}

	const action = async (formData: FormData) => {
		'use server'
		updateProfile(formData)
	}

	return (
		<div className="max-w-2xl mx-auto space-y-2">
			<p
				className={cn(
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
