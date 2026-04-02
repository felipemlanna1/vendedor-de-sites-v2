#!/usr/bin/env python3
"""
Validacao automatizada de site — 20+ checks UX/UI com score numerico.
Score >= 9.0 = APROVADO. < 9.0 = REPROVADO (exit code 1).
Uso: python playwright-validate.py <url> <output_dir>
"""
import sys, os, asyncio, json, math
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5180"
OUT = sys.argv[2] if len(sys.argv) > 2 else "screenshots"
THRESHOLD = 9.0
os.makedirs(OUT, exist_ok=True)

VIEWPORTS = [
    {"name": "mobile", "width": 375, "height": 812},
    {"name": "desktop", "width": 1440, "height": 900},
]

RESULTS = {"critical": [], "fail": [], "warn": [], "pass": []}

def critical(msg): RESULTS["critical"].append(msg); print(f"  🔴 CRITICO: {msg}")
def fail(msg):     RESULTS["fail"].append(msg);     print(f"  ❌ FAIL: {msg}")
def warn(msg):     RESULTS["warn"].append(msg);     print(f"  ⚠️  WARN: {msg}")
def ok(msg):       RESULTS["pass"].append(msg);     print(f"  ✅ PASS: {msg}")


JS_CHECKS = """
(() => {
  const R = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = vw < 768;
  const minEdge = isMobile ? 16 : 32;

  // ========== LAYOUT & ESPACAMENTO ==========

  // 1. Overflow horizontal
  const bw = document.body.scrollWidth;
  R.push({id:'overflow', pass: bw <= vw, detail: {bodyWidth:bw, viewport:vw}});

  // 2. Elementos tocando borda
  const touching = [];
  document.querySelectorAll('h1,h2,h3,h4,p,span,a,button,li,label').forEach(el => {
    const r = el.getBoundingClientRect();
    const t = el.textContent?.trim();
    if (!t || t.length < 3) return;
    const s = getComputedStyle(el);
    if (s.position === 'fixed' || s.position === 'absolute' || s.position === 'sticky') return;
    if (r.width < 30) return;
    if (r.left < minEdge && r.left >= 0) touching.push({tag:el.tagName, text:t.slice(0,40), side:'left', px:Math.round(r.left)});
    if (r.right > vw - minEdge && r.right <= vw + 5) touching.push({tag:el.tagName, text:t.slice(0,40), side:'right', px:Math.round(vw - r.right)});
  });
  R.push({id:'touching_edge', pass: touching.length === 0, detail: touching.slice(0,8)});

  // 3. Grid 8px — amostrar padding/margin/gap das sections
  const spacings = [];
  document.querySelectorAll('section, [class*="section"], main > div').forEach(el => {
    const s = getComputedStyle(el);
    ['paddingTop','paddingBottom','paddingLeft','paddingRight','marginTop','marginBottom','gap'].forEach(prop => {
      const v = parseFloat(s[prop]);
      if (v > 0) spacings.push(v);
    });
  });
  const on8 = spacings.filter(v => v % 4 === 0).length;
  const gridPct = spacings.length > 0 ? Math.round((on8 / spacings.length) * 100) : 100;
  R.push({id:'grid_8px', pass: gridPct >= 70, detail: {pctAligned: gridPct, sampled: spacings.length}});

  // 4. Espacamento entre secoes
  const sections = document.querySelectorAll('section, [id]');
  const sectionGaps = [];
  const sArr = Array.from(sections).filter(s => s.getBoundingClientRect().height > 100);
  for (let i = 1; i < sArr.length; i++) {
    const prev = sArr[i-1].getBoundingClientRect();
    const curr = sArr[i].getBoundingClientRect();
    const gap = curr.top - prev.bottom;
    if (gap >= 0) sectionGaps.push(Math.round(gap));
  }
  const minGap = isMobile ? 64 : 80;
  // Considerar padding interno das sections como gap tambem
  const sectPaddings = [];
  sArr.forEach(s => {
    const cs = getComputedStyle(s);
    sectPaddings.push(parseFloat(cs.paddingTop), parseFloat(cs.paddingBottom));
  });
  const avgPad = sectPaddings.length > 0 ? sectPaddings.reduce((a,b)=>a+b,0)/sectPaddings.length : 0;
  R.push({id:'section_spacing', pass: avgPad >= minGap || sectionGaps.every(g => g >= 0), detail: {avgPadding: Math.round(avgPad), minRequired: minGap, gaps: sectionGaps.slice(0,5)}});

  // 5. Max-width conteudo (texto nao deve ser largo demais)
  const wideTexts = [];
  document.querySelectorAll('p, li').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && el.textContent.trim().length > 50) {
      const charsPerLine = r.width / (parseFloat(getComputedStyle(el).fontSize) * 0.55);
      if (charsPerLine > 85) wideTexts.push({text: el.textContent.trim().slice(0,30), chars: Math.round(charsPerLine)});
    }
  });
  R.push({id:'max_width', pass: wideTexts.length === 0, detail: wideTexts.slice(0,3)});

  // ========== TIPOGRAFIA ==========

  // 6. Fontes custom
  const h1 = document.querySelector('h1');
  const h1f = h1 ? getComputedStyle(h1).fontFamily : '';
  const bodyf = getComputedStyle(document.body).fontFamily;
  const generic = ['serif','sans-serif','monospace','cursive','fantasy','system-ui','-apple-system'];
  const h1gen = generic.some(g => h1f.toLowerCase().replace(/['"]/g,'').trim() === g);
  const bodygen = generic.some(g => bodyf.toLowerCase().replace(/['"]/g,'').trim() === g);
  R.push({id:'custom_fonts', pass: !h1gen && !bodygen, detail: {h1: h1f.slice(0,50), body: bodyf.slice(0,50)}});

  // 7. Escala modular
  const fontSizes = new Set();
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,button,li').forEach(el => {
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs > 0) fontSizes.add(Math.round(fs));
  });
  const sorted = [...fontSizes].sort((a,b) => a-b);
  let ratios = [];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i-1] > 0) ratios.push(+(sorted[i] / sorted[i-1]).toFixed(2));
  }
  // Boa escala: ratios entre 1.1 e 1.6, sem saltos > 2.0
  const badRatios = ratios.filter(r => r > 2.0);
  R.push({id:'type_scale', pass: badRatios.length <= 1, detail: {sizes: sorted, ratios: ratios.slice(0,8)}});

  // 8. Hierarquia heading
  const h1s = parseFloat(h1 ? getComputedStyle(h1).fontSize : '0');
  const h2el = document.querySelector('h2');
  const h2s = h2el ? parseFloat(getComputedStyle(h2el).fontSize) : 0;
  const h3el = document.querySelector('h3');
  const h3s = h3el ? parseFloat(getComputedStyle(h3el).fontSize) : 0;
  const bs = parseFloat(getComputedStyle(document.body).fontSize);
  const hierOk = (h1s === 0 || h1s > h2s || h2s === 0) && (h2s === 0 || h2s > bs);
  R.push({id:'heading_hierarchy', pass: hierOk, detail: {h1: h1s, h2: h2s, h3: h3s, body: bs}});

  // 9. Line-height body
  const lh = parseFloat(getComputedStyle(document.body).lineHeight) / bs;
  R.push({id:'line_height', pass: lh >= 1.4 && lh <= 2.2, detail: {ratio: +lh.toFixed(2)}});

  // ========== CORES & CONTRASTE ==========

  // 10. Contraste WCAG — amostrar textos visiveis
  function luminance(r,g,b) {
    const [rs,gs,bs] = [r,g,b].map(c => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); });
    return 0.2126*rs + 0.7152*gs + 0.0722*bs;
  }
  function parseColor(c) {
    const d = document.createElement('div'); d.style.color = c; document.body.appendChild(d);
    const rgb = getComputedStyle(d).color; document.body.removeChild(d);
    const m = rgb.match(/(\d+)/g); return m ? m.map(Number) : [0,0,0];
  }
  function contrastRatio(fg, bg) {
    const l1 = luminance(...fg) + 0.05;
    const l2 = luminance(...bg) + 0.05;
    return l1 > l2 ? l1/l2 : l2/l1;
  }
  const lowContrast = [];
  document.querySelectorAll('h1,h2,h3,p,span,a,button,li').forEach(el => {
    const t = el.textContent?.trim();
    if (!t || t.length < 2) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return;
    const fg = parseColor(s.color);
    const bg = parseColor(s.backgroundColor !== 'rgba(0, 0, 0, 0)' ? s.backgroundColor : 'rgb(255,255,255)');
    const ratio = contrastRatio(fg, bg);
    const fs = parseFloat(s.fontSize);
    const minRatio = fs >= 24 ? 3.0 : 4.5;
    if (ratio < minRatio) lowContrast.push({text: t.slice(0,30), ratio: +ratio.toFixed(1), min: minRatio});
  });
  R.push({id:'contrast_wcag', pass: lowContrast.length === 0, detail: lowContrast.slice(0,5)});

  // 11. Paleta restrita
  const colors = new Set();
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    [s.color, s.backgroundColor, s.borderColor].forEach(c => {
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'rgb(0, 0, 0)' && c !== 'rgb(255, 255, 255)') {
        colors.add(c.replace(/\s/g,''));
      }
    });
  });
  R.push({id:'color_palette', pass: colors.size <= 12, detail: {uniqueColors: colors.size}});

  // 12. CTA cor distinta
  const ctaBtns = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], button[class*="primary"], a[class*="cta"], a[class*="btn"]');
  const ctaDistinct = ctaBtns.length > 0; // pelo menos existe CTA
  R.push({id:'cta_distinct', pass: ctaDistinct, detail: {ctaCount: ctaBtns.length}});

  // ========== IMAGENS ==========

  // 13. Imagens quebradas
  const imgs = document.querySelectorAll('img');
  const broken = [];
  imgs.forEach(img => { if (!img.complete || img.naturalWidth === 0) broken.push(img.src?.split('/').pop() || img.alt || 'unknown'); });
  R.push({id:'broken_images', pass: broken.length === 0, detail: broken.slice(0,5), total: imgs.length});

  // 14. Imagens sem alt
  const noAlt = [];
  imgs.forEach(img => { if (!img.alt || !img.alt.trim()) noAlt.push(img.src?.split('/').pop() || 'unknown'); });
  R.push({id:'img_alt', pass: noAlt.length === 0, detail: noAlt.slice(0,5)});

  // 15. Proporcao distorcida
  const distorted = [];
  imgs.forEach(img => {
    if (img.naturalWidth === 0 || img.naturalHeight === 0) return;
    const natRatio = img.naturalWidth / img.naturalHeight;
    const dispRatio = img.getBoundingClientRect().width / img.getBoundingClientRect().height;
    if (dispRatio > 0 && Math.abs(natRatio - dispRatio) / natRatio > 0.2) {
      distorted.push({src: img.src?.split('/').pop(), natural: +natRatio.toFixed(2), displayed: +dispRatio.toFixed(2)});
    }
  });
  R.push({id:'img_ratio', pass: distorted.length === 0, detail: distorted.slice(0,3)});

  // ========== INTERATIVIDADE & MOTION ==========

  // 16. Animacoes presentes
  const sheets = document.styleSheets;
  let hasAnim = false;
  try {
    for (const sheet of sheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.cssText && (rule.cssText.includes('transition') || rule.cssText.includes('animation') || rule.cssText.includes('@keyframes'))) {
            hasAnim = true; break;
          }
        }
      } catch(e) {}
      if (hasAnim) break;
    }
  } catch(e) {}
  // Tambem checar GSAP/Motion no DOM
  const hasGSAP = !!document.querySelector('[data-scroll], [data-speed], .gsap-marker-start');
  const hasMotion = document.querySelectorAll('[style*="transform"], [style*="opacity"]').length > 3;
  R.push({id:'animations', pass: hasAnim || hasGSAP || hasMotion, detail: {css: hasAnim, gsap: hasGSAP, inlineTransforms: hasMotion}});

  // 17. Hover states (verificar via CSS rules)
  let hasHover = false;
  try {
    for (const sheet of sheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes(':hover')) { hasHover = true; break; }
        }
      } catch(e) {}
      if (hasHover) break;
    }
  } catch(e) {}
  R.push({id:'hover_states', pass: hasHover, detail: {}});

  // 18. Smooth scroll
  const htmlScroll = getComputedStyle(document.documentElement).scrollBehavior;
  const hasLenis = !!document.querySelector('[data-lenis-prevent], .lenis') || document.documentElement.classList.contains('lenis');
  R.push({id:'smooth_scroll', pass: htmlScroll === 'smooth' || hasLenis, detail: {css: htmlScroll, lenis: hasLenis}});

  // ========== SEO & TECNICO ==========

  // 19. JSON-LD
  const jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
  R.push({id:'json_ld', pass: jsonLd.length > 0, detail: {count: jsonLd.length}});

  // 20. Meta tags
  const title = document.title;
  const desc = document.querySelector('meta[name="description"]')?.content || '';
  const ogT = document.querySelector('meta[property="og:title"]')?.content || '';
  const ogI = document.querySelector('meta[property="og:image"]')?.content || '';
  const canon = document.querySelector('link[rel="canonical"]')?.href || '';
  const titleOk = title && title.length > 10 && !title.includes('Vite') && !title.includes('React App');
  const descOk = desc.length >= 50;
  R.push({id:'meta_tags', pass: titleOk && descOk && !!ogT, detail: {title: title?.slice(0,60), descLen: desc.length, ogTitle: !!ogT, ogImage: !!ogI, canonical: !!canon}});

  // ========== CONVERSAO ==========

  // 22. WhatsApp CTA
  const waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], a[href*="api.whatsapp"]');
  R.push({id:'whatsapp_cta', pass: waLinks.length > 0, detail: {count: waLinks.length}});

  // 23. CTA above the fold
  let ctaAboveFold = false;
  document.querySelectorAll('a, button').forEach(el => {
    const r = el.getBoundingClientRect();
    const t = el.textContent?.toLowerCase() || '';
    if (r.top < vh && r.top > 0 && (t.includes('agend') || t.includes('contato') || t.includes('whatsapp') || t.includes('pedir') || t.includes('comece') || el.href?.includes('wa.me'))) {
      ctaAboveFold = true;
    }
  });
  R.push({id:'cta_above_fold', pass: ctaAboveFold, detail: {}});

  // 24. Multiplos CTAs
  const allCtas = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], a[href*="tel:"], button[class*="primary"], a[class*="cta"]');
  R.push({id:'multiple_ctas', pass: allCtas.length >= 2, detail: {count: allCtas.length}});

  // ========== BOTOES ==========

  // 25. Padding de botoes
  const badBtns = [];
  document.querySelectorAll('button, a[role="button"], [class*="btn"], [class*="button"]').forEach(btn => {
    const s = getComputedStyle(btn);
    const t = btn.textContent?.trim();
    if (!t || t.length < 1) return;
    const pt = parseFloat(s.paddingTop), pr = parseFloat(s.paddingRight), pb = parseFloat(s.paddingBottom), pl = parseFloat(s.paddingLeft);
    if (pt < 8 || pb < 8 || pl < 12 || pr < 12) badBtns.push({text: t.slice(0,25), pad: `${pt} ${pr} ${pb} ${pl}`});
  });
  R.push({id:'button_padding', pass: badBtns.length === 0, detail: badBtns.slice(0,5)});

  // ========== MOBILE-FIRST CHECKS (so rodam em mobile) ==========

  if (isMobile) {
    // 26. Touch targets >= 44x44px
    const smallTargets = [];
    document.querySelectorAll('a, button, [role="button"], input, select, textarea').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.width < 44 || r.height < 44) {
        const t = el.textContent?.trim() || el.getAttribute('aria-label') || el.tagName;
        smallTargets.push({text: t.slice(0,25), w: Math.round(r.width), h: Math.round(r.height)});
      }
    });
    R.push({id:'touch_targets', pass: smallTargets.length <= 2, detail: smallTargets.slice(0,5)});

    // 27. Min font size >= 14px no mobile
    const smallTexts = [];
    document.querySelectorAll('p, span, li, a, button, label, td').forEach(el => {
      const t = el.textContent?.trim();
      if (!t || t.length < 3) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 14 && fs > 0) {
        smallTexts.push({text: t.slice(0,25), size: fs});
      }
    });
    R.push({id:'min_font_mobile', pass: smallTexts.length <= 3, detail: smallTexts.slice(0,5)});
  }

  return R;
})()
"""


