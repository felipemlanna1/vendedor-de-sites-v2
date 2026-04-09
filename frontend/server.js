import express from 'express'
import cors from 'cors'
import { parse } from 'csv-parse/sync'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LEADS_DIR = join(ROOT, 'leads')
const DATA_LEADS_DIR = join(ROOT, 'data', 'leads')
const DATA_DIR = join(ROOT, 'data')

const app = express()
app.use(cors())
app.use(express.json())

// --- Init vendedor.db (briefings) ---

function initBriefingsDb() {
  const db = new Database(join(DATA_DIR, 'vendedor.db'))
  db.exec(`
    CREATE TABLE IF NOT EXISTS briefings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_source TEXT NOT NULL,
      lead_id TEXT NOT NULL,
      lead_name TEXT NOT NULL,
      lead_city TEXT DEFAULT '',
      detected_niche TEXT DEFAULT '',
      niche_label TEXT DEFAULT '',
      briefing_json TEXT NOT NULL DEFAULT '{}',
      status TEXT DEFAULT 'pending',
      error_message TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      UNIQUE(lead_source, lead_id)
    );
    CREATE INDEX IF NOT EXISTS idx_briefings_source_id ON briefings(lead_source, lead_id);
    CREATE INDEX IF NOT EXISTS idx_briefings_status ON briefings(status);
  `)
  db.close()
}
initBriefingsDb()

// --- Helpers ---

function readCsv(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    return parse(content, { columns: true, skip_empty_lines: true, relax_column_count: true })
  } catch {
    return []
  }
}

function getLeadFiles(prefix) {
  return readdirSync(LEADS_DIR)
    .filter(f => f.startsWith(prefix) && f.endsWith('.csv'))
    .map(f => join(LEADS_DIR, f))
}

// --- Instagram Leads ---

function loadInstagramLeads() {
  const files = readdirSync(LEADS_DIR)
    .filter(f => !f.startsWith('gmaps_') && f.endsWith('.csv'))
    .map(f => join(LEADS_DIR, f))

  // Also read from data/leads/
  if (existsSync(DATA_LEADS_DIR)) {
    const dataFiles = readdirSync(DATA_LEADS_DIR)
      .filter(f => !f.startsWith('gmaps_') && f.endsWith('.csv'))
      .map(f => join(DATA_LEADS_DIR, f))
    files.push(...dataFiles)
  }

  const allLeads = new Map()
  for (const file of files) {
    const rows = readCsv(file)
    for (const row of rows) {
      if (row.username) {
        allLeads.set(row.username, {
          ...row,
          score: Number(row.score) || 0,
          follower_count: Number(row.follower_count || row.seguidores) || 0,
          following_count: Number(row.following_count || row.seguindo) || 0,
          media_count: Number(row.media_count || row.posts) || 0,
          has_real_site: row.has_real_site === 'True' || row.tem_site === 'True',
          source_file: file.split('/').pop()
        })
      }
    }
  }
  return [...allLeads.values()]
}

// --- Google Maps Leads ---

function loadGmapsLeads() {
  const files = getLeadFiles('gmaps_')
  const allLeads = new Map()

  for (const file of files) {
    const rows = readCsv(file)
    for (const row of rows) {
      const key = row.name + '|' + (row.phone || row.address || '')
      if (row.name && !allLeads.has(key)) {
        allLeads.set(key, {
          ...row,
          rating: Number(row.rating) || 0,
          reviews: Number(row.reviews) || 0,
          idade_meses: Number(row.idade_meses) || null,
          source_file: file.split('/').pop()
        })
      }
    }
  }
  return [...allLeads.values()]
}

// --- SQLite (gmaps cache with extra data) ---

function loadGmapsDb() {
  try {
    const db = new Database(join(DATA_DIR, 'gmaps_leads.db'), { readonly: true })
    const rows = db.prepare('SELECT * FROM visited').all()
    db.close()
    return rows
  } catch {
    return []
  }
}

// --- API Routes ---

app.get('/api/instagram', (req, res) => {
  const leads = loadInstagramLeads()
  res.json(leads)
})

app.get('/api/gmaps', (req, res) => {
  const csvLeads = loadGmapsLeads()
  const dbLeads = loadGmapsDb()

  // Build set of CSV keys (these are the "selected" leads that passed filters)
  const csvKeys = new Set()
  for (const lead of csvLeads) {
    const key = lead.name + '|' + (lead.phone || lead.address || '')
    csvKeys.add(key)
  }

  // Merge: DB has richer data, CSV is fallback
  const merged = new Map()

  for (const lead of dbLeads) {
    const key = lead.name + '|' + (lead.phone || lead.address || '')
    merged.set(key, {
      ...lead,
      rating: Number(lead.rating) || 0,
      reviews: Number(lead.reviews) || 0,
      source: 'db',
      selecionado: csvKeys.has(key)
    })
  }

  for (const lead of csvLeads) {
    const key = lead.name + '|' + (lead.phone || lead.address || '')
    if (!merged.has(key)) {
      merged.set(key, { ...lead, source: 'csv', selecionado: true })
    } else {
      // DB já tem, mas garantir source_file do CSV
      const existing = merged.get(key)
      existing.source_file = lead.source_file
    }
  }

  res.json([...merged.values()])
})

