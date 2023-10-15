'use client'
import { useState, useContext, createContext } from 'react'
import {
	XCircle,
	HomeIcon,
	HelpCircleIcon,
	GraduationCapIcon,
	PencilIcon,
	PhoneCallIcon,
} from 'lucide-react'
import Image from 'next/image'

const SidebarContext = createContext(false)

export function SidebarProvider({ children }) {
	const [open, setOpen] = useState(false)
	return (
		<SidebarContext.Provider value={[open, setOpen]}>
			{children}
		</SidebarContext.Provider>
	)
}

export function useSidebar() {
	const [open, setOpen] = useContext(SidebarContext)
	return [open, setOpen]
}

export default function Sidebar({ activeUser }) {
	const [active, setActive] = useSidebar()

	return (
		<>
			<aside className={`pr-4 side-bar ${active ? 'active' : ''}`}>
				<button id="close-btn" onClick={() => setActive(!active)}>
					<XCircle />
				</button>
				<div className="flex flex-col justify-center items-center">
					<Image
						className="rounded-full"
						src={activeUser.picture}
						alt={`${activeUser.name}'s profile picture`}
					/>
					<p>{activeUser.name}</p>
					<p className="capitalize">{activeUser.role}</p>
				</div>
				<nav className="navbar">
					<ul>
						<li>
							<a href="/home">
								<HomeIcon /> <span>home</span>
							</a>
						</li>
						<li>
							<a href="/about">
								<HelpCircleIcon />
								<span>about</span>
							</a>
						</li>
						<li>
							<a href="/courses">
								<GraduationCapIcon />
								<span>courses</span>
							</a>
						</li>
						<li>
							<a href="/teachers">
								<PencilIcon />
								<span>teachers</span>
							</a>
						</li>
						<li>
							<a href="/contact">
								<PhoneCallIcon />
								<span>contact us</span>
							</a>
						</li>
					</ul>
				</nav>
			</aside>
		</>
	)
}
