import { button } from '@/ui/button'
import { form } from '@/ui/form'
import { input } from '@/ui/input'
import { label } from '@/ui/label'

export default function Page() {
	return (
		<div>
			<form className={form}>
				<label className={label} htmlFor="name">
					Name
				</label>
				<input className={input} type="text" name="name" id="name" />
				<button className={button} type="submit">
					Submit Name
				</button>
			</form>
		</div>
	)
}
