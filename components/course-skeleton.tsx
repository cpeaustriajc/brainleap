import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card'

export function CourseSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Loading...</CardTitle>
				<CardDescription>Loading...</CardDescription>
			</CardHeader>
			<CardContent className="animate-pulse">
				<div className="h-4 bg-gray-300 rounded w-3/4" />
				<div className="h-3 bg-gray-300 rounded w-1/2 mt-2" />
				<div className="h-3 bg-gray-300 rounded w-2/3 mt-2" />
			</CardContent>
		</Card>
	)
}
