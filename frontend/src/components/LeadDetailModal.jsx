import { useState, useEffect } from 'react'
import { X, Copy, Check, RefreshCw, Instagram, MapPin, Globe, Phone, Mail, Building2, FileText, Users, ShoppingBag, Palette, History, Swords, Star, Image, ExternalLink, UtensilsCrossed, MessageSquare, Monitor, Rocket, Code } from 'lucide-react'

const CATEGORY_ICONS = {
  identity: Building2,
  professional_registry: FileText,
  web_presence: Globe,
  social_media: Users,
  sales_channels: ShoppingBag,
  brand: Palette,
  history: History,
  competitors: Swords,
  images: Image,
  contact: Phone,
  reputation: Star,
  menu: UtensilsCrossed,
  reviews: MessageSquare,
}

const CATEGORY_LABELS = {
  identity: 'Identidade',
  professional_registry: 'Registro Profissional',
  web_presence: 'Presenca Web',
  social_media: 'Redes Sociais',
  sales_channels: 'Canais de Venda',
  brand: 'Marca',
  history: 'Historia',
  competitors: 'Concorrentes',
  images: 'Imagens',
  contact: 'Contato',
  reputation: 'Reputacao',
  menu: 'Cardapio / Servicos',
  reviews: 'Avaliacoes',
}

function SourceBadge({ type }) {
  if (type === 'scraping') {
    return (
      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-600/40 text-gray-400 border border-gray-600/30">
        captura
      </span>
    )
  }
  return (
    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
      briefing
    </span>
  )
}

function ScoreBadge({ score }) {
  const color = score >= 7
    ? 'bg-green-500/20 text-green-400 border-green-500/30'
    : score >= 4
      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      : 'bg-red-500/20 text-red-400 border-red-500/30'
  return (
    <span className={`px-2 py-1 rounded-full text-sm font-bold border ${color}`}>
      {score}/10
    </span>
  )
}

function DataField({ label, value, link }) {
  if (!value && value !== 0) return null
  return (
    <div className="py-2">
      <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-0.5">{label}</div>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
          {String(value)} <ExternalLink size={11} />
        </a>
      ) : (
        <div className="text-gray-100 text-sm break-words">{String(value)}</div>
      )}
    </div>
  )
}

// --- Instagram lead fields ---
function InstagramFields({ lead }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
      <DataField label="Username" value={lead.username ? `@${lead.username}` : null} link={lead.username ? `https://instagram.com/${lead.username}` : null} />
      <DataField label="Nome" value={lead.full_name} />
      <DataField label="Nicho" value={lead.nicho} />
      <DataField label="Classificacao" value={lead.classificacao} />
      <DataField label="Score" value={lead.score} />
      <DataField label="Seguidores" value={lead.follower_count?.toLocaleString()} />
      <DataField label="Seguindo" value={lead.following_count?.toLocaleString()} />
      <DataField label="Posts" value={lead.media_count?.toLocaleString()} />
      <DataField label="Tipo de conta" value={lead.account_type} />
      <DataField label="Categoria" value={lead.category} />
      <DataField label="Tem site real" value={lead.has_real_site ? 'Sim' : 'Nao'} />
      <DataField label="URL externa" value={lead.external_url} link={lead.external_url?.startsWith('http') ? lead.external_url : null} />
      <DataField label="Email" value={lead.public_email} />
      <DataField label="Telefone" value={lead.contact_phone} link={lead.contact_phone ? `https://wa.me/${lead.contact_phone.replace(/\D/g, '')}` : null} />
      <div className="col-span-2">
        <DataField label="Bio" value={lead.bio} />
      </div>
      <div className="col-span-2">
        <DataField label="Motivos" value={lead.motivos} />
      </div>
      {lead.profile_pic_url && (
        <div className="col-span-2 py-2">
          <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">Foto de perfil</div>
          <img src={lead.profile_pic_url} alt="profile" className="w-16 h-16 rounded-full object-cover border border-gray-700" />
        </div>
      )}
    </div>
  )
}

// --- GMaps lead fields ---
function GmapsFields({ lead }) {
  const cleanPhone = lead.phone?.replace(/\D/g, '')
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
      <DataField label="Nome" value={lead.name} />
      <DataField label="Categoria" value={lead.category} />
      <DataField label="Telefone" value={lead.phone} link={cleanPhone ? `https://wa.me/55${cleanPhone}` : null} />
      <DataField label="Nota" value={lead.rating ? `${lead.rating} ★` : null} />
      <DataField label="Reviews" value={lead.reviews} />
      <DataField label="Status do site" value={lead.website_status} />
      <DataField label="Website" value={lead.website} link={lead.website?.startsWith('http') ? lead.website : (lead.website ? `https://${lead.website}` : null)} />
      <DataField label="CNPJ" value={lead.cnpj} />
      <DataField label="Razao Social" value={lead.razao_social} />
      <DataField label="Data Abertura" value={lead.data_abertura} />
      <DataField label="Porte" value={lead.porte} />
      <DataField label="Idade (meses)" value={lead.idade_meses} />
      <div className="col-span-2">
        <DataField label="Endereco" value={lead.address} />
      </div>
      <DataField label="Google Maps" value="Abrir no Maps" link={lead.google_maps_url} />
    </div>
  )
}

