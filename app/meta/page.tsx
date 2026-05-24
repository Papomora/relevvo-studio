'use client'
import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────
type Post  = { tipo: string; likes: number; comentarios: number; shares: number; alcance: number; descripcion: string }
type CPt   = { label: string; value: number }
type ETipo = { tipo: string; value: number }

interface DashData {
  cliente: string; periodo: string
  segActual: number; segAnterior: number
  engActual: number; engAnterior: number
  alcance: number; impresiones: number
  alcanceOrganico: number; impresionesOrganicas: number; engOrganico: number
  crecimiento: CPt[]
  topPosts: Post[]
  engTipos: ETipo[]
  fortalezas: string[]
  oportunidades: string[]
  recomendacion: string
}

// ── Default / example data ─────────────────────────────────────────
const DEFAULT: DashData = {
  cliente: 'Fresas la Playita', periodo: 'Abril 2026',
  segActual: 2450, segAnterior: 2187,
  engActual: 5.3,  engAnterior: 5.4,
  alcance: 8920, impresiones: 24531,
  alcanceOrganico: 6100, impresionesOrganicas: 17200, engOrganico: 4.8,
  crecimiento: [
    { label: 'Sem 1', value: 2187 }, { label: 'Sem 2', value: 2234 },
    { label: 'Sem 3', value: 2301 }, { label: 'Sem 4', value: 2380 },
    { label: 'Sem 5', value: 2450 },
  ],
  topPosts: [
    { tipo: 'Reel',    likes: 234, comentarios: 18, shares: 12, alcance: 3421, descripcion: 'Receta fresas con chocolate' },
    { tipo: 'Post',    likes: 156, comentarios: 24, shares: 8,  alcance: 2123, descripcion: 'Promoción de verano' },
    { tipo: 'Carrusel',likes: 189, comentarios: 32, shares: 15, alcance: 2856, descripcion: '' },
    { tipo: 'Story',   likes: 67,  comentarios: 5,  shares: 2,  alcance: 520,  descripcion: '' },
  ],
  engTipos: [
    { tipo: 'Reels', value: 7.2 }, { tipo: 'Posts', value: 4.1 },
    { tipo: 'Carrusel', value: 5.5 }, { tipo: 'Stories', value: 3.8 },
  ],
  fortalezas: [
    'Los Reels generan 75% más engagement que otros formatos',
    'Crecimiento consistente de la audiencia (+12%)',
    'Audiencia joven y comprometida (25-34 años)',
  ],
  oportunidades: [
    'Stories tienen baja retención — podrían optimizarse',
    'Poco contenido dirigido a audiencia de 45+ años',
    'Martes y miércoles registran menor actividad',
  ],
  recomendacion: 'Aumentar la frecuencia de Reels a 3-4 por semana, enfocarse en horarios pico (19:00–21:00) y crear contenido específico para la audiencia de 45+ años que representa el 20% de seguidores.',
}

