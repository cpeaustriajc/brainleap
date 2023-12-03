import { Button } from './ui/button'
import { Popover, PopoverTrigger } from './ui/popover'

export function DatePicker() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline"></Button>
			</PopoverTrigger>
		</Popover>
	)
}
