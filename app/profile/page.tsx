import { SetupProfileForm } from '@/components/setup-profile-form'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
export default async function Page() {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({
		cookies: () => cookieStore,
	})
	const {
		data: { session },
	} = await supabase.auth.getSession()
	return (
		<main>
			<SetupProfileForm session={session} />
		</main>
	)
}
