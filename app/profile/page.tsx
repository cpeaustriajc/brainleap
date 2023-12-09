import { SetupProfileForm } from '@/components/setup-profile-form'
import { getProfile } from '@/lib/queries'

export default async function Page() {
	const profile = await getProfile()

	if (!profile) {
		throw new Error('Profile not found')
	}

	return (
		<main>
			<SetupProfileForm profile={profile} />
		</main>
	)
}