// ── HTML generator ─────────────────────────────────────────────────
function generateHTML(d: DashData): string {
  const dSeg = d.segAnterior ? ((d.segActual - d.segAnterior) / d.segAnterior * 100) : 0
  const dEng = d.engAnterior ? ((d.engActual - d.engAnterior) / d.engAnterior * 100) : 0

  const rows = d.topPosts.map(p => `
    <tr>
      <td><span class="badge">${p.tipo}</span>${p.descripcion ? `<div style="font-size:11px;color:#999;margin-top:4px">${p.descripcion}</div>` : ''}</td>
      <td>${p.likes.toLocaleString('es-CO')}</td>
      <td>${p.comentarios.toLocaleString('es-CO')}</td>
      <td>${p.shares.toLocaleString('es-CO')}</td>
      <td>${p.alcance.toLocaleString('es-CO')}</td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Informe Redes Sociales — ${d.cliente}</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--p:#5E00A8;--s:#E91E8C;--bg:#0F0F1E;--ok:#2ECC71;--err:#E74C3C;--r:12px}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:var(--bg);color:#fff;line-height:1.6;padding:20px}
.wrap{max-width:1200px;margin:0 auto;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:var(--r);padding:40px;box-shadow:0 20px 60px rgba(0,0,0,.35)}
.hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;padding-bottom:28px;border-bottom:2px solid var(--s)}
.hd h1{font-size:30px;font-weight:700;background:linear-gradient(135deg,var(--p),var(--s));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hd p{color:#B0B0B0;font-size:14px;margin-top:4px}
.hd-r{text-align:right}.logo{font-size:17px;font-weight:700;color:var(--s);margin-bottom:6px}.dt{color:#B0B0B0;font-size:13px}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:18px;margin-bottom:40px}
.kpi{background:rgba(94,0,168,.1);border:1px solid var(--p);border-radius:var(--r);padding:22px;position:relative;overflow:hidden;transition:.3s}
.kpi:hover{border-color:var(--s);box-shadow:0 0 18px rgba(233,30,140,.2)}
.kpi-lbl{color:#B0B0B0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.kpi-v{font-size:34px;font-weight:700;margin-bottom:6px;background:linear-gradient(135deg,#fff,#ddd);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.chg{font-size:13px;font-weight:600}.up{color:var(--ok)}.dn{color:var(--err)}
.org{background:rgba(14,165,233,.08);border:2px solid #0EA5E9;border-radius:var(--r);padding:22px 28px;margin-bottom:40px}
.org-hd{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.org-badge{background:#0EA5E9;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:.08em}
.org-title{font-size:14px;font-weight:700;color:#38BDF8}
.org-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
.org-item{background:rgba(14,165,233,.12);border:1px solid rgba(14,165,233,.3);border-radius:10px;padding:16px}
.org-lbl{font-size:11px;color:#7DD3FC;font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.org-v{font-size:26px;font-weight:700;color:#fff}
.org-pct{font-size:12px;color:#38BDF8;margin-top:4px}
.charts{display:grid;grid-template-columns:repeat(auto-fit,minmax(460px,1fr));gap:28px;margin-bottom:40px}
.cb{background:rgba(94,0,168,.08);border:1px solid rgba(233,30,140,.3);border-radius:var(--r);padding:24px}
.ct{font-size:15px;font-weight:700;margin-bottom:16px}
.cw{position:relative;height:280px}
table{width:100%;margin-bottom:40px;border-collapse:collapse;background:rgba(94,0,168,.08);border:1px solid rgba(233,30,140,.3);border-radius:var(--r);overflow:hidden}
thead{background:linear-gradient(135deg,var(--p),var(--s))}
th{padding:15px 18px;text-align:left;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1px}
td{padding:13px 18px;border-top:1px solid rgba(233,30,140,.18)}
tbody tr:hover{background:rgba(233,30,140,.07)}
.badge{display:inline-block;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:rgba(233,30,140,.2);color:var(--s)}
.ins{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:18px;margin-bottom:40px}
.ibox{background:rgba(94,0,168,.1);border-left:4px solid var(--s);border-radius:var(--r);padding:20px}
.itl{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--s);margin-bottom:10px}
.ilst{list-style:none}
.ilst li{padding:7px 0 7px 18px;color:#E8E8E8;font-size:13px;position:relative}
.ilst li:before{content:'→';position:absolute;left:0;color:var(--s);font-weight:700}
.rec{background:linear-gradient(135deg,rgba(46,204,113,.1),rgba(233,30,140,.1));border:2px solid var(--ok);border-radius:var(--r);padding:28px;margin-bottom:40px}
.rct{color:var(--ok);font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.rcx{font-size:15px;line-height:1.8}
footer{border-top:2px solid rgba(233,30,140,.25);padding-top:26px;text-align:center;color:#B0B0B0;font-size:12px;line-height:2.2}
@media(max-width:768px){.wrap{padding:20px}.hd{flex-direction:column;gap:16px}.hd-r{text-align:left}.kpis,.charts,.ins{grid-template-columns:1fr}.kpi-v{font-size:26px}}
@media print{
  body{background:#fff;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .wrap{box-shadow:none;max-width:100%;border-radius:0;padding:30px}
  .kpi{break-inside:avoid}.charts{break-inside:avoid}
}
</style>
</head>
<body>
<div class="wrap">
  <div class="hd">
    <div>
      <h1>Informe de Redes Sociales</h1>
      <p style="font-size:17px;font-weight:600;color:#fff;margin-top:6px">${d.cliente}</p>
      <p style="margin-top:10px">Período: <strong style="color:#fff">${d.periodo}</strong></p>
    </div>
    <div class="hd-r">
      <div class="logo">RELEVVO STUDIO</div>
      <div class="dt">Generado: ${new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}</div>
    </div>
  </div>

  <div class="kpis">
    <div class="kpi"><div class="kpi-lbl">Seguidores</div><div class="kpi-v">${d.segActual.toLocaleString('es-CO')}</div><div class="chg ${dSeg>=0?'up':'dn'}">${dSeg>=0?'↑':'↓'} ${Math.abs(dSeg).toFixed(1)}% vs anterior</div></div>
    <div class="kpi"><div class="kpi-lbl">Engagement Rate</div><div class="kpi-v">${d.engActual}%</div><div class="chg ${dEng>=0?'up':'dn'}">${dEng>=0?'↑':'↓'} ${Math.abs(dEng).toFixed(1)}% vs anterior</div></div>
    <div class="kpi"><div class="kpi-lbl">Alcance Total</div><div class="kpi-v">${d.alcance.toLocaleString('es-CO')}</div></div>
    <div class="kpi"><div class="kpi-lbl">Impresiones</div><div class="kpi-v">${d.impresiones.toLocaleString('es-CO')}</div></div>
  </div>

  <div class="org">
    <div class="org-hd">
      <span class="org-badge">Orgánico</span>
      <span class="org-title">Rendimiento de Contenido Orgánico</span>
    </div>
    <div class="org-grid">
      <div class="org-item">
        <div class="org-lbl">Alcance Orgánico</div>
        <div class="org-v">${d.alcanceOrganico.toLocaleString('es-CO')}</div>
        <div class="org-pct">${d.alcance > 0 ? Math.round(d.alcanceOrganico/d.alcance*100) : 0}% del alcance total</div>
      </div>
      <div class="org-item">
        <div class="org-lbl">Impresiones Orgánicas</div>
        <div class="org-v">${d.impresionesOrganicas.toLocaleString('es-CO')}</div>
        <div class="org-pct">${d.impresiones > 0 ? Math.round(d.impresionesOrganicas/d.impresiones*100) : 0}% de impresiones totales</div>
      </div>
      <div class="org-item">
        <div class="org-lbl">Engagement Orgánico</div>
        <div class="org-v">${d.engOrganico}%</div>
        <div class="org-pct">vs ${d.engActual}% engagement total</div>
      </div>
      <div class="org-item">
        <div class="org-lbl">Alcance Pagado</div>
        <div class="org-v">${Math.max(0, d.alcance - d.alcanceOrganico).toLocaleString('es-CO')}</div>
        <div class="org-pct">${d.alcance > 0 ? Math.round(Math.max(0,d.alcance-d.alcanceOrganico)/d.alcance*100) : 0}% del alcance total</div>
      </div>
    </div>
  </div>

  <div class="charts">
    <div class="cb"><div class="ct">Crecimiento de Seguidores</div><div class="cw"><canvas id="gc"></canvas></div></div>
    <div class="cb"><div class="ct">Engagement por Tipo de Contenido (%)</div><div class="cw"><canvas id="ec"></canvas></div></div>
  </div>

  <table>
    <thead><tr><th>Tipo de Contenido</th><th>Likes</th><th>Comentarios</th><th>Compartidas</th><th>Alcance</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="ins">
    <div class="ibox"><div class="itl">✓ Fortalezas</div><ul class="ilst">${d.fortalezas.map(f=>`<li>${f}</li>`).join('')}</ul></div>
    <div class="ibox"><div class="itl">⚡ Oportunidades</div><ul class="ilst">${d.oportunidades.map(o=>`<li>${o}</li>`).join('')}</ul></div>
  </div>

  <div class="rec">
    <div class="rct">💡 Recomendación Próximo Período</div>
    <div class="rcx">${d.recomendacion}</div>
  </div>

  <footer>
    Reporte generado por <strong>Relevvo Studio</strong><br>
    hola@relevvostudio.com &nbsp;·&nbsp; +57 322 309 4005 &nbsp;·&nbsp; www.relevvostudio.com<br>
    <em>Creatividad con método. Resultados con intención.</em>
  </footer>
</div>
<script>
(function(){
  var gc=document.getElementById('gc').getContext('2d');
  new Chart(gc,{type:'line',data:{labels:${JSON.stringify(d.crecimiento.map(p=>p.label))},datasets:[{data:${JSON.stringify(d.crecimiento.map(p=>p.value))},borderColor:'#E91E8C',backgroundColor:'rgba(233,30,140,0.12)',borderWidth:3,fill:true,tension:0.4,pointRadius:6,pointBackgroundColor:'#E91E8C',pointBorderColor:'#fff',pointBorderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:false,grid:{color:'rgba(255,255,255,0.07)'},ticks:{color:'#B0B0B0'}},x:{grid:{display:false},ticks:{color:'#B0B0B0'}}}}});
  var ec=document.getElementById('ec').getContext('2d');
  new Chart(ec,{type:'bar',data:{labels:${JSON.stringify(d.engTipos.map(t=>t.tipo))},datasets:[{data:${JSON.stringify(d.engTipos.map(t=>t.value))},backgroundColor:['#E91E8C','#5E00A8','#A855F7','#EC4899','#7C3AED','#F97316'],borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:'rgba(255,255,255,0.07)'},ticks:{color:'#B0B0B0',callback:function(v){return v+'%'}}},x:{grid:{display:false},ticks:{color:'#B0B0B0'}}}}});
})();
</script>
</body>
</html>`
}

// ── JSON parser (accepts meta_dashboard_claude_code.md format) ────
function parseJSON(raw: string): DashData {
  try {
    const j = JSON.parse(raw)
    const ig = j.redes?.instagram ?? j.instagram ?? j
    return {
      cliente: j.cliente ?? 'Cliente',
      periodo: j.periodo ?? '',
      segActual:   ig.seguidores?.actual ?? ig.seguidores ?? 0,
      segAnterior: ig.seguidores?.anterior ?? 0,
      engActual:   ig.engagement?.rate ?? ig.engagement_rate?.actual ?? 0,
      engAnterior: ig.engagement_rate?.anterior ?? 0,
      alcance:     ig.alcance ?? 0,
      impresiones: ig.impresiones ?? 0,
      alcanceOrganico:      ig.alcance_organico ?? ig.alcanceOrganico ?? 0,
      impresionesOrganicas: ig.impresiones_organicas ?? ig.impresionesOrganicas ?? 0,
      engOrganico:          ig.engagement_organico ?? ig.engOrganico ?? 0,
      crecimiento: ig.crecimiento_diario?.map((p: any, i: number) => ({
        label: p.fecha ? new Date(p.fecha).toLocaleDateString('es-CO',{month:'short',day:'numeric'}) : `Sem ${i+1}`,
        value: p.seguidores ?? Number(p),
      })) ?? DEFAULT.crecimiento,
      topPosts: ig.contenido_top?.map((p: any) => ({
        tipo: p.tipo ?? '', likes: p.likes ?? 0, comentarios: p.comentarios ?? 0,
        shares: p.shares ?? 0, alcance: p.alcance ?? 0, descripcion: p.descripcion ?? '',
      })) ?? DEFAULT.topPosts,
      engTipos: ig.engagement_por_tipo
        ? Object.entries(ig.engagement_por_tipo).map(([tipo, value]) => ({ tipo, value: Number(value) }))
        : DEFAULT.engTipos,
      fortalezas: j.insights?.fortalezas ?? DEFAULT.fortalezas,
      oportunidades: j.insights?.oportunidades ?? DEFAULT.oportunidades,
      recomendacion: j.insights?.recomendacion ?? DEFAULT.recomendacion,
    }
  } catch { return DEFAULT }
}

// ── Page ──────────────────────────────────────────────────────────
export default function MetaPage() {
  const [tab, setTab]         = useState<'form'|'json'>('form')
  const [data, setData]       = useState<DashData>(DEFAULT)
  const [jsonIn, setJsonIn]   = useState('')
  const [preview, setPreview] = useState<string|null>(null)
  const [htmlOut, setHtmlOut] = useState<string|null>(null)
  const [generated, setGenerated] = useState(false)

  const T = {
    bg: '#0A0A0A', card: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)',
    muted: '#6B7280', primary: '#D2BBFF', accent: '#7C3AED', surface: '#1C1B1B',
    text: '#E5E2E1',
  }
  const inp: React.CSSProperties = {
    background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10,
    padding: '9px 14px', fontSize: 13, color: '#fff', outline: 'none', width: '100%',
    fontFamily: 'inherit', colorScheme: 'dark',
  }
  const lbl: React.CSSProperties = {
    fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '.08em', display: 'block', marginBottom: 5,
  }
  const section: React.CSSProperties = {
    background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '24px 28px', marginBottom: 16,
  }

  function set<K extends keyof DashData>(k: K, v: DashData[K]) { setData(d => ({ ...d, [k]: v })) }
  function setPost(i: number, k: keyof Post, v: any) {
    setData(d => { const p = [...d.topPosts]; p[i] = { ...p[i], [k]: v }; return { ...d, topPosts: p } })
  }
  function setEng(i: number, k: keyof ETipo, v: any) {
    setData(d => { const e = [...d.engTipos]; e[i] = { ...e[i], [k]: v }; return { ...d, engTipos: e } })
  }
  function setCrr(i: number, k: keyof CPt, v: any) {
    setData(d => { const c = [...d.crecimiento]; c[i] = { ...c[i], [k]: v }; return { ...d, crecimiento: c } })
  }

  function generate() {
    const d = tab === 'json' ? parseJSON(jsonIn) : data
    const h = generateHTML(d)
    setHtmlOut(h)
    const blob = new Blob([h], { type: 'text/html' })
    setPreview(URL.createObjectURL(blob))
    setGenerated(true)
    setTimeout(() => document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  function download() {
    if (!htmlOut) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([htmlOut], { type: 'text/html' }))
    a.download = `Reporte_Meta_${data.cliente.replace(/\s+/g,'_')}_${new Date().toISOString().slice(0,7)}.html`
    a.click()
  }

  function openForPDF() {
    if (!htmlOut) return
    window.open(URL.createObjectURL(new Blob([htmlOut], { type: 'text/html' })), '_blank')
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"/>

      <div style={{ minHeight: '100vh', background: T.bg, fontFamily: "'Inter', system-ui, sans-serif", color: T.text }}>

        {/* Header */}
        <div style={{ background: 'rgba(19,19,19,0.9)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}`, padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 12, color: T.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 4 }}>Relevvo Studio</p>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-.03em', lineHeight: 1 }}>Generador de Reportes Meta</h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="/" style={{ padding: '8px 16px', borderRadius: 10, border: `1px solid ${T.border}`, color: T.muted, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
              ← Volver
            </a>
            {generated && (
              <>
                <button onClick={download} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(124,58,237,0.2)', color: T.primary, fontSize: 13, fontWeight: 700 }}>
                  ⬇ Descargar HTML
                </button>
                <button onClick={openForPDF} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7C3AED,#D2BBFF)', color: '#fff', fontSize: 13, fontWeight: 700 }}>
                  🖨 Exportar PDF
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

          {/* Tab selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {(['form', 'json'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '9px 22px', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 700,
                background: tab === t ? 'linear-gradient(135deg,#7C3AED,#D2BBFF)' : T.card,
                color: tab === t ? '#fff' : T.muted,
                border: tab === t ? 'none' : `1px solid ${T.border}`,
              }}>
                {t === 'form' ? '📝 Formulario' : '{ } Pegar JSON'}
              </button>
            ))}
          </div>

          {tab === 'json' ? (
            /* ── JSON Mode ── */
            <div style={section}>
              <label style={lbl}>Pega el JSON exportado de Meta Business Suite</label>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>Acepta el formato de meta_dashboard_claude_code.md (campos: cliente, periodo, redes.instagram…)</p>
              <textarea
                value={jsonIn} onChange={e => setJsonIn(e.target.value)} rows={18}
                placeholder={'{\n  "cliente": "Mi Marca",\n  "periodo": "Abril 2026",\n  "redes": {\n    "instagram": {\n      "seguidores": { "actual": 5000, "anterior": 4500 },\n      ...\n    }\n  }\n}'}
                style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }}
              />
            </div>
          ) : (
            /* ── Form Mode ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* General */}
              <div style={section}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16 }}>Datos generales</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={lbl}>Cliente</label><input style={inp} value={data.cliente} onChange={e => set('cliente', e.target.value)}/></div>
                  <div><label style={lbl}>Período</label><input style={inp} value={data.periodo} onChange={e => set('periodo', e.target.value)} placeholder="Ej: Abril 2026"/></div>
                </div>
              </div>

              {/* KPIs */}
              <div style={section}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16 }}>KPIs del período</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                  <div><label style={lbl}>Seguidores (actual)</label><input style={inp} type="number" value={data.segActual} onChange={e => set('segActual', +e.target.value)}/></div>
                  <div><label style={lbl}>Seguidores (anterior)</label><input style={inp} type="number" value={data.segAnterior} onChange={e => set('segAnterior', +e.target.value)}/></div>
                  <div><label style={lbl}>Engagement % (actual)</label><input style={inp} type="number" step="0.1" value={data.engActual} onChange={e => set('engActual', +e.target.value)}/></div>
                  <div><label style={lbl}>Engagement % (anterior)</label><input style={inp} type="number" step="0.1" value={data.engAnterior} onChange={e => set('engAnterior', +e.target.value)}/></div>
                  <div><label style={lbl}>Alcance total</label><input style={inp} type="number" value={data.alcance} onChange={e => set('alcance', +e.target.value)}/></div>
                  <div><label style={lbl}>Impresiones</label><input style={inp} type="number" value={data.impresiones} onChange={e => set('impresiones', +e.target.value)}/></div>
                </div>
              </div>

              {/* Contenido Orgánico */}
              <div style={{ ...section, border: '1px solid rgba(14,165,233,0.35)', background: 'rgba(14,165,233,0.05)' }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>
                  📸 Contenido Orgánico
                </h3>
                <p style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>Copia estos números del pantallazo de Meta Business Suite → sección "Alcance" filtrando por "Orgánico"</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                  <div><label style={{ ...lbl, color: '#7DD3FC' }}>Alcance orgánico</label><input style={{ ...inp, borderColor: 'rgba(14,165,233,0.4)' }} type="number" value={data.alcanceOrganico} onChange={e => set('alcanceOrganico', +e.target.value)}/></div>
                  <div><label style={{ ...lbl, color: '#7DD3FC' }}>Impresiones orgánicas</label><input style={{ ...inp, borderColor: 'rgba(14,165,233,0.4)' }} type="number" value={data.impresionesOrganicas} onChange={e => set('impresionesOrganicas', +e.target.value)}/></div>
                  <div><label style={{ ...lbl, color: '#7DD3FC' }}>Engagement orgánico %</label><input style={{ ...inp, borderColor: 'rgba(14,165,233,0.4)' }} type="number" step="0.1" value={data.engOrganico} onChange={e => set('engOrganico', +e.target.value)}/></div>
                </div>
              </div>

              {/* Crecimiento */}
              <div style={section}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16 }}>Crecimiento de seguidores (por semana)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                  {data.crecimiento.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <input style={{ ...inp, textAlign: 'center', fontSize: 11 }} value={pt.label} onChange={e => setCrr(i, 'label', e.target.value)}/>
                      <input style={{ ...inp, textAlign: 'center' }} type="number" value={pt.value} onChange={e => setCrr(i, 'value', +e.target.value)}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement por tipo */}
              <div style={section}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16 }}>Engagement por tipo de contenido (%)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {data.engTipos.map((et, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <input style={{ ...inp, fontSize: 11 }} value={et.tipo} onChange={e => setEng(i, 'tipo', e.target.value)}/>
                      <input style={inp} type="number" step="0.1" value={et.value} onChange={e => setEng(i, 'value', +e.target.value)}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top posts */}
              <div style={section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.1em' }}>Top posts del período</h3>
                  <button onClick={() => set('topPosts', [...data.topPosts, { tipo: 'Post', likes: 0, comentarios: 0, shares: 0, alcance: 0, descripcion: '' }])}
                    style={{ padding: '5px 14px', borderRadius: 8, border: `1px solid ${T.border}`, background: 'transparent', color: T.primary, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    + Agregar fila
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.topPosts.map((p, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 80px 80px 80px 90px 1fr 36px', gap: 8, alignItems: 'center' }}>
                      <input style={inp} value={p.tipo} onChange={e => setPost(i,'tipo',e.target.value)} placeholder="Tipo"/>
                      <input style={{ ...inp, textAlign: 'center' }} type="number" value={p.likes} onChange={e => setPost(i,'likes',+e.target.value)} placeholder="Likes"/>
                      <input style={{ ...inp, textAlign: 'center' }} type="number" value={p.comentarios} onChange={e => setPost(i,'comentarios',+e.target.value)} placeholder="Cmts"/>
                      <input style={{ ...inp, textAlign: 'center' }} type="number" value={p.shares} onChange={e => setPost(i,'shares',+e.target.value)} placeholder="Shares"/>
                      <input style={{ ...inp, textAlign: 'center' }} type="number" value={p.alcance} onChange={e => setPost(i,'alcance',+e.target.value)} placeholder="Alcance"/>
                      <input style={inp} value={p.descripcion} onChange={e => setPost(i,'descripcion',e.target.value)} placeholder="Descripción (opcional)"/>
                      <button onClick={() => set('topPosts', data.topPosts.filter((_,j)=>j!==i))} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(248,113,113,0.12)', color: '#F87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                    </div>
                  ))}
                </div>
                {data.topPosts.length === 0 && <p style={{ fontSize: 12, color: T.muted }}>Sin posts — usa "+ Agregar fila"</p>}
              </div>

              {/* Insights */}
              <div style={section}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16 }}>Insights</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label style={lbl}>✓ Fortalezas (una por línea)</label>
                    <textarea rows={4} style={{ ...inp, resize: 'none' }}
                      value={data.fortalezas.join('\n')}
                      onChange={e => set('fortalezas', e.target.value.split('\n').filter(Boolean))}/>
                  </div>
                  <div>
                    <label style={lbl}>⚡ Oportunidades (una por línea)</label>
                    <textarea rows={4} style={{ ...inp, resize: 'none' }}
                      value={data.oportunidades.join('\n')}
                      onChange={e => set('oportunidades', e.target.value.split('\n').filter(Boolean))}/>
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={lbl}>💡 Recomendación próximo período</label>
                  <textarea rows={3} style={{ ...inp, resize: 'none' }}
                    value={data.recomendacion}
                    onChange={e => set('recomendacion', e.target.value)}/>
                </div>
              </div>
            </div>
          )}

          {/* Generate button */}
          <button onClick={generate} style={{
            width: '100%', padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #7C3AED, #D2BBFF)',
            color: '#fff', fontSize: 16, fontWeight: 800, letterSpacing: '-.01em',
            boxShadow: '0 8px 32px rgba(124,58,237,0.35)',
            marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            ✦ Generar Dashboard
          </button>

          {/* Preview */}
          {preview && (
            <div id="preview-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Vista previa del reporte</h2>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={download} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(124,58,237,0.2)', color: T.primary, fontSize: 13, fontWeight: 700 }}>
                    ⬇ Descargar .html
                  </button>
                  <button onClick={openForPDF} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7C3AED,#D2BBFF)', color: '#fff', fontSize: 13, fontWeight: 700 }}>
                    🖨 Abrir para PDF / imagen
                  </button>
                </div>
              </div>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 14 }}>
                Para exportar como imagen o PDF: haz clic en "Abrir para PDF / imagen" → Ctrl+P → Guardar como PDF (o usa una extensión de screenshot para imagen).
              </p>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${T.border}` }}>
                <iframe src={preview} style={{ width: '100%', height: 900, border: 'none', display: 'block' }} title="Preview reporte Meta"/>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
