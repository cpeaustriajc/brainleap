import { createClient } from '@/lib/supabase/server'
import { button } from '@/ui/button'
import { input } from '@/ui/input'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import React from 'react'

export default function Page() {
	const insertUsername = async (formData: FormData) => {
		'use server'
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const username = formData.get('username') as string | null

		const { error } = await supabase.from('profiles').update({ username })

		if (error) {
			throw error
		}

		redirect('/profile/setup/name')
	}

	return (
		<React.Fragment>
			<h1>Let&apos;s get you setup</h1>
			<p>Let's start with you username</p>

			<form action={insertUsername}>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="coolusername"
					className={input}
				/>
				<button type="submit" className={button}>
					Submit
				</button>
			</form>
		</React.Fragment>
	)
}
