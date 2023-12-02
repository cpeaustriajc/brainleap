import { Badge } from '@/components/ui/badge'
import { Tables } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'

type Props = {
	params: {
		id: string
	}
}

export async function generateStaticParams() {
	const supabase = createBrowserClient()
	const { data: classes } = await supabase.from('classes').select('class_id')

	return classes?.map((c) => ({
		id: c.class_id,
	}))
}

export default async function Page({ params }: Props) {
	let profile: Tables<'profiles'> | null = null
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const { data: course } = await supabase
		.from('classes')
		.select()
		.eq('class_id', params.id)
		.single()
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		const { data, error } = await supabase
			.from('profiles')
			.select()
			.eq('profile_id', session.user.id)
			.single()
		profile = data

		if (error) {
			throw error
		}
	}

	return (
		<main className="px-8">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{course?.class_name}
			</h1>
			<p className="leading-7 [&:not(:first-child)]:mt-6">
				{course?.class_description}
			</p>
			{profile?.role === 'instructor' && (
				<>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Get started by sharing the class code:{' '}
					</p>
					<Badge>{course?.class_id}</Badge>
				</>
			)}
		</main>
	)
}
