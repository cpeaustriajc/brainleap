import AppShell from '@/components/app-shell'
import React from 'react'

type Props = {
	children: React.ReactNode
}

export default function Layout({ children }: Props) {
	return <AppShell>{children}</AppShell>
}
