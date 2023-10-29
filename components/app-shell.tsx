type Props = {
	children: React.ReactNode
}

export default function AppShell({ children }: Props) {
	return <div className="flex flex-col">{children}</div>
}
