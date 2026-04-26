'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Entry } from '@/types/entry'
import { categories } from '@/data/categories'
import Navbar from '@/components/Navbar'   // ✅ ADD

export default function EditPage() {
  const router = useRouter()
  const params = useParams()

  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : ''

  const [form, setForm] = useState<Entry>({
    id: '',
    title: '',
    amount: 0,
    category: '',
    type: 'expense',
    date: '',
  })

  useEffect(() => {
    if (!id) return

    const data: Entry[] = JSON.parse(
      localStorage.getItem('entries') || '[]'
    )

    const found = data.find((e) => e.id === id)

    if (found) setForm(found)
  }, [id])

  const save = () => {
    const all: Entry[] = JSON.parse(
      localStorage.getItem('entries') || '[]'
    )

    const updated = all.map((e) =>
      e.id === id ? form : e
    )

    localStorage.setItem('entries', JSON.stringify(updated))
    router.push('/')
  }

  return (
    <>
      {/* ✅ NAVBAR */}
      <Navbar />

      <main className="p-10 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Entry</h1>

        <input
          className="border p-2 w-full mb-3"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="number"
          className="border p-2 w-full mb-3"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: Number(e.target.value) })
          }
        />

        <select
          className="border p-2 w-full mb-3"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={save}
          className="bg-black text-white px-6 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </main>
    </>
  )
}