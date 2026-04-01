import { useState, useEffect } from 'react'

const BLOB_ID = '019d4a68-d250-7ddd-ad2b-f3f495f47502'
const JSONBLOB_URL = `https://jsonblob.com/api/jsonBlob/${BLOB_ID}`
const API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(JSONBLOB_URL)}`

// Default content (fallback if fetch fails)
const defaults = {
  business: {
    name: "Barbearia Ancorador",
    tagline: "Barbearia de Verdade",
    slogan: "Não criamos apenas estilos. Criamos momentos.",
    phone: "(48) 98839-7456",
    whatsapp: "5548988397456",
    email: "ancoradorbarbearia@gmail.com",
    address: "Av. Afonso Delambert Neto, 540",
    neighborhood: "Lagoa da Conceição",
    city: "Florianópolis",
    state: "SC",
    cep: "88062-000",
    booking_url: "http://contate.me/ancoradoragenda",
    instagram: "barbeariaancorador",
    instagram_owner: "sucatabarber",
    founded: "2024"
  },
  owner: {
    name: "Bruno",
    nickname: "Sucata",
    title: "Barbeiro & Fundador",
    bio: "De fazenda à cidade, da luta ao estilo clássico. Boxeador de alma, barbeiro de coração, apaixonado pelo que é atemporal. Referência em cortes clássicos em Floripa.",
    instagram: "sucatabarber"
  },
  hero: {
    title: "Barbearia de Verdade",
    subtitle: "Tradição, estilo e amizade na Ilha da Magia",
    cta_text: "Agende seu horário",
    cta_url: "http://contate.me/ancoradoragenda"
  },
  about: {
    title: "Nossa Viagem",
    text: "Fundamos a Ancorador em 2024 com um propósito claro: criar um verdadeiro santuário da beleza masculina. Aqui, cada detalhe foi pensado para resgatar a essência da barbearia clássica — o lugar onde tradição, estilo e amizade se encontram.",
    text2: "Mais do que cortes e cuidados, oferecemos uma experiência. Um espaço onde o homem pode ancorar sua rotina, renovar sua autoestima e sair fortalecido para enfrentar o mar da vida.",
    text3: "A Âncorador é a união do alto padrão e da essência roots, carregando a vibe única de Florianópolis. Um espaço para elevar a autoestima, relaxar e criar conexões genuínas.",
    quote: "Na Ancorador, não criamos apenas estilos. Criamos momentos. E esse é só o começo da nossa viagem."
  },
  captain: {
    title: "O Capitão",
    text: "Bruno, mais conhecido como Sucata, trocou as luvas de boxe pela navalha clássica. Da fazenda à Ilha da Magia, cada passo da sua jornada se reflete na precisão de cada corte. Boxeador de alma, barbeiro de coração — sua paixão pelo que é atemporal transforma cada atendimento em um ritual.",
    quote: "Meu estilo, minha jornada, meu legado."
  },
  services: {
    title: "O Ritual",
    subtitle: "Cada serviço é um momento de cuidado e tradição",
    items: [
      { name: "Corte", price: 70, description: "Corte clássico com navalha e tesoura" },
      { name: "Barba", price: 60, description: "Barba alinhada com toalha quente e navalha" },
      { name: "Sobrancelhas", price: 20, description: "Design e alinhamento de sobrancelhas" },
      { name: "Limpeza de Pele", price: 40, description: "Limpeza profunda e revitalizante" },
      { name: "Corte + Barba", price: 115, description: "A experiência completa do marujo" }
    ],
    promo: "10% de desconto no primeiro corte"
  },
  products: {
    title: "Nossos Produtos",
    subtitle: "Revendedores oficiais Caballeros & GOAT",
    store_url: "https://abancada.com/",
    store_name: "A Bancada",
    items: [
      { name: "Cera Strong Matte", brand: "Caballeros", price: 32.00, description: "Efeito seco, fixação forte", available: true, category: "Cabelo" },
      { name: "Cera Matte Cream", brand: "Caballeros", price: 32.00, description: "Efeito fosco, textura cremosa", available: true, category: "Cabelo" },
      { name: "Cera Medium Oil", brand: "Caballeros", price: 47.80, description: "Fixação média com brilho natural", available: true, category: "Cabelo" },
      { name: "SuperWax", brand: "Caballeros", price: 21.90, description: "Fixação extra forte para estilos marcantes", available: true, category: "Cabelo" },
      { name: "Shine Effect", brand: "GOAT", price: 24.90, description: "Fixação moderada, efeito brilho", available: true, category: "Cabelo" },
      { name: "Matte Effect", brand: "GOAT", price: 24.90, description: "Fixação média, efeito seco natural", available: true, category: "Cabelo" },
      { name: "Modelador em Pó", brand: "Caballeros", price: 41.90, description: "Volume e textura instantânea", available: true, category: "Cabelo" },
      { name: "Gel Modelador Caballeros", brand: "Caballeros", price: 25.80, description: "Fixação forte com acabamento brilhante", available: true, category: "Cabelo" },
      { name: "Gel Modelador", brand: "GOAT", price: 19.90, description: "Fixação forte, acabamento natural", available: true, category: "Cabelo" },
      { name: "Grooming Spray", brand: "Caballeros", price: 32.00, description: "Spray fixador com acabamento leve", available: true, category: "Cabelo" },
      { name: "Grooming Tonic", brand: "Caballeros", price: 32.00, description: "Tônico para pentear e dar volume", available: true, category: "Cabelo" },
      { name: "Leave In", brand: "Caballeros", price: 32.00, description: "Hidratante finalizador com proteção térmica", available: true, category: "Cabelo" },
      { name: "Shampoo Refreshing", brand: "Caballeros", price: 28.50, description: "Limpeza refrescante para uso diário", available: true, category: "Cabelo" },
      { name: "Shampoo 2 em 1", brand: "GOAT", price: 19.90, description: "pH balanceado para cabelo e barba", available: true, category: "Cabelo" },
      { name: "Beard Balm Cream", brand: "Caballeros", price: 38.80, description: "Hidratação e modelagem da barba", available: true, category: "Barba" },
      { name: "Beard Balm", brand: "Caballeros", price: 38.80, description: "Balm clássico para barba", available: true, category: "Barba" },
      { name: "Beard Balm GOAT", brand: "GOAT", price: 24.90, description: "Balm hidratante para barba 120ml", available: true, category: "Barba" },
      { name: "Beard Oil", brand: "Caballeros", price: 38.80, description: "Óleo nutritivo para barba", available: true, category: "Barba" },
      { name: "Shaving Gel", brand: "GOAT", price: 39.90, description: "Gel para barbear com proteção", available: true, category: "Barba" },
      { name: "Pós Barba Menthol Classic", brand: "Caballeros", price: 38.80, description: "Pós barba refrescante com mentol", available: true, category: "Pós Barba" },
      { name: "Pós Barba Herbal Essence", brand: "Caballeros", price: 38.80, description: "Pós barba com essência herbal", available: true, category: "Pós Barba" },
      { name: "Pós Barba BayRum", brand: "Caballeros", price: 38.80, description: "Pós barba clássico Bay Rum", available: true, category: "Pós Barba" }
    ]
  },
  gallery: {
    title: "A Bordo",
    subtitle: "Momentos capturados na Ancorador"
  },
  contact: {
    title: "Ancore Aqui",
    subtitle: "Seu porto seguro te espera",
    hours: "Segunda a Sábado",
    cta_text: "Agende pelo WhatsApp"
  }
}

export function useContent() {
  const [content, setContent] = useState(defaults)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    fetch(API_URL, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setContent(prev => ({ ...prev, ...data })))
      .catch(() => {})
      .finally(() => clearTimeout(timeout))
  }, [])

  return { content, loading }
}

/**
 * Save content to jsonblob.
 * NOTE: Save uses jsonblob directly (no CORS proxy).
 * This works from production domains and admin tools, but may fail on localhost.
 */
export async function saveContent(data) {
  const res = await fetch(JSONBLOB_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.ok
}

export { defaults, BLOB_ID, JSONBLOB_URL as API_URL }
