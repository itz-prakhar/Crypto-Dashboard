
import { useEffect, useState } from 'react'

export default function useFetchData(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(url, { signal, headers: { accept: 'application/json' } })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    run()
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
