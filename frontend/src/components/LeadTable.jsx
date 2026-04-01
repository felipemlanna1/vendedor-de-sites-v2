import { useState, useMemo } from 'react'
import { Search, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react'

function classificationBadge(cls) {
  const colors = {
    QUENTE: 'bg-red-500/20 text-red-400 border-red-500/30',
    MORNO: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    FRIO: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }
  return colors[cls?.toUpperCase()] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

function websiteStatusBadge(status) {
  const colors = {
    no_url: 'bg-green-500/20 text-green-400',
    social_only: 'bg-yellow-500/20 text-yellow-400',
    dead: 'bg-red-500/20 text-red-400',
    good_website: 'bg-blue-500/20 text-blue-400'
  }
  const labels = {
    no_url: 'Sem site',
    social_only: 'Só rede social',
    dead: 'Site morto',
    good_website: 'Tem site'
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-600 text-gray-300'}`}>
      {labels[status] || status || '—'}
    </span>
  )
}

export default function LeadTable({ data, columns, filters = [], onRowClick }) {
  const [search, setSearch] = useState('')
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [filterValues, setFilterValues] = useState({})
  const [page, setPage] = useState(0)
  const perPage = 25

  const filtered = useMemo(() => {
    let result = data

    // Text search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        columns.some(col => String(row[col.key] || '').toLowerCase().includes(q))
      )
    }

    // Filters
    for (const [key, val] of Object.entries(filterValues)) {
      if (val && val !== '__all__') {
        result = result.filter(row => String(row[key] || '').toUpperCase() === val.toUpperCase())
      }
    }

    // Sort
    if (sortCol) {
      result = [...result].sort((a, b) => {
        const va = a[sortCol] ?? ''
        const vb = b[sortCol] ?? ''
        const na = Number(va)
        const nb = Number(vb)
        if (!isNaN(na) && !isNaN(nb)) {
          return sortDir === 'asc' ? na - nb : nb - na
        }
        return sortDir === 'asc'
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va))
      })
    }

    return result
  }, [data, search, sortCol, sortDir, filterValues, columns])

  const totalPages = Math.ceil(filtered.length / perPage)
  const pageData = filtered.slice(page * perPage, (page + 1) * perPage)

  function handleSort(key) {
    if (sortCol === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortCol(key)
      setSortDir('asc')
    }
  }

  function renderCell(row, col) {
    const val = row[col.key]
    if (col.render) return col.render(val, row)
    if (col.key === 'classificacao') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${classificationBadge(val)}`}>
          {val || '—'}
        </span>
      )
    }
    if (col.key === 'website_status') return websiteStatusBadge(val)
    if (col.type === 'link' && val) {
      const url = val.startsWith('http') ? val : `https://${val}`
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">
          <span className="truncate max-w-[200px]">{val}</span>
          <ExternalLink size={12} />
        </a>
      )
    }
    if (col.type === 'number') return <span className="tabular-nums">{val ?? '—'}</span>
    return <span className="truncate max-w-[250px] block">{val || '—'}</span>
  }

  return (
    <div>
      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {filters.map(f => (
          <select
            key={f.key}
            value={filterValues[f.key] || '__all__'}
            onChange={e => { setFilterValues(v => ({ ...v, [f.key]: e.target.value })); setPage(0) }}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="__all__">{f.label}: Todos</option>
            {f.options.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Count */}
      <div className="text-sm text-gray-400 mb-2">
        {filtered.length} leads encontrados
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-gray-300 font-medium cursor-pointer hover:text-white select-none whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortCol === col.key && (
                      sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={`border-t border-gray-700/50 hover:bg-gray-800/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    {renderCell(row, col)}
                  </td>
                ))}
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  Nenhum lead encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-400">
            Página {page + 1} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-700 transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-700 transition-colors"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
