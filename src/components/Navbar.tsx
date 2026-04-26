'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition ${
      pathname === path
        ? 'bg-black text-white'
        : 'text-gray-700 hover:bg-gray-200'
    }`

  return (
    <nav className="w-full bg-white shadow-md px-10 py-4 flex justify-between items-center">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold">Expense Tracker</h1>

      {/* Links */}
      <div className="flex gap-4">
        <Link href="/" className={linkClass('/')}>
          Dashboard
        </Link>

        <Link href="/add" className={linkClass('/add')}>
          Add Entry
        </Link>
      </div>
    </nav>
  )
}