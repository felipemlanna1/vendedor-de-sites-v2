"""
SQLite cache para deduplicacao de negocios visitados.
Nunca revisita o mesmo negocio — economiza tempo e evita deteccao.
"""

import hashlib
import json
import os
import sqlite3
import unicodedata
from datetime import datetime

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
DB_PATH = os.path.join(DB_DIR, "gmaps_leads.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS visited (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    place_id TEXT UNIQUE,
    fingerprint TEXT,

    -- Identidade
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT DEFAULT '',
    categories TEXT DEFAULT '',

    -- Localizacao
    address TEXT DEFAULT '',
    city TEXT DEFAULT '',
    state TEXT DEFAULT '',
    neighborhood TEXT DEFAULT '',
    lat REAL,
    lng REAL,
    plus_code TEXT DEFAULT '',

    -- Contato
    phone TEXT DEFAULT '',
    phone_international TEXT DEFAULT '',
    website TEXT DEFAULT '',

    -- Google Maps
    google_maps_url TEXT DEFAULT '',
    rating REAL,
    reviews INTEGER,
    reviews_per_rating TEXT DEFAULT '',
    price_range TEXT DEFAULT '',

    -- Horarios e popularidade
    hours TEXT DEFAULT '',
    popular_times TEXT DEFAULT '',

    -- Status
    status TEXT DEFAULT '',
    is_temporarily_closed INTEGER DEFAULT 0,
    is_permanently_closed INTEGER DEFAULT 0,

    -- Website quality
    website_status TEXT DEFAULT '',
    pagespeed INTEGER,
    mobile_friendly INTEGER,
    ssl INTEGER,

    -- CNPJ
    cnpj TEXT DEFAULT '',
    razao_social TEXT DEFAULT '',
    nome_fantasia TEXT DEFAULT '',
    data_abertura TEXT DEFAULT '',
    idade_meses INTEGER,
    porte TEXT DEFAULT '',
    cnae TEXT DEFAULT '',
    cnpj_status TEXT DEFAULT '',

    -- Social
    instagram TEXT DEFAULT '',
    facebook TEXT DEFAULT '',

    -- Scraping metadata
    niche TEXT DEFAULT '',
    source TEXT DEFAULT 'google_maps',
    scraped_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),

    -- Scoring
    score INTEGER DEFAULT 0,
    score_detail TEXT DEFAULT '',
    qualification TEXT DEFAULT '',

    -- Extras
    extra_data TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS searches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    results_count INTEGER,
    searched_at TEXT DEFAULT (datetime('now')),
    UNIQUE(query)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_place_id ON visited(place_id) WHERE place_id != '';
