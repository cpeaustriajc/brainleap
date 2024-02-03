import { cx } from '@/lib/cva.config'
import { createClient } from '@/lib/supabase/server'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'
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
		<main className="grid grid-cols-[25%,1fr] items-center gap-2">
			<h2 className="col-span-full text-xl font-bold">Profile Picture</h2>
			<Image
				src={profile.avatar_url}
				alt={profile.full_name}
				width={128}
				height={128}
				placeholder="blur"
				blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(74 222 128)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 20a6 6 0 0 0-12 0'/%3E%3Ccircle cx='12' cy='10' r='4'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E"
			/>
			<form
				action=""
				className={cx(form, 'gap-2 grid-flow-col place-items-center')}
			>
				<label className={label} htmlFor="avatar">
					Update Profile Picture
				</label>
				<input className={input} type="file" name="avatar" id="avatar" />
			</form>
			<h2 className="col-span-full text-xl font-bold">Name</h2>

			<p>{profile.full_name}</p>
			<form
				action=""
				className={cx(form, 'gap-2 grid-flow-col place-items-center')}
			>
				<label htmlFor="full_name" className={label}>
					Update name
				</label>
				<input className={input} type="text" name="full_name" id="full_name" />
			</form>
			<h2 className="col-span-full text-xl font-bold">Username</h2>
			<p>{profile.username}</p>
			<form
				action=""
				className={cx(form, 'gap-2 grid-flow-col place-items-center')}
			>
				<label className={label} htmlFor="username">
					Update Username
				</label>
				<input className={input} type="text" name="username" id="username" />
			</form>
			<p>{profile.biography}</p>
		</main>
	)
}
