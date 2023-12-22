export function HeaderSkeleton() {
	return (
		<header className="flex flex-row justify-between px-4 py-2">
			<div className="flex items-center gap-4">
				<div className="py-2 w-14 h-10 rounded-full bg-gray-300 animate-pulse"></div>
			</div>
			<div className="flex items-center gap-4">
				<div className="w-10 h-10 rounded bg-gray-300 animate-pulse"></div>
				<div className="w-10 h-10 rounded bg-gray-300 animate-pulse"></div>
				<div className="w-10 h-10 rounded bg-gray-300 animate-pulse"></div>
			</div>
		</header>
	)
}
