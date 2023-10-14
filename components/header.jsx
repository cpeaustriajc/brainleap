'use client';

import { useSidebar } from "./sidebar";

export default function Header() {
    const [open, setOpen] = useSidebar()
    return (
        <header className="header">
            <div className="flex">
                <search className="search-form">
                    <input type="search" id="query" placeholder="Search" />
                </search>
            </div>
            <div>
                <button onClick={() => setOpen(!open)}>
                    open sidebar
                </button>
            </div>
        </header>
    )
}
