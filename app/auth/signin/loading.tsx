import { Card, CardContent, CardHeader } from '@/ui/card'
import { Skeleton } from '@/ui/skeleton'

export default function Loading() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-7 w-16 rounded bg-gray-300 dark:bg-gray-700" />
				<Skeleton className="h-4 max-w-[366px] rounded bg-gray-300 dark:bg-gray-700" />
			</CardHeader>
			<CardContent className="grid gap-4">
				<Skeleton className="h-10 max-w-[366px]rounded bg-gray-300 dark:bg-gray-700" />
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-card px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				<div className="grid gap-2">
					<Skeleton className="h-4 w-80 rounded bg-gray-300 dark:bg-gray-700" />
					<Skeleton className="h-10 max-w-[366px] rounded bg-gray-300 dark:bg-gray-700" />
					<Skeleton className="h-10 max-w-[366px] rounded bg-gray-300 dark:bg-gray-700" />
				</div>
			</CardContent>
		</Card>
	)
}
