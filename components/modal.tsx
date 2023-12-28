type Props = {
	children: React.ReactNode
}

export function ModalBackground({ children }: Props) {
	return (
		<div className="absolute backdrop-blur w-full h-[100svh] top-0 bg-neutral-800 bg-opacity-5 z-50">
			{children}
		</div>
	)
}
