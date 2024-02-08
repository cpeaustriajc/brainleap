import {
	updateName,
	updateSection,
	updateUniversity,
	updateUsername,
} from '@/lib/actions/profile'
import { cx } from '@/lib/cva.config'
import { createClient } from '@/lib/supabase/server'
import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'
import { textarea } from '@/ui/textarea'
import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function Page() {
	noStore()

	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		notFound()
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select(
			'avatar_url, full_name, username, biography, university, section, program'
		)
		.eq('profile_id', user.id)
		.single()

	if (profileError) {
		throw profileError
	}

	return (
		<main className="px-4 pt-2 rounded-lg col-start-2 row-span-2 ">
			<section className="grid grid-cols-[25%,1fr] p-4 items-start gap-2 bg-stone-50 dark:bg-stone-900">
				<h2 className="col-span-full text-xl font-bold">
					Profile Picture
				</h2>
				<Image
					src={profile.avatar_url}
					alt={profile.full_name}
					width={128}
					height={128}
					placeholder="blur"
					blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(74 222 128)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 20a6 6 0 0 0-12 0'/%3E%3Ccircle cx='12' cy='10' r='4'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E"
				/>
				<form action="" className={cx(form, 'gap-2 col-start-2')}>
					<label className={label} htmlFor="avatar">
						Update Profile Picture
					</label>
					<input
						className={input}
						accept="image/*"
						type="file"
						name="avatar"
						id="avatar"
					/>
					<button className={button} type="submit">
						Update
					</button>
				</form>
				<h2 className="col-span-full text-xl font-bold">Name</h2>
				<p>{profile.full_name}</p>
				<form action={updateName} className={cx(form, 'gap-2')}>
					<label htmlFor="full_name" className={label}>
						Update name
					</label>
					<input
						type="text"
						className={input}
						name="full_name"
						id="full_name"
					/>
					<button className={button} type="submit">
						Update
					</button>
				</form>
				<h2 className="col-span-full text-xl font-bold">Username</h2>
				<p>{profile.username}</p>
				<form action={updateUsername} className={cx(form, 'gap-2')}>
					<label className={label} htmlFor="username">
						Update Username
					</label>
					<input
						type="text"
						className={input}
						name="username"
						id="username"
					/>
					<button className={button} type="submit">
						Update
					</button>
				</form>
				<h2 className="col-span-full text-xl font-bold">About</h2>
				<p>
					{!profile.biography ? (
						<span className="text-stone-400">
							A short sentence about you
						</span>
					) : (
						profile.biography
					)}{' '}
				</p>
				<form action="" className={cx(form, 'gap-2')}>
					<label className={label} htmlFor="biography">
						Update About You
					</label>
					<textarea
						className={textarea}
						name="biography"
						id="biography"
					/>
					<button className={button} type="submit">
						Update
					</button>
				</form>
				<h2 className="col-span-full text-xl font-bold">University</h2>
				<p>
					{!profile.university ? (
						<span className="text-stone-400">
							What is the name of your university?
						</span>
					) : (
						profile.university
					)}
				</p>
				<form action={updateUniversity} className={cx(form, 'gap-2')}>
					<label className={label} htmlFor="university">
						Update Univesity
					</label>
					<input
						type="text"
						className={input}
						name="university"
						id="university"
					/>
					<button className={button} type="submit">
						Update
					</button>
				</form>
				<h2 className="col-span-full text-xl font-bold">Section</h2>
				<p>
					{!profile.section ? (
						<span className="text-stone-400">
							What is your section?
						</span>
					) : (
						profile.section
					)}
				</p>
				<form action={updateSection} className={cx(form, 'gap-2')}>
					<label className={label} htmlFor="section">
						Update Section
					</label>
					<input
						type="text"
						className={input}
						name="section"
						id="section"
					/>
					<button className={button} type="submit">
						Update
					</button>
				</form>
			</section>
		</main>
	)
}
