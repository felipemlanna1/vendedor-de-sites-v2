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

  // Enrich leads with briefing data for sorting/filtering
  const enrichedLeads = useMemo(() => {
    return leads.map(lead => {
      const key = `instagram:${lead.username}`
      const b = briefings[key]
      return {
        ...lead,
        _hasBriefing: b ? 'Sim' : 'Nao',
        _salesScore: b?.sales_score || 0,
        _briefingSummary: b?.summary || ''
      }
    })
  }, [leads, briefings])

  const columns = useMemo(() => [
    { key: '_salesScore', label: 'Briefing', type: 'number', render: (val, row) => {
      if (row._hasBriefing === 'Sim') {
        return <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{val}/10</span>
      }
      return <span className="text-gray-600">—</span>
    }},
    { key: 'classificacao', label: 'Class.' },
    { key: 'score', label: 'Score', type: 'number' },
    { key: 'username', label: 'Username', render: (val) => (
      <span className="text-indigo-400 font-medium">@{val}</span>
    )},
    { key: 'full_name', label: 'Nome' },
    { key: 'especialidade', label: 'Especialidade' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'nicho', label: 'Nicho' },
    { key: 'seguidores', label: 'Seguidores', type: 'number', render: (val, row) => (
      <span className="tabular-nums">{val || row.follower_count || '—'}</span>
    )},
    { key: 'posts', label: 'Posts', type: 'number', render: (val, row) => (
      <span className="tabular-nums">{val || row.media_count || '—'}</span>
    )},
    { key: 'tem_site', label: 'Tem Site', render: (val, row) => {
      const hasSite = val === 'True' || val === 'Sim' || row.has_real_site
      return <span className={hasSite ? 'text-red-400' : 'text-green-400'}>{hasSite ? 'Sim' : 'Não'}</span>
    }},
    { key: 'link_externo', label: 'Link Externo' }
  ], [briefings])

  const filters = useMemo(() => {
    const classifications = [...new Set(enrichedLeads.map(l => l.classificacao).filter(Boolean))].sort()
    const nichos = [...new Set(enrichedLeads.map(l => l.nicho || l.category).filter(Boolean))].sort()
    const cidades = [...new Set(enrichedLeads.map(l => l.cidade).filter(Boolean))].sort()
    const temSite = ['Nao', 'Sim']
    const temBriefing = ['Sim', 'Nao']
    return [
      { key: 'classificacao', label: 'Classificação', options: classifications },
      { key: 'nicho', label: 'Nicho', options: nichos },
      { key: 'cidade', label: 'Cidade', options: cidades },
      { key: 'tem_site', label: 'Tem Site', options: temSite },
      { key: '_hasBriefing', label: 'Briefing', options: temBriefing }
    ]
  }, [enrichedLeads])

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Carregando...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Leads Instagram</h2>
      <LeadTable
        data={enrichedLeads}
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
