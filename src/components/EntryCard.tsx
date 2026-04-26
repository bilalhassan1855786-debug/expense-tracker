'use client'
import Link from 'next/link'
import { Entry } from '@/types/entry'

export default function EntryCard({
  entry,
  onDelete,
}: {
  entry: Entry
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{entry.title}</h3>
        <p className="text-sm text-gray-500">
          {entry.category} • {entry.date}
        </p>
      </div>

      <div className="text-right">
        <p
          className={`font-bold ${
            entry.type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          Rs {entry.amount}
        </p>

        <div className="flex gap-3 justify-end mt-2">
          <Link
            href={`/edit/${entry.id}`}
            className="text-xs text-blue-600"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(entry.id)}
            className="text-xs text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}