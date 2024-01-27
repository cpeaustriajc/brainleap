import { Card, CardContent, CardHeader } from '@/ui/card'
import { Skeleton } from '@/ui/skeleton'

export default function Loading() {
	return (
		<Card>
			<CardHeader>
				<Skeleton   />
				<Skeleton   />
			</CardHeader>
			<CardContent  >
				<Skeleton   />
				<div  >
					<div  >
						<span   />
					</div>
					<div  >
						<span  >
							Or continue with
						</span>
					</div>
				</div>
				<div  >
					<Skeleton   />
					<Skeleton   />
					<Skeleton   />
				</div>
			</CardContent>
		</Card>
	)
}