app.get('/api/stats', (req, res) => {
  const ig = loadInstagramLeads()
  const gmaps = loadGmapsLeads()
  const dbLeads = loadGmapsDb()

  // Instagram stats
  const igByClass = { QUENTE: 0, MORNO: 0, FRIO: 0 }
  const igByNicho = {}
  for (const l of ig) {
    const cls = (l.classificacao || '').toUpperCase()
    if (igByClass[cls] !== undefined) igByClass[cls]++
    const nicho = l.nicho || l.category || 'sem nicho'
    igByNicho[nicho] = (igByNicho[nicho] || 0) + 1
  }

  // Gmaps stats
  const allGmaps = [...new Map([...dbLeads, ...gmaps].map(l => [l.name + '|' + (l.phone || ''), l])).values()]
  const gmapsByStatus = {}
  const gmapsByCategory = {}
  for (const l of allGmaps) {
    const st = l.website_status || 'unknown'
    gmapsByStatus[st] = (gmapsByStatus[st] || 0) + 1
    const cat = l.category || 'sem categoria'
    gmapsByCategory[cat] = (gmapsByCategory[cat] || 0) + 1
  }

  // Briefing stats
  let briefingCount = 0
  try {
    const bdb = new Database(join(DATA_DIR, 'vendedor.db'), { readonly: true })
    briefingCount = bdb.prepare("SELECT COUNT(*) as count FROM briefings WHERE status = 'done'").get().count
    bdb.close()
  } catch {}

  res.json({
    totals: {
      instagram: ig.length,
      gmaps: allGmaps.length,
      total: ig.length + allGmaps.length,
      briefings: briefingCount
    },
    instagram: {
      byClassification: igByClass,
      byNiche: igByNicho
    },
    gmaps: {
      byWebsiteStatus: gmapsByStatus,
      byCategory: gmapsByCategory
    }
  })
})

// --- Briefing Routes ---

app.get('/api/briefings', (req, res) => {
  try {
    const db = new Database(join(DATA_DIR, 'vendedor.db'), { readonly: true })
    const rows = db.prepare("SELECT lead_source, lead_id, status, briefing_json, updated_at FROM briefings WHERE status = 'done'").all()
    db.close()
    const map = {}
    for (const row of rows) {
      const key = `${row.lead_source}:${row.lead_id}`
      const briefing = JSON.parse(row.briefing_json || '{}')
      map[key] = {
        status: row.status,
        summary: briefing.summary || '',
        sales_score: briefing.sales_score || 0,
        updated_at: row.updated_at
      }
    }
    res.json(map)
  } catch {
    res.json({})
  }
})

app.get('/api/briefings/:source/:id', (req, res) => {
  try {
    const db = new Database(join(DATA_DIR, 'vendedor.db'), { readonly: true })
    const row = db.prepare('SELECT * FROM briefings WHERE lead_source = ? AND lead_id = ?').get(req.params.source, decodeURIComponent(req.params.id))
    db.close()
    if (!row) return res.status(404).json({ error: 'not found' })
    row.briefing_json = JSON.parse(row.briefing_json || '{}')
    res.json(row)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/api/briefings', (req, res) => {
  try {
    const db = new Database(join(DATA_DIR, 'vendedor.db'))
    const stmt = db.prepare(`
      INSERT INTO briefings (lead_source, lead_id, lead_name, lead_city, detected_niche, niche_label, briefing_json, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(lead_source, lead_id) DO UPDATE SET
        lead_name = excluded.lead_name,
        lead_city = excluded.lead_city,
        detected_niche = excluded.detected_niche,
        niche_label = excluded.niche_label,
        briefing_json = excluded.briefing_json,
        status = excluded.status,
        updated_at = datetime('now')
    `)
    const b = req.body
    stmt.run(b.lead_source, b.lead_id, b.lead_name || '', b.lead_city || '', b.detected_niche || '', b.niche_label || '', JSON.stringify(b.briefing_json || {}), b.status || 'done')
    db.close()
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// --- Site Status Route ---

app.get('/api/site-status/:source/:id', (req, res) => {
  try {
    const db = new Database(join(DATA_DIR, 'vendedor.db'), { readonly: true })
    const row = db.prepare('SELECT id, lead_id, lead_name FROM briefings WHERE lead_source = ? AND lead_id = ? AND status = ?')
      .get(req.params.source, decodeURIComponent(req.params.id), 'done')
    db.close()

    if (!row) return res.json({ hasBriefing: false, hasSite: false })

    const leadId = row.lead_id
    const sitesDir = join(ROOT, 'sites')

    // Check if site directory exists
    const siteDir = existsSync(join(sitesDir, leadId))
      ? join(sitesDir, leadId)
      : null

    // Also check slug variants (lowercase, hyphens)
    let foundDir = siteDir
    if (!foundDir && existsSync(sitesDir)) {
      const dirs = readdirSync(sitesDir)
      const match = dirs.find(d =>
        d === leadId ||
        d === leadId.replace(/[^a-z0-9]/gi, '-').toLowerCase() ||
        d.includes(leadId.split('|')[0].toLowerCase().replace(/\s+/g, '-'))
      )
      if (match) foundDir = join(sitesDir, match)
    }

    const hasSite = !!foundDir
    let siteUrl = null
    let siteDirName = null

    if (foundDir) {
      siteDirName = foundDir.split('/').pop()
      // Derive cloudflare URL from directory name
      const slug = siteDirName
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      siteUrl = `https://${slug}.pages.dev`
    }

    res.json({
      hasBriefing: true,
      hasSite,
      siteUrl,
      siteDirName,
      briefingId: row.id
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
