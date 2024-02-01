import { UserIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		notFound()
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('profile_id', user.id)
		.single()

	if (profileError) {
		throw profileError
	}

	return (
		<main>
			{profile.avatar_url ? (
				<Image
					src={profile.avatar_url}
					alt={profile.full_name}
					width={128}
					height={128}
				/>
			) : (
				<UserIcon />
			)}

			<p>{profile.full_name}</p>
			<p>{profile.username}</p>
			<p>{profile.biography}</p>
		</main>
	)
}
