import { useState, useEffect, useMemo } from 'react'
import LeadTable from '../components/LeadTable'
import LeadDetailModal from '../components/LeadDetailModal'
import { ExternalLink } from 'lucide-react'

function getGmapsLeadId(row) {
  return `${row.name}|${row.phone || row.address || ''}`
}

export default function GmapsLeads() {
  const [leads, setLeads] = useState([])
  const [briefings, setBriefings] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/gmaps').then(r => r.json()),
      fetch('/api/briefings').then(r => r.json()).catch(() => ({}))
    ]).then(([leadsData, briefingsData]) => {
      setLeads(leadsData)
      setBriefings(briefingsData)
    }).finally(() => setLoading(false))
  }, [])

  const columns = useMemo(() => [
    { key: 'selecionado', label: 'Sel.', render: (val) => (
      val ? <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/30">Selecionado</span>
          : <span className="text-gray-600 text-xs">Cache</span>
    )},
    { key: '_briefing', label: 'Briefing', render: (_, row) => {
      const key = `gmaps:${getGmapsLeadId(row)}`
      return briefings[key]
        ? <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Briefing ✓</span>
        : <span className="text-gray-600">—</span>
    }},
    { key: 'name', label: 'Nome' },
    { key: 'phone', label: 'Telefone', render: (val) => {
      if (!val) return '—'
      const clean = val.replace(/\D/g, '')
      return <span className="text-green-400">{val}</span>
    }},
    { key: 'category', label: 'Categoria' },
    { key: 'rating', label: 'Nota', type: 'number', render: (val) => (
      <span>{val ? `${val} ★` : '—'}</span>
    )},
    { key: 'reviews', label: 'Reviews', type: 'number' },
    { key: 'website_status', label: 'Site' },
    { key: 'address', label: 'Endereco' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'razao_social', label: 'Razao Social' },
    { key: 'google_maps_url', label: 'Maps', type: 'link', render: (val) => {
      if (!val) return '—'
      return (
        <a href={val} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300" onClick={e => e.stopPropagation()}>
          <ExternalLink size={16} />
        </a>
      )
    }}
  ], [briefings])

  const filters = useMemo(() => {
    const statuses = [...new Set(leads.map(l => l.website_status).filter(Boolean))]
    const categories = [...new Set(leads.map(l => l.category).filter(Boolean))].sort()
    return [
      { key: 'selecionado', label: 'Selecionado', options: ['true', 'false'] },
      { key: 'website_status', label: 'Status Site', options: statuses },
      { key: 'category', label: 'Categoria', options: categories.slice(0, 30) }
    ]
  }, [leads])

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Carregando...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Leads Google Maps</h2>
      <LeadTable
        data={leads}
        columns={columns}
        filters={filters}
        onRowClick={setSelectedLead}
      />
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          source="gmaps"
          briefings={briefings}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  )
}
