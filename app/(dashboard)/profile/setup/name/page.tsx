import { createClient } from '@/lib/supabase/server'
import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { updateName } from '@/lib/actions/profile'

export default async function Page() {
	const cookieStore = cookies()

	const supabase = createClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/signin')
	}

	const { data } = await supabase
		.from('profiles')
		.select('full_name')
		.eq('profile_id', session.user.id)
		.limit(1)
		.single()
	return (
		<div>
			<form className={form} action={updateName}>
				<label className={label} htmlFor="name">
					Name
				</label>
				<input
					className={input}
					type="text"
					name="name"
					id="name"
					defaultValue={data?.full_name ?? ''}
				/>
				<button className={button} type="submit">
					Submit Name
				</button>
			</form>
		</div>
	)
}