CREATE INDEX IF NOT EXISTS idx_fingerprint ON visited(fingerprint) WHERE fingerprint != '';
CREATE INDEX IF NOT EXISTS idx_city_niche ON visited(city, niche);
CREATE INDEX IF NOT EXISTS idx_qualification ON visited(qualification);
"""


def _normalize(text: str) -> str:
    """Remove acentos, lowercase, strip whitespace."""
    if not text:
        return ""
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    return text.lower().strip()


def make_fingerprint(name: str, address: str) -> str:
    """Gera fingerprint MD5 a partir de nome + endereco normalizados."""
    raw = f"{_normalize(name)}|{_normalize(address)}"
    return hashlib.md5(raw.encode()).hexdigest()


class LeadCache:
    """Cache SQLite para negocios ja visitados."""

    def __init__(self, db_path: str = DB_PATH):
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row
        self.conn.executescript(SCHEMA)
        self.conn.commit()

    def close(self):
        self.conn.close()

    # ---- Dedup checks ----

    def is_visited(self, place_id: str = "", name: str = "", address: str = "") -> bool:
        """Verifica se negocio ja foi visitado (por place_id ou fingerprint)."""
        if place_id:
            row = self.conn.execute(
                "SELECT 1 FROM visited WHERE place_id = ?", (place_id,)
            ).fetchone()
            if row:
                return True

        if name and address:
            fp = make_fingerprint(name, address)
            row = self.conn.execute(
                "SELECT 1 FROM visited WHERE fingerprint = ?", (fp,)
            ).fetchone()
            if row:
                return True

        return False

    def is_searched(self, query: str) -> bool:
        """Verifica se essa query exata ja foi executada."""
        row = self.conn.execute(
            "SELECT 1 FROM searches WHERE query = ?", (query,)
        ).fetchone()
        return row is not None

    # ---- Save ----

    def save_visit(self, data: dict) -> None:
        """Salva ou atualiza um negocio visitado."""
        place_id = data.get("place_id", "")
        name = data.get("name", "")
        address = data.get("address", "")
        fingerprint = make_fingerprint(name, address)

        # Serializar campos JSON
        for field in ("categories", "reviews_per_rating", "hours", "popular_times", "score_detail", "extra_data"):
            val = data.get(field)
            if val and not isinstance(val, str):
                data[field] = json.dumps(val, ensure_ascii=False)

        data["fingerprint"] = fingerprint
        data["updated_at"] = datetime.now().isoformat()

        # Colunas validas
        valid_cols = {row[1] for row in self.conn.execute("PRAGMA table_info(visited)")}
        filtered = {k: v for k, v in data.items() if k in valid_cols and v is not None}

        cols = list(filtered.keys())
        placeholders = ", ".join("?" for _ in cols)
        updates = ", ".join(f"{c} = excluded.{c}" for c in cols if c != "id")

        sql = f"""
            INSERT INTO visited ({', '.join(cols)})
            VALUES ({placeholders})
            ON CONFLICT(place_id) DO UPDATE SET {updates}
        """
        self.conn.execute(sql, [filtered[c] for c in cols])
        self.conn.commit()

    def save_search(self, query: str, results_count: int) -> None:
        """Registra que uma busca foi executada."""
        self.conn.execute(
            "INSERT OR REPLACE INTO searches (query, results_count, searched_at) VALUES (?, ?, ?)",
            (query, results_count, datetime.now().isoformat()),
        )
        self.conn.commit()

    # ---- Query ----

    def get_cached_leads(self, city: str = "", niche: str = "", qualification: str = "") -> list[dict]:
        """Retorna leads do cache, opcionalmente filtrados."""
        conditions = []
        params = []

        if city:
            conditions.append("LOWER(city) LIKE ?")
            params.append(f"%{_normalize(city)}%")
        if niche:
            conditions.append("niche = ?")
            params.append(niche)
        if qualification:
            conditions.append("qualification = ?")
            params.append(qualification)

        where = f"WHERE {' AND '.join(conditions)}" if conditions else ""
        rows = self.conn.execute(
            f"SELECT * FROM visited {where} ORDER BY score DESC", params
        ).fetchall()

        return [dict(row) for row in rows]

    def get_visited_place_ids(self) -> set[str]:
        """Retorna set de todos os place_ids visitados (para lookup rapido)."""
        rows = self.conn.execute(
            "SELECT place_id FROM visited WHERE place_id != ''"
        ).fetchall()
        return {row[0] for row in rows}

    def get_visited_fingerprints(self) -> set[str]:
        """Retorna set de todos os fingerprints (para lookup rapido)."""
        rows = self.conn.execute(
            "SELECT fingerprint FROM visited WHERE fingerprint != ''"
        ).fetchall()
        return {row[0] for row in rows}

    def get_stats(self) -> dict:
        """Retorna estatisticas do cache."""
        total = self.conn.execute("SELECT COUNT(*) FROM visited").fetchone()[0]
        searches = self.conn.execute("SELECT COUNT(*) FROM searches").fetchone()[0]

        by_city = self.conn.execute(
            "SELECT city, COUNT(*) as cnt FROM visited WHERE city != '' GROUP BY city ORDER BY cnt DESC LIMIT 10"
        ).fetchall()

        by_niche = self.conn.execute(
            "SELECT niche, COUNT(*) as cnt FROM visited WHERE niche != '' GROUP BY niche ORDER BY cnt DESC LIMIT 10"
        ).fetchall()

        by_qual = self.conn.execute(
            "SELECT qualification, COUNT(*) as cnt FROM visited WHERE qualification != '' GROUP BY qualification"
        ).fetchall()

        return {
            "total_visitados": total,
            "total_buscas": searches,
            "por_cidade": {row[0]: row[1] for row in by_city},
            "por_nicho": {row[0]: row[1] for row in by_niche},
            "por_classificacao": {row[0]: row[1] for row in by_qual},
        }

    def update_scoring(self, place_id: str, score: int, qualification: str, score_detail: dict) -> None:
        """Atualiza scoring de um lead no cache."""
        self.conn.execute(
            "UPDATE visited SET score = ?, qualification = ?, score_detail = ?, updated_at = ? WHERE place_id = ?",
            (score, qualification, json.dumps(score_detail, ensure_ascii=False), datetime.now().isoformat(), place_id),
        )
        self.conn.commit()

    def update_cnpj(self, place_id: str, cnpj_data: dict) -> None:
        """Atualiza dados de CNPJ de um lead no cache."""
        valid_cols = {row[1] for row in self.conn.execute("PRAGMA table_info(visited)")}
        filtered = {k: v for k, v in cnpj_data.items() if k in valid_cols and v is not None}
        filtered["updated_at"] = datetime.now().isoformat()

        sets = ", ".join(f"{k} = ?" for k in filtered)
        vals = list(filtered.values()) + [place_id]
        self.conn.execute(f"UPDATE visited SET {sets} WHERE place_id = ?", vals)
        self.conn.commit()

    def update_website_status(self, place_id: str, status: str, pagespeed: int = None, mobile_friendly: int = None, ssl: int = None) -> None:
        """Atualiza status de verificacao do website."""
        updates = {"website_status": status, "updated_at": datetime.now().isoformat()}
        if pagespeed is not None:
            updates["pagespeed"] = pagespeed
        if mobile_friendly is not None:
            updates["mobile_friendly"] = mobile_friendly
        if ssl is not None:
            updates["ssl"] = ssl

        sets = ", ".join(f"{k} = ?" for k in updates)
        vals = list(updates.values()) + [place_id]
        self.conn.execute(f"UPDATE visited SET {sets} WHERE place_id = ?", vals)
        self.conn.commit()
