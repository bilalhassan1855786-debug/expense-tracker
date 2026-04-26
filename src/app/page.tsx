'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Entry } from '@/types/entry'
import EntryCard from '../components/EntryCard'
import Summary from '../components/Summary'
import Chart from '../components/Chart'
import Navbar from '@/components/Navbar'

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [month, setMonth] = useState('')

  useEffect(() => {
    const data = localStorage.getItem('entries')
    if (data) setEntries(JSON.parse(data))
  }, [])

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id)
    setEntries(updated)
    localStorage.setItem('entries', JSON.stringify(updated))
  }

  const filtered = month
    ? entries.filter((e) =>
        new Date(e.date).getMonth() === Number(month)
      )
    : entries

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Smart Expense Tracker</h1>
        <Link href="/add" className="bg-black text-white px-4 py-2 rounded">
          Add Entry
        </Link>
      </div>

      {/* Month Filter */}
      <select
        className="border p-2 mb-6"
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">All Months</option>
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i}>
            Month {i + 1}
          </option>
        ))}
      </select>

      <Summary entries={filtered} />
      <Chart entries={filtered} />

      <div className="space-y-4">
        {filtered.map((e) => (
          <EntryCard key={e.id} entry={e} onDelete={deleteEntry} />
        ))}
      </div>
    </main>
  )
}