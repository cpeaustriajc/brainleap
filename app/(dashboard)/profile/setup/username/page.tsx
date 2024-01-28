import { updateUsername } from '@/lib/actions/profile'
import { button } from '@/ui/button'
import { input } from '@/ui/input'

export default function SetupUsernamePage() {
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
