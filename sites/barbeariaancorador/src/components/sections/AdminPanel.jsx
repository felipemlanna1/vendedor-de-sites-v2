import { useState } from 'react'
import { saveContent } from '../../data/content'

function Field({ label, value, onChange, multiline = false }) {
  const base = 'w-full bg-[#1a1a1a] border border-[#333] text-[#f5f0e8] px-4 py-3 rounded focus:border-[#C8A45C] focus:outline-none transition-colors'
  return (
    <div className="mb-4">
      <label className="block text-sm text-[#A0977D] mb-1 font-medium">{label}</label>
      {multiline ? (
        <textarea
          className={`${base} min-h-[100px] resize-y`}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          className={base}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

function ServiceEditor({ items, onChange }) {
  const update = (idx, key, val) => {
    const next = [...items]
    next[idx] = { ...next[idx], [key]: key === 'price' ? Number(val) || 0 : val }
    onChange(next)
  }
  const add = () => onChange([...items, { name: '', price: 0, description: '' }])
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="bg-[#1a1a1a] border border-[#333] rounded p-4">
          <div className="flex gap-3 mb-2">
            <input
              className="flex-1 bg-[#0a0a0a] border border-[#333] text-[#f5f0e8] px-3 py-2 rounded focus:border-[#C8A45C] focus:outline-none"
              placeholder="Nome do serviço"
              value={item.name}
              onChange={e => update(i, 'name', e.target.value)}
            />
            <input
              className="w-24 bg-[#0a0a0a] border border-[#333] text-[#C8A45C] px-3 py-2 rounded focus:border-[#C8A45C] focus:outline-none text-right"
              type="number"
              placeholder="R$"
              value={item.price}
              onChange={e => update(i, 'price', e.target.value)}
            />
            <button
              onClick={() => remove(i)}
              className="text-red-500 hover:text-red-400 px-2"
            >✕</button>
          </div>
          <input
            className="w-full bg-[#0a0a0a] border border-[#333] text-[#a0977d] px-3 py-2 rounded text-sm focus:border-[#C8A45C] focus:outline-none"
            placeholder="Descrição"
            value={item.description}
            onChange={e => update(i, 'description', e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-[#333] text-[#A0977D] py-3 rounded hover:border-[#C8A45C] hover:text-[#C8A45C] transition-colors"
      >+ Adicionar serviço</button>
    </div>
  )
}

function SectionCard({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-[#2a2520] rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#141414] hover:bg-[#1a1a1a] transition-colors"
      >
        <span className="font-['Cinzel',serif] text-[#C8A45C] tracking-wider">{title}</span>
        <span className="text-[#C8A45C] text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="p-6 bg-[#0e0e0e]">{children}</div>}
    </div>
  )
}

export default function AdminPanel({ content: initial }) {
  const [data, setData] = useState(JSON.parse(JSON.stringify(initial)))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  const set = (path, value) => {
    const next = JSON.parse(JSON.stringify(data))
    const keys = path.split('.')
    let obj = next
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
    obj[keys[keys.length - 1]] = value
    setData(next)
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(false)
    const ok = await saveContent(data)
    setSaving(false)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#2a2520] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-['Cinzel',serif] text-[#C8A45C] text-xl tracking-widest">ANCORADOR</h1>
            <p className="text-xs text-[#666] mt-1">Painel de Administração</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-green-400 text-sm">Salvo!</span>}
            {error && <span className="text-red-400 text-sm">Erro ao salvar</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C8A45C] text-[#0a0a0a] px-6 py-2 rounded font-medium hover:bg-[#D4B876] disabled:opacity-50 transition-colors"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <a href="/" className="text-[#A0977D] hover:text-[#C8A45C] text-sm transition-colors">
              ← Ver site
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">

        <SectionCard title="NEGÓCIO" defaultOpen={true}>
          <Field label="Nome" value={data.business.name} onChange={v => set('business.name', v)} />
          <Field label="Tagline" value={data.business.tagline} onChange={v => set('business.tagline', v)} />
          <Field label="Slogan" value={data.business.slogan} onChange={v => set('business.slogan', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Telefone" value={data.business.phone} onChange={v => set('business.phone', v)} />
            <Field label="WhatsApp (só números)" value={data.business.whatsapp} onChange={v => set('business.whatsapp', v)} />
          </div>
          <Field label="E-mail" value={data.business.email} onChange={v => set('business.email', v)} />
          <Field label="Endereço" value={data.business.address} onChange={v => set('business.address', v)} />
          <div className="grid grid-cols-3 gap-4">
            <Field label="Bairro" value={data.business.neighborhood} onChange={v => set('business.neighborhood', v)} />
            <Field label="Cidade" value={data.business.city} onChange={v => set('business.city', v)} />
            <Field label="Estado" value={data.business.state} onChange={v => set('business.state', v)} />
          </div>
          <Field label="Link de agendamento" value={data.business.booking_url} onChange={v => set('business.booking_url', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Instagram da barbearia" value={data.business.instagram} onChange={v => set('business.instagram', v)} />
            <Field label="Instagram do dono" value={data.business.instagram_owner} onChange={v => set('business.instagram_owner', v)} />
          </div>
        </SectionCard>

        <SectionCard title="HERO">
          <Field label="Título principal" value={data.hero.title} onChange={v => set('hero.title', v)} />
          <Field label="Subtítulo" value={data.hero.subtitle} onChange={v => set('hero.subtitle', v)} />
          <Field label="Texto do botão" value={data.hero.cta_text} onChange={v => set('hero.cta_text', v)} />
          <Field label="Link do botão" value={data.hero.cta_url} onChange={v => set('hero.cta_url', v)} />
        </SectionCard>

        <SectionCard title="SOBRE (Nossa Viagem)">
          <Field label="Título da seção" value={data.about.title} onChange={v => set('about.title', v)} />
          <Field label="Parágrafo 1" value={data.about.text} onChange={v => set('about.text', v)} multiline />
          <Field label="Parágrafo 2" value={data.about.text2} onChange={v => set('about.text2', v)} multiline />
          <Field label="Parágrafo 3" value={data.about.text3} onChange={v => set('about.text3', v)} multiline />
          <Field label="Citação" value={data.about.quote} onChange={v => set('about.quote', v)} multiline />
        </SectionCard>

        <SectionCard title="O CAPITÃO (Dono)">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nome" value={data.owner.name} onChange={v => set('owner.name', v)} />
            <Field label="Apelido" value={data.owner.nickname} onChange={v => set('owner.nickname', v)} />
          </div>
          <Field label="Título" value={data.owner.title} onChange={v => set('owner.title', v)} />
          <Field label="Bio" value={data.owner.bio} onChange={v => set('owner.bio', v)} multiline />
          <Field label="Título da seção" value={data.captain.title} onChange={v => set('captain.title', v)} />
          <Field label="Texto da seção" value={data.captain.text} onChange={v => set('captain.text', v)} multiline />
          <Field label="Citação" value={data.captain.quote} onChange={v => set('captain.quote', v)} />
        </SectionCard>

        <SectionCard title="SERVIÇOS (O Ritual)">
          <Field label="Título" value={data.services.title} onChange={v => set('services.title', v)} />
          <Field label="Subtítulo" value={data.services.subtitle} onChange={v => set('services.subtitle', v)} />
          <Field label="Texto de promoção" value={data.services.promo} onChange={v => set('services.promo', v)} />
          <p className="text-sm text-[#A0977D] mb-3 mt-4">Serviços:</p>
          <ServiceEditor
            items={data.services.items}
            onChange={v => set('services.items', v)}
          />
        </SectionCard>

        <SectionCard title="PRODUTOS">
          <Field label="Título" value={data.products?.title} onChange={v => set('products.title', v)} />
          <Field label="Subtítulo" value={data.products?.subtitle} onChange={v => set('products.subtitle', v)} />
          <Field label="Fornecedor" value={data.products?.store_name} onChange={v => set('products.store_name', v)} />
          <p className="text-sm text-[#A0977D] mb-3 mt-4">Produtos ({data.products?.items?.length || 0}):</p>
          <div className="space-y-3">
            {(data.products?.items || []).map((item, idx) => {
              const updateProduct = (key, val) => {
                const next = JSON.parse(JSON.stringify(data))
                next.products.items[idx][key] = key === 'price' ? (Number(val) || 0) : key === 'available' ? !item.available : val
                setData(next)
                setSaved(false)
              }
              return (
                <div key={idx} className="p-3 bg-[#1a1a1a] border border-[#333] rounded">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => updateProduct('available')}
                      className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded text-xs font-bold transition-colors ${item.available ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/40' : 'bg-red-600/20 text-red-400 border border-red-600/40'}`}
                    >
                      {item.available ? '✓' : '✕'}
                    </button>
                    <input
                      value={item.name}
                      onChange={e => updateProduct('name', e.target.value)}
                      className="flex-1 bg-[#0a0a0a] border border-[#333] text-[#f5f0e8] px-2 py-1 rounded text-sm focus:border-[#C8A45C] focus:outline-none"
                      placeholder="Nome do produto"
                    />
                    <input
                      type="number"
                      step="0.10"
                      value={item.price}
                      onChange={e => updateProduct('price', e.target.value)}
                      className="w-20 bg-[#0a0a0a] border border-[#333] text-[#C8A45C] px-2 py-1 rounded text-right text-sm focus:border-[#C8A45C] focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 ml-11">
                    <input
                      value={item.brand || ''}
                      onChange={e => updateProduct('brand', e.target.value)}
                      className="w-24 bg-[#0a0a0a] border border-[#333] text-[#A0977D] px-2 py-1 rounded text-xs focus:border-[#C8A45C] focus:outline-none"
                      placeholder="Marca"
                    />
                    <select
                      value={item.category || 'Cabelo'}
                      onChange={e => updateProduct('category', e.target.value)}
                      className="bg-[#0a0a0a] border border-[#333] text-[#A0977D] px-2 py-1 rounded text-xs focus:border-[#C8A45C] focus:outline-none"
                    >
                      <option value="Cabelo">Cabelo</option>
                      <option value="Barba">Barba</option>
                      <option value="Pós Barba">Pós Barba</option>
                    </select>
                    <input
                      value={item.description || ''}
                      onChange={e => updateProduct('description', e.target.value)}
                      className="flex-1 bg-[#0a0a0a] border border-[#333] text-[#666] px-2 py-1 rounded text-xs focus:border-[#C8A45C] focus:outline-none"
                      placeholder="Descrição"
                    />
                  </div>
                </div>
              )
            })}
            <button
              onClick={() => {
                const next = JSON.parse(JSON.stringify(data))
                if (!next.products) next.products = { items: [] }
                if (!next.products.items) next.products.items = []
                next.products.items.push({ name: '', brand: 'Caballeros', price: 0, description: '', available: true, category: 'Cabelo' })
                setData(next)
                setSaved(false)
              }}
              className="w-full border border-dashed border-[#333] text-[#A0977D] py-2 rounded hover:border-[#C8A45C] hover:text-[#C8A45C] transition-colors text-sm"
            >
              + Adicionar produto
            </button>
          </div>
        </SectionCard>

        <SectionCard title="GALERIA">
          <Field label="Título" value={data.gallery.title} onChange={v => set('gallery.title', v)} />
          <Field label="Subtítulo" value={data.gallery.subtitle} onChange={v => set('gallery.subtitle', v)} />
        </SectionCard>

        <SectionCard title="CONTATO">
          <Field label="Título" value={data.contact.title} onChange={v => set('contact.title', v)} />
          <Field label="Subtítulo" value={data.contact.subtitle} onChange={v => set('contact.subtitle', v)} />
          <Field label="Horário" value={data.contact.hours} onChange={v => set('contact.hours', v)} />
          <Field label="Texto do CTA" value={data.contact.cta_text} onChange={v => set('contact.cta_text', v)} />
        </SectionCard>

        {/* JSON Preview */}
        <details className="mt-8">
          <summary className="text-[#666] text-sm cursor-pointer hover:text-[#A0977D]">
            Ver JSON completo
          </summary>
          <pre className="mt-4 bg-[#0e0e0e] border border-[#2a2520] rounded p-4 text-xs text-[#A0977D] overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  )
}
