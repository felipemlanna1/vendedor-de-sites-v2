import { useState, useEffect } from 'react'
import { Instagram, MapPin, Users, Flame, FileText } from 'lucide-react'
import StatsCards from '../components/StatsCards'
import { SimpleBarChart, SimplePieChart } from '../components/Charts'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Carregando...</div>
  }

  if (!stats) {
    return <div className="text-red-400">Erro ao carregar dados</div>
  }

  const { totals, instagram, gmaps } = stats

  const cards = [
    { label: 'Total de Leads', value: totals.total, icon: <Users size={20} />, sub: 'Todas as fontes' },
    { label: 'Instagram', value: totals.instagram, icon: <Instagram size={20} />, sub: 'Leads de perfis' },
    { label: 'Google Maps', value: totals.gmaps, icon: <MapPin size={20} />, sub: 'Negocios locais' },
    {
      label: 'Leads Quentes',
      value: instagram.byClassification?.QUENTE || 0,
      icon: <Flame size={20} />,
      sub: 'Instagram score alto'
    },
    {
      label: 'Briefings',
      value: totals.briefings || 0,
      icon: <FileText size={20} />,
      sub: 'Pesquisas realizadas'
    }
  ]

  const classificationData = Object.entries(instagram.byClassification || {}).map(([name, value]) => ({ name, value }))

  const statusData = Object.entries(gmaps.byWebsiteStatus || {}).map(([name, value]) => ({ name, value }))

  const topCategories = Object.entries(gmaps.byCategory || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }))

  const nicheData = Object.entries(instagram.byNiche || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }))

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <StatsCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SimplePieChart title="Instagram - Classificação" data={classificationData} />
        <SimplePieChart title="Google Maps - Status do Site" data={statusData} />
        <SimpleBarChart title="Google Maps - Top Categorias" data={topCategories} />
        <SimpleBarChart title="Instagram - Leads por Nicho" data={nicheData} />
      </div>
    </div>
  )
}