// --- Briefing data points grouped by category ---
function BriefingContent({ briefing }) {
  const dataPoints = briefing.data_points || []

  // Group by category
  const grouped = {}
  for (const dp of dataPoints) {
    const cat = dp.category || 'other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(dp)
  }

  const categoryOrder = ['identity', 'professional_registry', 'web_presence', 'social_media', 'images', 'sales_channels', 'menu', 'reviews', 'contact', 'reputation', 'brand', 'history', 'competitors']
  const sortedCategories = [...new Set([...categoryOrder.filter(c => grouped[c]), ...Object.keys(grouped)])]

  return (
    <div className="space-y-4">
      {/* Summary */}
      {briefing.summary && (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-indigo-400 font-medium uppercase tracking-wide">Resumo de vendas</span>
            {briefing.sales_score != null && <ScoreBadge score={briefing.sales_score} />}
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">{briefing.summary}</p>
        </div>
      )}

      {/* Data points by category */}
      {sortedCategories.map(cat => {
        const Icon = CATEGORY_ICONS[cat] || FileText
        const points = grouped[cat]
        return (
          <div key={cat} className="border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-gray-800/50 flex items-center gap-2">
              <Icon size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-300">{CATEGORY_LABELS[cat] || cat}</span>
            </div>
            <div className="px-4 py-2 divide-y divide-gray-800/50">
              {points.map((dp, i) => (
                <div key={i} className="py-2.5 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-gray-500 mb-0.5">{dp.label}</div>
                    {dp.category === 'images' && dp.detail?.urls ? (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {dp.detail.urls.map((url, j) => (
                          <a key={j} href={url} target="_blank" rel="noopener noreferrer">
                            <img src={url} alt="" className="w-20 h-20 rounded-lg object-cover border border-gray-700 hover:border-indigo-500 transition-colors" />
                          </a>
                        ))}
                      </div>
                    ) : dp.category === 'images' && dp.value?.startsWith('http') ? (
                      <a href={dp.value} target="_blank" rel="noopener noreferrer">
                        <img src={dp.value} alt="" className="w-20 h-20 rounded-lg object-cover border border-gray-700 hover:border-indigo-500 transition-colors mt-1" />
                      </a>
                    ) : dp.category === 'menu' && dp.detail?.items ? (
                      <div className="mt-1 space-y-1">
                        {dp.detail.items.map((item, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            {item.image && (
                              <img src={item.image} alt="" className="w-10 h-10 rounded object-cover border border-gray-700 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <span className="text-gray-200">{item.name}</span>
                              {item.description && <span className="text-gray-500 text-xs ml-1">— {item.description}</span>}
                            </div>
                            {item.price && <span className="text-emerald-400 font-medium whitespace-nowrap">{item.price}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-100 text-sm break-words">{dp.value || '—'}</div>
                    )}
                    {dp.source_name && (
                      <div className="text-[10px] text-gray-600 mt-0.5">via {dp.source_name}</div>
                    )}
                  </div>
                  <SourceBadge type={dp.source_type} />
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {briefing.generated_at && (
        <div className="text-[11px] text-gray-600 text-right">
          Gerado em {new Date(briefing.generated_at).toLocaleString('pt-BR')}
        </div>
      )}
    </div>
  )
}

export default function LeadDetailModal({ lead, source, briefings, onClose }) {
  const [tab, setTab] = useState('captura')
  const [briefing, setBriefing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedSite, setCopiedSite] = useState(false)
  const [siteStatus, setSiteStatus] = useState(null)

  const leadId = source === 'instagram'
    ? lead.username
    : `${lead.name}|${lead.phone || lead.address || ''}`

  const hasBriefing = briefings?.[`${source}:${leadId}`]

  useEffect(() => {
    if (hasBriefing) {
      setLoading(true)
      fetch(`/api/briefings/${source}/${encodeURIComponent(leadId)}`)
        .then(r => r.json())
        .then(data => {
          setBriefing(data.briefing_json || null)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [source, leadId, hasBriefing])

  // Fetch site status
  useEffect(() => {
    fetch(`/api/site-status/${source}/${encodeURIComponent(leadId)}`)
      .then(r => r.json())
      .then(setSiteStatus)
      .catch(() => setSiteStatus(null))
  }, [source, leadId])

  // Auto-switch to briefing tab if briefing exists, or site tab if site exists
  useEffect(() => {
    if (siteStatus?.hasSite) setTab('site')
    else if (hasBriefing && briefing) setTab('briefing')
  }, [hasBriefing, briefing, siteStatus])

  function buildSiteCommand() {
    const briefingId = siteStatus?.briefingId
    if (briefingId) return `/build-site --id ${briefingId}`
    return `/build-site --id "${leadId}" --source "${source}"`
  }

  function handleCopySite() {
    navigator.clipboard.writeText(buildSiteCommand())
    setCopiedSite(true)
    setTimeout(() => setCopiedSite(false), 2000)
  }

  function buildCommand() {
    const name = source === 'instagram' ? (lead.full_name || lead.username) : lead.name
    const city = lead.lead_city || lead.city || ''
    const niche = lead.nicho || lead.category || ''
    const phone = lead.contact_phone || lead.phone || ''
    const website = lead.external_url || lead.website || ''
    const ig = source === 'instagram' ? lead.username : ''

    let cmd = `/enrich-lead --nome "${name}" --cidade "${city}" --nicho "${niche}" --source "${source}" --id "${leadId}"`
    if (phone) cmd += ` --telefone "${phone}"`
    if (website) cmd += ` --website "${website}"`
    if (ig) cmd += ` --instagram "${ig}"`
    return cmd
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildCommand())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-100">
              {source === 'instagram' ? (lead.full_name || `@${lead.username}`) : lead.name}
            </h2>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              source === 'instagram'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {source === 'instagram' ? <span className="flex items-center gap-1"><Instagram size={10} /> Instagram</span> : <span className="flex items-center gap-1"><MapPin size={10} /> Google Maps</span>}
            </span>
            {hasBriefing && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Briefing
              </span>
            )}
            {siteStatus?.hasSite && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Site
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700/50 px-6">
          <button
            onClick={() => setTab('captura')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === 'captura'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            Dados da Captura
          </button>
          <button
            onClick={() => setTab('briefing')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === 'briefing'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            Briefing
          </button>
          <button
            onClick={() => setTab('site')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === 'site'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            <Monitor size={14} />
            Site
            {siteStatus?.hasSite && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {tab === 'captura' && (
            source === 'instagram' ? <InstagramFields lead={lead} /> : <GmapsFields lead={lead} />
          )}

          {tab === 'site' && (
            siteStatus?.hasSite ? (
              <div className="space-y-4">
                {/* Live preview */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-sm text-emerald-400 font-medium">Site no ar</span>
                  </div>
                  <a
                    href={siteStatus.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-medium text-white transition-colors"
                  >
                    <ExternalLink size={12} />
                    Abrir em nova aba
                  </a>
                </div>
                <div className="border border-gray-700 rounded-xl overflow-hidden bg-white">
                  <iframe
                    src={siteStatus.siteUrl}
                    className="w-full h-[500px]"
                    title="Preview do site"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>URL: <a href={siteStatus.siteUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">{siteStatus.siteUrl}</a></span>
                  <span>|</span>
                  <span>Pasta: sites/{siteStatus.siteDirName}/</span>
                </div>
                {/* Rebuild command */}
                <div className="pt-3 border-t border-gray-700/50">
                  <button
                    onClick={handleCopySite}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
                  >
                    {copiedSite ? <Check size={14} className="text-green-400" /> : <RefreshCw size={14} />}
                    {copiedSite ? 'Comando copiado!' : 'Reconstruir Site'}
                  </button>
                </div>
              </div>
            ) : hasBriefing ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Rocket size={28} className="text-indigo-400" />
                </div>
                <h3 className="text-gray-200 font-medium mb-1">Pronto para gerar o site</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm">
                  O briefing ja esta completo. Copie o comando abaixo e cole no terminal do Claude Code para gerar o site React premium.
                </p>
                <button
                  onClick={handleCopySite}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium text-white transition-colors"
                >
                  {copiedSite ? <Check size={16} /> : <Code size={16} />}
                  {copiedSite ? 'Comando copiado!' : 'Gerar Site'}
                </button>
                <div className="mt-3 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg max-w-full overflow-x-auto">
                  <code className="text-[11px] text-gray-500 whitespace-nowrap">{buildSiteCommand()}</code>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                  <FileText size={28} className="text-gray-600" />
                </div>
                <h3 className="text-gray-400 font-medium mb-1">Briefing necessario</h3>
                <p className="text-gray-600 text-sm max-w-sm">
                  Para gerar o site, primeiro faca o briefing deste lead na aba "Briefing".
                </p>
              </div>
            )
          )}

          {tab === 'briefing' && (
            loading ? (
              <div className="flex items-center justify-center py-12 text-gray-500">
                <RefreshCw size={20} className="animate-spin mr-2" /> Carregando briefing...
              </div>
            ) : briefing ? (
              <div>
                <BriefingContent briefing={briefing} />
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <RefreshCw size={14} />}
                    {copied ? 'Comando copiado!' : 'Atualizar Briefing'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                  <FileText size={28} className="text-indigo-400" />
                </div>
                <h3 className="text-gray-200 font-medium mb-1">Nenhum briefing ainda</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm">
                  Clique no botao abaixo para copiar o comando e cole no terminal do Claude Code para iniciar a pesquisa.
                </p>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium text-white transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Comando copiado!' : 'Fazer Briefing'}
                </button>
                <div className="mt-3 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg max-w-full overflow-x-auto">
                  <code className="text-[11px] text-gray-500 whitespace-nowrap">{buildCommand()}</code>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
