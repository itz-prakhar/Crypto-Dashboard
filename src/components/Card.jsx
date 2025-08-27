
export default function Card({ title, value, hint }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-1">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold tracking-tight">{value ?? '—'}</div>
      {hint ? <div className="text-xs text-gray-400">{hint}</div> : null}
    </div>
  )
}
