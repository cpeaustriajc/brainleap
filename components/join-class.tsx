import { DialogContent } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { joinClass } from '@/lib/actions'

export function JoinClassDialog() {
	return (
		<DialogContent>
			<form action={joinClass} className="space-y-8">
				<Label htmlFor="classCode">Class Code</Label>
				<Input
					type="text"
					id="classCode"
					name="classCode"
					placeholder="Class Code"
				/>
				<Button type="submit">Join Class</Button>
			</form>
		</DialogContent>
	)
}
