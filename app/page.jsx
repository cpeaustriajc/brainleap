import AppShell from '@/components/app-shell'
import { Course } from '@/components/course'

export default function Page() {

	return (
		<AppShell>
			<main>
				<section className='flex px-8'>
					<Course />
				</section>
			</main>
		</AppShell>
	)
}
