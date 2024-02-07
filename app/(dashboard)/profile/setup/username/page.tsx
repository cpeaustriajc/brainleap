import { updateUsername } from '@/lib/actions/profile'
import { createClient } from '@/lib/supabase/server'
import { button } from '@/ui/button'
import { input } from '@/ui/input'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Session } from '@supabase/supabase-js'

const getUsername = async (session: Session) => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data, error } = await supabase
		.from('profiles')
		.select('username')
		.eq('profile_id', session.user.id)
		.limit(1)
		.single()

	if (error) {
		throw error
	}


	// Return empty string if no username is found
	if (!data || !data.username) {
		return ''
	}

	return data.username
}

export default async function SetupUsernamePage() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession()

	if (error) {
		throw error
	}

	if (!session) {
		redirect('/auth/signin')
	}

	const username = await getUsername(session)

	return (
		<>
			<p>Let's start with you username</p>

			<form action={updateUsername}>
				<input
					type="text"
					name="username"
					id="username"
					required
					placeholder="coolusername"
					defaultValue={username}
					minLength={6}
					maxLength={20}
					className={input}
				/>
				<button type="submit" className={button}>
					Submit
				</button>
			</form>
		</>
	)
}
