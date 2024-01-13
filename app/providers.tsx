'use client'

import { useRouter } from "next/navigation"
import * as ReactAria from "react-aria-components"

type Props = {
	children: React.ReactNode
}

export function Providers({ children }: Props) {
	const router = useRouter()
	return <ReactAria.RouterProvider navigate={router.push}>{children}</ReactAria.RouterProvider>
}