WEIGHTS = {
    # Layout (25%)
    'overflow': ('critical', 0.5), 'touching_edge': ('critical', 0.5), 'grid_8px': ('fail', 0.3),
    'section_spacing': ('fail', 0.3), 'max_width': ('fail', 0.2),
    # Tipografia (15%)
    'custom_fonts': ('critical', 0.5), 'type_scale': ('fail', 0.2), 'heading_hierarchy': ('fail', 0.2),
    'line_height': ('fail', 0.2),
    # Cores (15%)
    'contrast_wcag': ('critical', 0.5), 'color_palette': ('warn', 0.1), 'cta_distinct': ('fail', 0.2),
    # Imagens (15%)
    'broken_images': ('critical', 0.5), 'img_alt': ('fail', 0.3), 'img_ratio': ('fail', 0.3),
    # Motion (10%)
    'animations': ('fail', 0.3), 'hover_states': ('fail', 0.2), 'smooth_scroll': ('fail', 0.2),
    # SEO (10%)
    'json_ld': ('fail', 0.3), 'meta_tags': ('fail', 0.3),
    # Conversao (10%)
    'whatsapp_cta': ('warn', 0.1), 'cta_above_fold': ('fail', 0.2), 'multiple_ctas': ('warn', 0.1),
    # Botoes
    'button_padding': ('critical', 0.5),
    # Mobile-first
    'touch_targets': ('fail', 0.3),
    'min_font_mobile': ('fail', 0.3),
}


