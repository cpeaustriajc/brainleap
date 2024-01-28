import React from 'react'
import { Header } from './_components/header'

export const content = {
	hero: 'Meet your next assistant to a better learning experience.',
	about:
		'Brainleap is a collaborative e-learning platform tool that is focused on using AI as an assistant.',
}

export default async function Page() {
	return (
		<main>
			<Header />
			<article>
				<section>
					<h1>{content.hero}</h1>
					<h2>
						A collaborative e-learning platform tool based on Google Classroom
						for 3rd year engineering department at Pamantasan ng Lungsod ng San
						Pablo
					</h2>
				</section>
			</article>
		</main>
	)
}
