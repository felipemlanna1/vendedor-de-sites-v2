import { useState, useEffect, useMemo } from 'react'
import LeadTable from '../components/LeadTable'
import LeadDetailModal from '../components/LeadDetailModal'

export default function InstagramLeads() {
  const [leads, setLeads] = useState([])
  const [briefings, setBriefings] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/instagram').then(r => r.json()),
      fetch('/api/briefings').then(r => r.json()).catch(() => ({}))
    ]).then(([leadsData, briefingsData]) => {
      setLeads(leadsData)
      setBriefings(briefingsData)
    }).finally(() => setLoading(false))
  }, [])

  const columns = useMemo(() => [
    { key: '_briefing', label: 'Briefing', render: (_, row) => {
      const key = `instagram:${row.username}`
      return briefings[key]
        ? <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Briefing ✓</span>
        : <span className="text-gray-600">—</span>
    }},
    { key: 'classificacao', label: 'Class.' },
    { key: 'score', label: 'Score', type: 'number' },
    { key: 'username', label: 'Username', render: (val) => (
      <span className="text-indigo-400 font-medium">@{val}</span>
    )},
    { key: 'full_name', label: 'Nome' },
    { key: 'nicho', label: 'Nicho' },
    { key: 'follower_count', label: 'Seguidores', type: 'number' },
    { key: 'media_count', label: 'Posts', type: 'number' },
    { key: 'has_real_site', label: 'Tem Site', render: (val) => (
      <span className={val ? 'text-red-400' : 'text-green-400'}>{val ? 'Sim' : 'Nao'}</span>
    )},
    { key: 'account_type', label: 'Tipo' },
    { key: 'motivos', label: 'Motivos' }
  ], [briefings])

  const filters = useMemo(() => {
    const classifications = [...new Set(leads.map(l => l.classificacao).filter(Boolean))]
    const nichos = [...new Set(leads.map(l => l.nicho || l.category).filter(Boolean))]
    return [
      { key: 'classificacao', label: 'Classificacao', options: classifications },
      { key: 'nicho', label: 'Nicho', options: nichos }
    ]
  }, [leads])

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Carregando...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Leads Instagram</h2>
      <LeadTable
        data={leads}
        columns={columns}
        filters={filters}
        onRowClick={setSelectedLead}
      />
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          source="instagram"
          briefings={briefings}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  )
}