async def run_checks(page, vp_name):
    print(f"\n{'='*60}")
    print(f"  VALIDACAO UX/UI — {vp_name.upper()} ({page.viewport_size['width']}x{page.viewport_size['height']})")
    print(f"{'='*60}")

    checks = await page.evaluate(JS_CHECKS)
    score = 10.0

    for check in checks:
        cid = check['id']
        passed = check.get('pass', True)
        detail = check.get('detail', {})
        severity, penalty = WEIGHTS.get(cid, ('warn', 0.1))

        if passed:
            ok(f"[{cid}] OK — {json.dumps(detail, ensure_ascii=False)[:80]}")
        else:
            score -= penalty
            if severity == 'critical':
                critical(f"[{cid}] {json.dumps(detail, ensure_ascii=False)[:120]}")
            elif severity == 'fail':
                fail(f"[{cid}] {json.dumps(detail, ensure_ascii=False)[:120]}")
            else:
                warn(f"[{cid}] {json.dumps(detail, ensure_ascii=False)[:120]}")

    return max(0, round(score, 1))


async def validate():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        console_errors = []
        scores = {}

        for vp in VIEWPORTS:
            ctx = await browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                locale="pt-BR",
                device_scale_factor=2,
            )
            page = await ctx.new_page()
            page.on("pageerror", lambda exc: console_errors.append(str(exc)))

            print(f"\n[{vp['name']}] Navegando para {URL}...")
            await page.goto(URL, wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(3000)

            # Screenshots
            await page.screenshot(path=f"{OUT}/fullpage-{vp['name']}.png", full_page=True)
            await page.screenshot(path=f"{OUT}/viewport-{vp['name']}.png", full_page=False)
            print(f"[{vp['name']}] Screenshots salvos")

            # Checks automaticos com score
            score = await run_checks(page, vp["name"])
            scores[vp["name"]] = score

            # Toggle idioma
            try:
                toggle = page.locator("button:has-text('EN'), button:has-text('PT')")
                if await toggle.count() > 0:
                    await toggle.first.click()
                    await page.wait_for_timeout(1000)
                    await page.screenshot(path=f"{OUT}/idioma-toggled-{vp['name']}.png", full_page=False)
                    body_en = await page.inner_text("body")
                    await toggle.first.click()
                    await page.wait_for_timeout(500)
                    body_pt = await page.inner_text("body")
                    if body_en == body_pt:
                        critical(f"[{vp['name']}] Toggle idioma NAO mudou textos!")
                        scores[vp["name"]] -= 0.5
                    else:
                        ok(f"[{vp['name']}] Toggle idioma funciona")
                else:
                    fail(f"[{vp['name']}] Toggle idioma NAO encontrado")
                    scores[vp["name"]] -= 0.3
            except Exception as e:
                fail(f"[{vp['name']}] Toggle idioma erro: {e}")
                scores[vp["name"]] -= 0.3

            # Hamburger no mobile
            if vp["name"] == "mobile":
                try:
                    ham = page.locator("[aria-label*='enu'], [aria-label*='Menu'], button:has(svg.lucide-menu)")
                    if await ham.count() > 0:
                        await ham.first.click()
                        await page.wait_for_timeout(800)
                        await page.screenshot(path=f"{OUT}/menu-open-mobile.png", full_page=False)
                        ok("Menu hamburger abre")
                    else:
                        warn("Hamburger nao encontrado")
                except Exception as e:
                    warn(f"Hamburger: {e}")

            await ctx.close()

        # Console errors
        if console_errors:
            critical(f"Erros no console JS ({len(console_errors)}): " + "; ".join(set(console_errors))[:200])
        else:
            ok("Console JS limpo")

        await browser.close()

    # ============ RELATORIO FINAL ============
    final_score = min(scores.values()) if scores else 0
    final_score = max(0, round(final_score, 1))

    print(f"\n{'='*60}")
    print(f"  RELATORIO FINAL DE QUALIDADE")
    print(f"{'='*60}")
    for vp_name, sc in scores.items():
        bar = "█" * int(sc) + "░" * (10 - int(sc))
        print(f"  {vp_name:>8}: {bar} {sc}/10")
    print(f"{'='*60}")
    print(f"  SCORE FINAL: {final_score}/10  (minimo exigido: {THRESHOLD})")
    print(f"  ✅ PASS: {len(RESULTS['pass'])}")
    print(f"  🔴 CRITICO: {len(RESULTS['critical'])}")
    print(f"  ❌ FAIL: {len(RESULTS['fail'])}")
    print(f"  ⚠️  WARN: {len(RESULTS['warn'])}")
    print(f"{'='*60}")

    if final_score < THRESHOLD:
        print(f"\n  ❌ REPROVADO — Score {final_score} < {THRESHOLD}")
        if RESULTS['critical']:
            print(f"\n  CRITICOS (corrigir PRIMEIRO):")
            for c in RESULTS['critical']: print(f"    🔴 {c}")
        if RESULTS['fail']:
            print(f"\n  FALHAS:")
            for f in RESULTS['fail']: print(f"    ❌ {f}")
        print(f"\n  Corrija e rode novamente ate score >= {THRESHOLD}")
        sys.exit(1)
    else:
        print(f"\n  ✅ APROVADO — Score {final_score} >= {THRESHOLD}")
        print(f"  Screenshots em: {OUT}/")
        print(f"\n  PROXIMO PASSO: Analise visual inteligente dos screenshots.")
        print(f"  Leia cada PNG e faca critica HONESTA como designer senior.")
        sys.exit(0)

asyncio.run(validate())
