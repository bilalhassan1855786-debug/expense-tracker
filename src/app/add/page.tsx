'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { categories } from '@/data/categories'
import { Entry } from '@/types/entry'

export default function AddPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: categories[0],
  })

  const saveEntry = () => {
    const newEntry: Entry = {
      id: Date.now().toString(),
      title: form.title,
      amount: Number(form.amount),
      type: form.type as 'income' | 'expense',
      category: form.category,
      date: new Date().toLocaleDateString(),
    }

    const old = JSON.parse(localStorage.getItem('entries') || '[]')
    localStorage.setItem('entries', JSON.stringify([...old, newEntry]))

    router.push('/')
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Entry</h1>

      <input
        placeholder="Title"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <select
        className="border p-2 w-full mb-6"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button
        onClick={saveEntry}
        className="bg-black text-white px-6 py-2 rounded w-full"
      >
        Save
      </button>
    </main>
  )
}