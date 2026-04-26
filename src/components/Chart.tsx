'use client'
import { Entry } from '@/types/entry'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Chart({ entries }: { entries: Entry[] }) {
  const expenseByCategory: Record<string, number> = {}

  entries
    .filter((e) => e.type === 'expense')
    .forEach((e) => {
      expenseByCategory[e.category] =
        (expenseByCategory[e.category] || 0) + e.amount
    })

  const data = Object.keys(expenseByCategory).map((key) => ({
    category: key,
    amount: expenseByCategory[key],
  }))

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="font-bold mb-4">Spending Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}