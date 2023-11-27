import { SetupProfileForm } from '@/components/setup-profile-form'
import { Database } from '@/lib/database.types'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createServerClient<Database>(
		process.env['NEXT_PUBLIC_SUPABASE_URL']!,
		process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
		{
			cookies: {
				get: (name: string) => {
					return cookieStore.get(name)?.value
				},
			},
		},
	)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data, error } = await supabase
		.from('profiles')
		.select()
		.eq('id', session?.user.id ?? '')
		.single()

	if (error) {
		throw error
	}

	return (
		<main>
			<SetupProfileForm profile={data} />
		</main>
	)
}
