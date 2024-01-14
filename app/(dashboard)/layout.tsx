import { AIPrompt } from '@/components/ai-prompt'
import AppShell from '@/components/app-shell'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AppShell>
			{children}
			<AIPrompt />
		</AppShell>
	)
}
