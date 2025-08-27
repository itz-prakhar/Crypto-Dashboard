
import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function PriceChart({ prices }) {
  const chartData = useMemo(() => {
    if (!prices) return []
    return prices.map(([ts, price]) => ({
      date: new Date(ts).toLocaleDateString(),
      price: Number(price.toFixed(2)),
    }))
  }, [prices])

  return (
    <div className="bg-white rounded-2xl shadow p-10 h-80">
      <div className="text-lg font-semibold mb-3">Bitcoin Price (Last 30 days)</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} interval={Math.ceil(chartData.length / 8)} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`$${v}`, 'Price']} />
          <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
