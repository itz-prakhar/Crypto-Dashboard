
import { useState } from 'react'
import Card from './components/Card.jsx'
import PriceChart from './components/PriceChart.jsx'
import useFetchData from './hooks/useFetchData.js'

export default function App() {

  const [currency, setCurrency] = useState('usd')

  const coinInfoUrl = `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`

  const historyUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=30&interval=daily`

  const { data: info, loading: loadingInfo, error: errorInfo } = useFetchData(coinInfoUrl)

  const { data: history, loading: loadingHist, error: errorHist } = useFetchData(historyUrl)

  const loading = loadingInfo || loadingHist

  const error = errorInfo || errorHist

  // Fallback data for demo purposes
  const fallbackData = {
    price: 45000,
    changePct: 2.5,
    marketCap: 850000000000,
    high24h: 46000,
    low24h: 44000
  }

  const price = info?.market_data?.current_price?.[currency]

  const changePct = info?.market_data?.price_change_percentage_24h

  const marketCap = info?.market_data?.market_cap?.[currency]

  const high24h = info?.market_data?.high_24h?.[currency]

  const low24h = info?.market_data?.low_24h?.[currency]

  const formatMoney = (n) => typeof n === 'number' ? (n >= 1e12 ? `$${(n / 1e12).toFixed(2)}T` : n >= 1e9 ? `$${(n / 1e9).toFixed(2)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${n.toLocaleString()}`) : '—'

  return (

    <div className="min-h-screen bg-gray-100">

      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">

        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Crypto Dashboard</h1>

          <div className="flex items-center gap-3">

            <select className="border rounded-xl px-3 py-2 text-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>

              <option value="usd">USD</option>

              <option value="eur">EUR</option>

              <option value="inr">INR</option>

            </select>


          </div>

        </div>

      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">

        {loading && <div className="text-center text-gray-600 py-10">Loading data…</div>}

        {error && (
          <div className="text-center py-10">
            <div className="text-red-600 mb-4">API Error: {error}</div>
            <div className="text-sm text-gray-500">Showing demo data below</div>
          </div>
        )}

        {(!loading || error) && (

          <div className="flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <Card title="Current Price" value={(price || fallbackData.price) ? (currency === 'inr' ? `₹${(price || fallbackData.price).toLocaleString()}` : `$${(price || fallbackData.price).toLocaleString()}`) : '—'} hint={`Currency: ${currency.toUpperCase()}`} />

              <Card title="24h Change" value={typeof (changePct ?? fallbackData.changePct) === 'number' ? `${(changePct ?? fallbackData.changePct).toFixed(2)}%` : '—'} hint={(changePct ?? fallbackData.changePct) >= 0 ? 'Bullish 24h' : 'Bearish 24h'} />

              <Card title="Market Cap" value={formatMoney(marketCap || fallbackData.marketCap)} />

              <Card title="24h High / Low" value={`${(high24h || fallbackData.high24h) ? (currency === 'inr' ? `₹${(high24h || fallbackData.high24h).toLocaleString()}` : `$${(high24h || fallbackData.high24h).toLocaleString()}`) : '—'} / ${(low24h || fallbackData.low24h) ? (currency === 'inr' ? `₹${(low24h || fallbackData.low24h).toLocaleString()}` : `$${(low24h || fallbackData.low24h).toLocaleString()}`) : '—'}`} />

            </div>

            <PriceChart prices={history?.prices ?? []} />

            <div className="text-xs text-gray-500">Last updated: {new Date(info?.market_data?.last_updated || Date.now()).toLocaleString()}</div>

          </div>

        )}

      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 text-center font-bold text-gray-400 text-xl">Made with ❤ by Prakhar Gupta</footer>

    </div>

  )

}
