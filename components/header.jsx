'use client'

import { useSidebar } from './sidebar'
import { MenuIcon, UserIcon, MoonIcon, SunIcon } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
	const [open, setOpen] = useSidebar()
	return (
		<header className="header">
			<div className="flex">
				<Link href="/">PLSP</Link>
				<search className="search-form">
					<input type="search" id="query" placeholder="Search" />
				</search>
				<div className="icons flex flex-row">
					<button id="menu-btn" onClick={() => setOpen(!open)}>
						<MenuIcon />
					</button>
					<Link id="user-btn" href="/profile">
						<UserIcon />
					</Link>
					<button id="toggle-btn">
						<MoonIcon />
					</button>
				</div>
			</div>
		</header>
	)
}
