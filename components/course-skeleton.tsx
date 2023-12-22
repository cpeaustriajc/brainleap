import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'

export function CourseSkeleton() {
	return (
		<Card className="max-w-sm w-96 h-60">
			<CardHeader className="flex flex-row justify-between items-center">
				<div>
					<CardTitle>Loading...</CardTitle>
					<CardDescription>Loading...</CardDescription>
				</div>
				<div>
					<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
				</div>
			</CardHeader>
			<CardContent className="animate-pulse">
				<div className="h-4 bg-gray-300 rounded w-3/4" />
				<div className="h-3 bg-gray-300 rounded w-1/2 mt-2" />
			</CardContent>
			<CardFooter className="animate-pulse">
				<div className="w-full h-10 rounded-md bg-primary" />
			</CardFooter>
		</Card>
	)
}
