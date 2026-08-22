import{f as m,e as j,c as k,a as p,v as z,d as B,r as M,b as D,s as x,g as P,h as A,i as f,j as F,S as u,k as L,l as S}from"./index-BHZ9XVv3.js";const e=t=>String(t??"").replace(/[&<>"]/g,l=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[l]),O=`
@page { size: A4; margin: 14mm 14mm 16mm; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font: 10.5pt/1.45 "Golos Text", -apple-system, system-ui, sans-serif;
  color: #16181B; background: #fff;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.page { page-break-after: always; break-after: page; padding-bottom: 4mm; }
.page:last-child { page-break-after: auto; break-after: auto; }
h1 { font-size: 26pt; line-height: 1.1; margin: 0 0 2mm; letter-spacing: -0.02em; }
h2 { font-size: 13pt; margin: 0 0 3mm; padding-bottom: 1.5mm; border-bottom: 1.5pt solid #16181B; }
h3 { font-size: 11pt; margin: 5mm 0 2mm; }
.sub { color: #5A6068; font-size: 10pt; }
.mono { font-family: "SF Mono", ui-monospace, Menlo, monospace; font-variant-numeric: tabular-nums; }
table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
th { text-align: left; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.06em;
     color: #5A6068; border-bottom: 0.8pt solid #16181B; padding: 1.5mm 1.5mm; }
td { padding: 1.6mm 1.5mm; border-bottom: 0.4pt solid #C9CDD2; vertical-align: top; }
tr { break-inside: avoid; }
td.r, th.r { text-align: right; }
.kv { display: grid; grid-template-columns: 42mm 1fr; gap: 1mm 3mm; font-size: 10pt; }
.kv dt { color: #5A6068; }
.kv dd { margin: 0; font-weight: 500; }
.cover { height: 245mm; display: flex; flex-direction: column; }
.cover .mid { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.plate { display: inline-block; border: 2pt solid #16181B; border-radius: 3mm;
         padding: 3mm 6mm; font-size: 22pt; font-weight: 700; letter-spacing: 0.06em; }
.pub { display: flex; align-items: center; gap: 2.5mm; font-size: 11pt; font-weight: 700; }
.pub svg { width: 7mm; height: 7mm; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 4mm 0; }
.stat { border: 0.6pt solid #C9CDD2; border-radius: 2mm; padding: 3mm; }
.stat .lbl { font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.06em; color: #5A6068; }
.stat .val { font-size: 14pt; font-weight: 700; margin-top: 1mm; }
.note { font-size: 8.5pt; color: #5A6068; margin-top: 2mm; }
.blank td { height: 9mm; }
.stamp { border: 0.6pt dashed #8A9099; border-radius: 2mm; height: 26mm; }
.sig { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 4mm; }
.sigline { border-bottom: 0.6pt solid #16181B; height: 12mm; }
/* Колонтитулът е за печат — на екран само пречи. */
.foot { display: none; }
@media print {
  .foot { position: fixed; bottom: 6mm; left: 14mm; right: 14mm;
          font-size: 8pt; color: #8A9099; display: flex; justify-content: space-between; }
}
/* На екран страниците се виждат като листове, за да се провери подредбата. */
@media screen {
  body { background: #E9EBEF; padding: 8mm 0; }
  .page { background: #fff; width: 210mm; max-width: calc(100% - 8mm);
          margin: 0 auto 8mm; padding: 14mm 14mm 16mm; min-height: 297mm;
          box-shadow: 0 2px 12px rgb(0 0 0 / 0.15); }
}
.badge { display: inline-block; border: 0.6pt solid #16181B; border-radius: 6pt;
         padding: 0.5mm 2mm; font-size: 8pt; }
`,C='<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="3" fill="#FDDC00"/><path fill="#16181B" transform="translate(12 12) scale(0.82) translate(-12 -12)" d="M3 4H7.2L12 13.2 16.8 4H21v16h-3.4V9.4l-4.5 8.2h-2.2L6.4 9.4V20H3z"/></svg>';function I(t,l){const d=j(t.car.engineId),s=k(t);return`<section class="page cover">
    <div class="pub">${C}<span>${e(u.appName)}</span></div>
    <div class="mid">
      <h1>Сервизна книжка</h1>
      <div class="sub" style="margin-bottom:8mm">Opel Mokka · ${e(d.label)}${t.car.lpg?" · с газова уредба (LPG)":""}</div>
      ${t.car.plate?`<div class="plate">${e(t.car.plate)}</div>`:""}
      <dl class="kv" style="margin-top:10mm">
        ${t.car.vin?`<dt>VIN</dt><dd class="mono">${e(t.car.vin)}</dd>`:""}
        ${t.car.firstReg?`<dt>Първа регистрация</dt><dd>${e(m(t.car.firstReg,l))}</dd>`:""}
        <dt>Километраж</dt><dd class="mono">${e(s?p(s.odo):p(t.car.odoStart))}${s?` <span class="sub">(${e(m(s.date,l))})</span>`:""}</dd>
        <dt>Гориво</dt><dd>${t.car.lpg?"бензин + газ (LPG)":"бензин"}</dd>
      </dl>
    </div>
    <div class="sub">Издадена от ${e(u.appName)} · ${e(m(l,l))} — личен инструмент
      на собственика. Не е официална сервизна книжка на Opel.</div>
  </section>`}function N(t,l){const d=k(t),s=z(t.fuel,B(t)),c=s.length?s.reduce((o,r)=>o+r.l100,0)/s.length:null,i=t.fuel.reduce((o,r)=>o+r.cents,0),n=t.service.records.reduce((o,r)=>o+M(r),0),h=D(t.fuel),b=x(t.fuel)[0],g=d&&b?d.odo-b.odo:0,v=P(t,l).filter(o=>o.spec.bg==="required");return`<section class="page">
    <h2>Обобщение</h2>
    <div class="stats">
      <div class="stat"><div class="lbl">Изминати (води се)</div><div class="val mono">${e(p(g))}</div></div>
      <div class="stat"><div class="lbl">Среден разход</div><div class="val mono">${c!=null?e(A(c)):"—"}</div></div>
      <div class="stat"><div class="lbl">Гориво общо</div><div class="val mono">${e(f(i))}</div></div>
      <div class="stat"><div class="lbl">Обслужване общо</div><div class="val mono">${e(f(n))}</div></div>
    </div>
    <div class="note">Цена на километър от горивото: ${h!=null?`<b class="mono">${(h/100).toFixed(3).replace(".",",")} €/км</b>`:"—"} ·
      Записи за гориво: ${t.fuel.length} · Обслужвания: ${t.service.records.length}</div>

    <h3>Срокове и документи</h3>
    <table>
      <thead><tr><th>Позиция</th><th>Състояние</th></tr></thead>
      <tbody>
        <tr><td>ГТП (технически преглед)</td><td>${t.deadlines.gtp.validTo?`валиден до <b>${e(m(t.deadlines.gtp.validTo,l))}</b>`:"—"}</td></tr>
        <tr><td>Гражданска отговорност</td><td>${t.deadlines.go?`полица от ${e(m(t.deadlines.go.start,l))}, ${e(t.deadlines.go.installments)} вноски`:"—"}</td></tr>
        <tr><td>Данък МПС</td><td>${Object.entries(t.deadlines.tax.years).map(([o,r])=>`${e(o)}: ${r==="none"?"неплатен":r==="first-paid"?"1-ва вноска":"платен"}`).join(" · ")||"—"}</td></tr>
        ${t.car.lpg&&t.deadlines.lpgBottle?`<tr><td>Газова бутилка</td><td>произведена ${e(m(t.deadlines.lpgBottle.mfgDate,l))} · ${t.deadlines.lpgBottle.inTitle?"вписана в талона":"НЕ е вписана в талона"}</td></tr>`:""}
      </tbody>
    </table>

    <h3>Задължително оборудване</h3>
    <table>
      <thead><tr><th>Позиция</th><th>Състояние</th></tr></thead>
      <tbody>
        ${v.map(o=>`<tr><td>${e(o.spec.label)}</td><td>${e(o.statusText)}</td></tr>`).join("")}
      </tbody>
    </table>
  </section>`}function T(t,l){const d=F(t.car.engineId,t.car.lpg),s=i=>{var n;return((n=d.find(h=>h.id===i))==null?void 0:n.label)??i},c=[...t.service.records].sort((i,n)=>i.date<n.date?-1:1);return`<section class="page">
    <h2>История на обслужването</h2>
    ${c.length?`<table>
      <thead><tr><th>Дата</th><th class="r">Км</th><th>Извършено</th><th>Сервиз</th><th class="r">Цена</th></tr></thead>
      <tbody>${c.map(i=>`<tr>
        <td class="mono">${e(m(i.date,l))}</td>
        <td class="r mono">${i.odo!=null?e(p(i.odo)):""}</td>
        <td>${e(s(i.itemId))}${i.note?`<div class="sub">${e(i.note)}</div>`:""}</td>
        <td>${e(i.shop??"")}</td>
        <td class="r mono">${i.cents!=null?e(f(i.cents)):""}</td>
      </tr>`).join("")}</tbody>
    </table>`:'<div class="sub">Няма вписани обслужвания.</div>'}

    <h3>Планирани интервали за този двигател</h3>
    <table>
      <thead><tr><th>Позиция</th><th class="r">Интервал (км)</th><th class="r">Интервал (месеци)</th></tr></thead>
      <tbody>${d.filter(i=>i.kind!=="reference").map(i=>`<tr>
        <td>${e(i.label)}</td>
        <td class="r mono">${i.km?e(p(i.km)):"—"}</td>
        <td class="r mono">${i.months??"—"}</td>
      </tr>`).join("")}</tbody>
    </table>
    <div class="note">Интервалите са консервативни и важат за избрания двигател. При каране на газ свещите и филтрите се сменят по-рано.</div>
  </section>`}function q(t,l){const d=[...t.fuel.map(a=>({date:a.date,odo:a.odo,src:"зареждане"})),...t.odoPings.map(a=>({date:a.date,odo:a.odo,src:"отчет"})),...t.service.records.filter(a=>a.odo!=null).map(a=>({date:a.date,odo:a.odo,src:"сервиз"}))].sort((a,$)=>a.date<$.date?-1:1);if(!d.length)return"";const s=d.map(a=>a.odo),c=Math.min(...s),i=Math.max(...s),n=Date.parse(d[0].date),h=Date.parse(d[d.length-1].date),b=170,g=60,v=a=>h===n?0:(Date.parse(a)-n)/(h-n)*b,o=a=>i===c?g:g-(a-c)/(i-c)*g,r=d.map((a,$)=>`${$?"L":"M"}${v(a.date).toFixed(1)},${o(a.odo).toFixed(1)}`).join(""),y=new Map;for(const a of d)y.set(a.date.slice(0,7),a);const w=[...y.values()];return`<section class="page">
    <h2>Километраж във времето</h2>
    <div class="sub">Всяка точка е запис по време на ползване (зареждане, отчет или обслужване).</div>
    <svg viewBox="0 0 ${b} ${g+8}" style="width:100%;height:46mm;margin:4mm 0">
      <path d="${r}" fill="none" stroke="#16181B" stroke-width="0.8"/>
      ${d.map(a=>`<circle cx="${v(a.date).toFixed(1)}" cy="${o(a.odo).toFixed(1)}" r="0.9" fill="#16181B"/>`).join("")}
    </svg>
    <table>
      <thead><tr><th>Месец</th><th class="r">Километраж</th><th>Източник</th></tr></thead>
      <tbody>${w.map(a=>`<tr><td class="mono">${e(a.date)}</td><td class="r mono">${e(p(a.odo))}</td><td class="sub">${e(a.src)}</td></tr>`).join("")}</tbody>
    </table>
  </section>`}function H(t,l){const d=x(t.fuel).reverse().slice(0,40);return d.length?`<section class="page">
    <h2>Зареждания (последни ${d.length})</h2>
    <table>
      <thead><tr><th>Дата</th><th class="r">Км</th><th>Гориво</th><th class="r">Литри</th><th class="r">Цена/л</th><th class="r">Сума</th><th>Станция</th></tr></thead>
      <tbody>${d.map(s=>`<tr>
        <td class="mono">${e(m(s.date,l))}</td>
        <td class="r mono">${e(p(s.odo))}</td>
        <td>${e(u.fuel.types[s.fuelType])}${s.full?"":' <span class="badge">частично</span>'}</td>
        <td class="r mono">${s.liters!=null?e(L(s.liters)):""}</td>
        <td class="r mono">${s.priceMilli!=null?e(S(s.priceMilli)):""}</td>
        <td class="r mono">${e(f(s.cents))}</td>
        <td>${e(s.station??"")}</td>
      </tr>`).join("")}</tbody>
    </table>
  </section>`:""}function R(t,l){const d=t.tires.sets;return d.length?`<section class="page">
    <h2>Гуми</h2>
    <table>
      <thead><tr><th>Комплект</th><th>Сезон</th><th class="r">Грайфер</th><th>Измерено</th><th>Смени</th><th>Бележка</th></tr></thead>
      <tbody>${d.map(s=>`<tr>
        <td>${e(s.label)}${s.mounted?' <span class="badge">на колата</span>':""}${s.archived?' <span class="sub">(архив)</span>':""}</td>
        <td>${s.kind==="winter"?"зимни":s.kind==="summer"?"летни":"всесезонни"}</td>
        <td class="r mono">${s.depthMm!=null?`${e(String(s.depthMm).replace(".",","))} мм`:""}</td>
        <td class="mono">${s.depthDate?e(m(s.depthDate,l)):""}</td>
        <td class="mono">${e(s.swapDates.length)}</td>
        <td>${e(s.note??"")}</td>
      </tr>`).join("")}</tbody>
    </table>
  </section>`:""}function E(t){let d="";for(let s=0;s<t;s++)d+=`<section class="page">
      <h2>Вписване на обслужване</h2>
      <table>
        <thead><tr><th style="width:22mm">Дата</th><th class="r" style="width:20mm">Км</th><th>Извършена дейност</th><th style="width:30mm">Сервиз</th><th class="r" style="width:18mm">Цена</th></tr></thead>
        <tbody class="blank">${Array.from({length:9},()=>"<tr><td></td><td></td><td></td><td></td><td></td></tr>").join("")}</tbody>
      </table>
      <div class="sig">
        <div>
          <h3 style="margin-top:6mm">Печат на сервиза</h3>
          <div class="stamp"></div>
        </div>
        <div>
          <h3 style="margin-top:6mm">Подпис и дата</h3>
          <div class="sigline"></div>
          <div class="sigline" style="margin-top:6mm"></div>
        </div>
      </div>
    </section>`;return d}function G(){return`<section class="page">
    <h2>Бележки</h2>
    <table><tbody class="blank">${Array.from({length:18},()=>"<tr><td></td></tr>").join("")}</tbody></table>
  </section>`}function V(t,l,d=4){const s=[I(t,l),N(t,l),T(t,l),q(t),H(t,l),R(t,l),E(d),G()].filter(Boolean).join(`
`);return`<!doctype html>
<html lang="bg"><head><meta charset="utf-8">
<title>Сервизна книжка (${e(u.appName)}) · Opel Mokka${t.car.plate?` ${e(t.car.plate)}`:""}</title>
<style>${O}</style></head>
<body>${s}
<div class="foot"><span>Сервизна книжка (${e(u.appName)}) · Opel Mokka${t.car.plate?` · ${e(t.car.plate)}`:""}</span><span>${e(m(l,l))}</span></div>
</body></html>`}export{V as buildLogbook};
