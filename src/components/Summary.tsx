import { Entry } from '@/types/entry'

export default function Summary({ entries }: { entries: Entry[] }) {
  const income = entries
    .filter((e) => e.type === 'income')
    .reduce((a, b) => a + b.amount, 0)

  const expense = entries
    .filter((e) => e.type === 'expense')
    .reduce((a, b) => a + b.amount, 0)

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-green-100 p-4 rounded-xl">
        <p>Total Income</p>
        <h2 className="text-2xl font-bold text-green-700">Rs {income}</h2>
      </div>

      <div className="bg-red-100 p-4 rounded-xl">
        <p>Total Expense</p>
        <h2 className="text-2xl font-bold text-red-700">Rs {expense}</h2>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl">
        <p>Balance</p>
        <h2 className="text-2xl font-bold text-blue-700">
          Rs {income - expense}
        </h2>
      </div>
    </div>
  )
}