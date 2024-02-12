import { getUser } from '@/lib/queries/user'
import Link from 'next/link'
import React from 'react'

export const navigation = [
  {
    name: 'Features',
    href: '#',
  },
  {
    name: 'Blog',
    href: '#',
  },
  {
    name: 'Source Code',
    href: '#',
  },
  {
    name: 'About',
    href: '#',
  },
]

export async function Header() {
  const user = await getUser()

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <h1 className="text-xl">
            <Link href="/">🧠</Link>
          </h1>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Link
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 border border-gray-300"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 border border-gray-300"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
