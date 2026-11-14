import{n as e}from"./rolldown-runtime-CogR6ga-.js";import{En as t,Et as n,In as r,W as i,hr as a,kn as o,mr as s,y as c,zn as l}from"./engine-F_hBf-5f.js";import{d as u,i as d,o as f,u as p}from"./i18n-BBbdCtVf.js";import{l as m}from"./products-B8Te126L.js";function h(e,t,n){let r=n.normalize(`NFC`).replace(/[:\r\n]+/g,` `).replace(/\s+/g,` `).trim().slice(0,60),i=`VITRUM:${e}:${t.map(e=>e.join(`.`)).join(`,`)}:${r}`,a=2166136261;for(let e=0;e<i.length;e++)a=Math.imul(a^i.charCodeAt(e),16777619);return`${i}:${((a>>>0)%1679616).toString(36).padStart(4,`0`)}`}var g=/VITRUM:([0-9a-z]{4,12}):(\d+\.\d+\.\d+(?:,\d+\.\d+\.\d+)*):([^:\r\n]*):([0-9a-z]{4})/g;function _(e){let t=e.normalize(`NFC`),n=[],r=0;for(let e of t.matchAll(g)){r++;let t=e[2].split(`,`).map(e=>e.split(`.`).map(Number));h(e[1],t,e[3])!==e[0]||t.some(([e,t,n])=>!e||!t||!n)||n.push({gallery:e[1],name:e[3].trim(),lines:t,code:e[0]})}return{codes:n,broken:(t.match(/VITRUM:/g)?.length??0)-r+(r-n.length)}}var v={bg:{photoN:`Снимка {n}`,at:`{n} от {all}`,for:`За {name}`,until:`Поръчки до {date}`,step1:`Докоснете снимка`,step2:`Изберете какво и колко`,step3:`Изпратете поръчката`,prices:`Цени`,hint:`Докоснете снимка, за да поръчате от нея`,piece:`{n} бр.`,pieces:`{n} бр.`,fromPhoto:`от {n} сн.`,fromPhotos:`от {n} сн.`,order:`Поръчай`,yourOrder:`Вашата поръчка`,edit:`Промени`,done:`Готово`,close:`Затвори`,prev:`Предишна`,next:`Следваща`,more:`Още: {item}`,less:`По-малко: {item}`,name:`Име на детето или на семейството`,note:`Бележка (по желание)`,needName:`Напишете име, за да знае фотографът чия е поръчката.`,total:`Общо`,send:`Изпратете това съобщение{to}`,toWho:` до {to}`,share:`Изпрати`,copy:`Копирай`,mail:`Имейл`,sms:`SMS`,copied:`Копирано. Поставете го в съобщение до фотографа.`,shared:`Изпратено. Благодарим!`,codeNote:`Кодът в края казва на фотографа точно какво сте избрали. Не го променяйте.`,orderOf:`Поръчка: {title}`,from:`От`,noteWord:`Бележка`,ordersTo:`Поръчки: {to}`,nojs:`Ако бутоните не работят, отворете файла в браузър (Chrome или Safari). Или напишете номерата на снимките и колко от всяко искате в съобщение{to}.`,chosen:`{n} избрани`},en:{photoN:`Photo {n}`,at:`{n} of {all}`,for:`For {name}`,until:`Orders by {date}`,step1:`Tap a photo`,step2:`Choose what and how many`,step3:`Send the order`,prices:`Prices`,hint:`Tap a photo to order from it`,piece:`{n} piece`,pieces:`{n} pieces`,fromPhoto:`from {n} photo`,fromPhotos:`from {n} photos`,order:`Order`,yourOrder:`Your order`,edit:`Change`,done:`Done`,close:`Close`,prev:`Previous`,next:`Next`,more:`More: {item}`,less:`Fewer: {item}`,name:`Child's or family name`,note:`Note (optional)`,needName:`Write a name so the photographer knows whose order it is.`,total:`Total`,send:`Send this message{to}`,toWho:` to {to}`,share:`Send`,copy:`Copy`,mail:`E-mail`,sms:`Text`,copied:`Copied. Paste it into a message to the photographer.`,shared:`Sent. Thank you!`,codeNote:`The code at the end tells the photographer exactly what you chose. Please leave it as it is.`,orderOf:`Order: {title}`,from:`From`,noteWord:`Note`,ordersTo:`Orders: {to}`,nojs:`If the buttons do not work, open the file in a browser (Chrome or Safari). Or write the photo numbers and how many of each you want in a message{to}.`,chosen:`{n} chosen`}},y=e=>e.replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`),b=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``)),x=e=>JSON.stringify(e).replace(/</g,`\\u003c`).replace(/\u2028/g,`\\u2028`).replace(/\u2029/g,`\\u2029`),S=(e,t=22)=>`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,C={left:S(`<path d="M15 5l-7 7 7 7"/>`,26),right:S(`<path d="M9 5l7 7-7 7"/>`,26),close:S(`<path d="M6 6l12 12M18 6L6 18"/>`),share:S(`<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/>`,18),copy:S(`<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>`,18),mail:S(`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>`,18),sms:S(`<path d="M4 5h16v11H9l-5 4z"/>`,18)},w=`
:root{--bg:#f4f1eb;--card:#fffdf8;--ink:#1c1a17;--muted:#6b655c;--line:#e2dcd1;--gold:#a5793c;--btn:#1c1a17;--btn-ink:#fffdf8;--err:#a8261b;--h:150px;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--bg:#121110;--card:#1c1b19;--ink:#f2eee7;--muted:#a49e94;--line:#302d29;--gold:#d4a868;--btn:#f2eee7;--btn-ink:#121110;--err:#f2b8b5}}
@media (min-width:720px){:root{--h:220px}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding-bottom:calc(96px + env(safe-area-inset-bottom))}
.serif,h1,h2{font-family:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;font-weight:500}
.top{max-width:760px;margin:0 auto;padding:clamp(44px,10vw,84px) 20px 8px;text-align:center}
.by{margin:0 0 16px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
h1{margin:0;font-size:clamp(32px,8vw,52px);line-height:1.06;letter-spacing:-.01em;text-wrap:balance}
.rule{display:block;width:40px;height:1px;background:var(--gold);margin:22px auto}
.for{margin:0;font-style:italic;font-size:21px;line-height:1.3}
.msg{margin:12px auto 0;max-width:32em;color:var(--muted);text-wrap:pretty;white-space:pre-line}
.due{display:inline-block;margin-top:18px;padding:5px 15px;border:1px solid var(--line);border-radius:99px;font-size:14px}
.steps{display:flex;justify-content:center;gap:clamp(14px,4vw,40px);list-style:none;margin:30px auto 30px;padding:0 16px;font-size:13px;line-height:1.3;color:var(--muted);counter-reset:s}
.steps li{display:flex;align-items:center;gap:9px;max-width:10.5em;text-align:left;counter-increment:s}
.steps li::before{content:counter(s);display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:50%;border:1px solid var(--line);color:var(--ink);font-size:12px}
.grid{display:flex;flex-wrap:wrap;align-items:flex-start;gap:6px;max-width:1440px;margin:0 auto;padding:0 10px}
.grid::after{content:"";flex:999 1 0}
.tile{position:relative;flex:var(--r) 1 calc(var(--r) * var(--h));aspect-ratio:var(--r);margin:0;padding:0;border:0;border-radius:6px;overflow:hidden;background:var(--line);cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}
.tile img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.tile::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 0 var(--gold);transition:box-shadow .2s}
.tile.on::after{box-shadow:inset 0 0 0 3px var(--gold)}
@media (hover:hover){.tile:hover img{transform:scale(1.03)}}
.tile:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.no{position:absolute;left:7px;bottom:7px;min-width:24px;padding:2px 8px;border-radius:99px;background:rgba(15,14,12,.55);color:#fff;font-size:12px;font-weight:600;line-height:18px;font-variant-numeric:tabular-nums}
.got{position:absolute;right:7px;top:7px;min-width:26px;padding:3px 9px;border-radius:99px;background:var(--gold);color:#fff;font-size:13px;font-weight:700;line-height:18px;font-variant-numeric:tabular-nums}
.prices{max-width:560px;margin:48px auto 0;padding:0 20px}
.prices h2{margin:0 0 14px;font-size:24px;text-align:center}
.prices ul{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.prices li{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid var(--line)}
.prices b{font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}
.foot,.nojs{max-width:560px;margin:22px auto 0;padding:0 20px;text-align:center;font-size:14px;color:var(--muted)}
.nojs{color:var(--ink)}
.bar{position:fixed;left:0;right:0;bottom:0;display:flex;align-items:center;gap:14px;padding:12px max(16px,env(safe-area-inset-right)) calc(12px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));background:var(--card);border-top:1px solid var(--line);box-shadow:0 -10px 30px rgba(0,0,0,.06)}
.bar .sum{flex:1;min-width:0;line-height:1.3}
.bar .sum b{display:block;font-size:16px;font-variant-numeric:tabular-nums}
.bar .sum small{color:var(--muted);font-size:13px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;appearance:none;border:0;border-radius:99px;min-height:46px;padding:0 22px;background:var(--btn);color:var(--btn-ink);font:600 15px/1 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;cursor:pointer;transition:transform .1s,opacity .2s;-webkit-tap-highlight-color:transparent}
.btn:active{transform:scale(.97)}
.btn:disabled{opacity:.35;cursor:default;transform:none}
.btn.ghost{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
dialog{border:0;padding:0;background:var(--card);color:var(--ink);max-width:none;max-height:none;overflow:hidden}
dialog::backdrop{background:rgba(12,11,10,.74)}
dialog[open]{animation:rise .28s cubic-bezier(.2,.8,.2,1)}
@keyframes rise{from{opacity:0;transform:translateY(14px)}}
@media (prefers-reduced-motion:reduce){dialog[open]{animation:none}.tile img{transition:none}}
#view[open]{display:flex;flex-direction:column;width:100vw;height:100dvh;margin:0}
@media (min-width:880px){#view[open]{flex-direction:row;width:min(1200px,94vw);height:min(840px,92dvh);margin:auto;border-radius:14px;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 30px 90px rgba(0,0,0,.55)}}
.stage{position:relative;flex:1 1 auto;min-height:0;background:#0e0d0c;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.round{position:absolute;display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;background:rgba(0,0,0,.42);color:#fff;cursor:pointer}
.round.x{top:max(12px,env(safe-area-inset-top));right:12px}
.round.l{left:10px;top:50%;margin-top:-22px}.round.r{right:10px;top:50%;margin-top:-22px}
.side{flex:none;display:flex;flex-direction:column;max-height:54dvh;overflow:auto;padding:18px 20px calc(16px + env(safe-area-inset-bottom))}
@media (min-width:880px){.side{width:370px;max-height:none;padding:30px 28px}}
.side h2{margin:0;font-size:26px;line-height:1.1}
.side .at{margin:2px 0 10px;color:var(--muted);font-size:14px}
.rows{list-style:none;margin:0 0 16px;padding:0}
.rows li{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--line)}
.rows .what{flex:1;min-width:0;line-height:1.3}
.rows .what small{display:block;color:var(--muted);font-size:14px;font-variant-numeric:tabular-nums}
.rows li.on .what span{font-weight:600}
.step{display:flex;align-items:center;gap:2px}
.step button{display:grid;place-items:center;width:42px;height:42px;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--ink);font:400 22px/1 system-ui,sans-serif;cursor:pointer}
.step button:disabled{opacity:.3;cursor:default}
.step output{min-width:30px;text-align:center;font-weight:700;font-variant-numeric:tabular-nums}
.side .btn{margin-top:auto}
#order[open]{display:flex;flex-direction:column;width:min(580px,100vw);max-height:94dvh;margin:auto auto 0;border-radius:18px 18px 0 0}
@media (min-width:620px){#order[open]{margin:auto;border-radius:18px;max-height:90dvh}}
.head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 22px 6px}
.head h2{margin:0;font-size:26px}
.head .round{position:static;background:transparent;color:var(--ink)}
.body{overflow:auto;padding:4px 22px calc(22px + env(safe-area-inset-bottom))}
.lines{list-style:none;margin:0;padding:0}
.lines li{display:grid;grid-template-columns:52px 1fr auto;gap:14px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line);line-height:1.3}
.lines img{width:52px;height:52px;object-fit:cover;border-radius:6px;display:block}
.lines small{display:block;color:var(--muted);font-size:14px}
.lines b{font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.total{display:flex;justify-content:space-between;gap:12px;padding:14px 0 4px;font-size:17px;font-weight:700;font-variant-numeric:tabular-nums}
.f{display:block;margin-top:16px;font-size:14px;color:var(--muted)}
.f input,.f textarea{display:block;width:100%;margin-top:6px;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);font:inherit;font-size:16px;resize:vertical}
.f input:focus,.f textarea:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:transparent}
.err{margin:8px 0 0;color:var(--err);font-size:14px}
.send{margin:22px 0 8px;font-weight:600}
.msgbox{margin:0;padding:12px 14px;border-radius:10px;background:var(--bg);color:var(--muted);font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere}
.small{margin:8px 0 0;color:var(--muted);font-size:13px}
.acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.acts .btn{flex:1 1 130px}
.ok{min-height:1.5em;margin:12px 0 0;color:var(--muted);font-size:14px;text-align:center}
[hidden]{display:none!important}
`;function T(e){let t=v[e.lang],n=e.deadline?new Date(`${e.deadline}T12:00`).toLocaleDateString(e.lang===`bg`?`bg-BG`:`en-GB`,{day:`numeric`,month:`long`}):``,r=e.to.trim(),i=r?b(t.toWho,{to:r}):``,a=e.photos.map((e,n)=>`<button type="button" class="tile" style="--r:${(e.w/e.h).toFixed(4)}" aria-label="${y(b(t.photoN,{n:n+1}))}"><img src="${e.src}" alt="${y(b(t.photoN,{n:n+1}))}" decoding="async"><span class="no">${n+1}</span><span class="got" hidden></span></button>`).join(``),o=e.items.map(e=>`<li><span>${y(e.name)}</span><b>${y(e.price)}</b></li>`).join(``),s={id:e.id,lang:e.lang,title:e.title,child:e.child,to:r,w:t,photos:e.photos.map(e=>({n:e.n})),items:e.items};return`<!doctype html>
<html lang="${e.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<title>${y(e.child?`${e.title}: ${e.child}`:e.title)}</title>
<style>${w}</style>
</head>
<body>
<header class="top">
${e.by?`<p class="by">${y(e.by)}</p>`:``}
<h1>${y(e.title)}</h1>
<span class="rule"></span>
${e.child?`<p class="for serif">${y(b(t.for,{name:e.child}))}</p>`:``}
${e.message?`<p class="msg">${y(e.message)}</p>`:``}
${n?`<p class="due">${y(b(t.until,{date:n}))}</p>`:``}
</header>
<ol class="steps" aria-hidden="true"><li>${t.step1}</li><li>${t.step2}</li><li>${t.step3}</li></ol>
<main class="grid">${a}</main>
${o?`<section class="prices"><h2>${t.prices}</h2><ul>${o}</ul></section>`:``}
${r?`<p class="foot">${y(b(t.ordersTo,{to:r}))}</p>`:``}
<noscript><p class="nojs">${y(b(t.nojs,{to:i}))}</p></noscript>
<div class="bar" hidden><div class="sum" aria-live="polite"></div><button type="button" class="btn go">${t.order}</button></div>
<dialog id="view" aria-label="${y(e.title)}">
<div class="stage"><img alt=""><button type="button" class="round l" aria-label="${t.prev}">${C.left}</button><button type="button" class="round r" aria-label="${t.next}">${C.right}</button><button type="button" class="round x" aria-label="${t.close}">${C.close}</button></div>
<div class="side"><h2 class="name"></h2><p class="at"></p><ul class="rows"></ul><button type="button" class="btn done">${t.done}</button></div>
</dialog>
<dialog id="order" aria-labelledby="order-h">
<div class="head"><h2 id="order-h">${t.yourOrder}</h2><button type="button" class="round x" aria-label="${t.close}">${C.close}</button></div>
<div class="body">
<ul class="lines"></ul>
<div class="total"></div>
<label class="f">${t.name}<input name="name" autocomplete="name" maxlength="60" required></label>
<p class="err" hidden>${t.needName}</p>
<label class="f">${t.note}<textarea name="note" rows="2" maxlength="300"></textarea></label>
<p class="send">${y(b(t.send,{to:i}))}</p>
<pre class="msgbox"></pre>
<p class="small">${t.codeNote}</p>
<div class="acts"><button type="button" class="btn share">${C.share}${t.share}</button><button type="button" class="btn ghost copy">${C.copy}${t.copy}</button><button type="button" class="btn ghost mail" hidden>${C.mail}${t.mail}</button><button type="button" class="btn ghost sms" hidden>${C.sms}${t.sms}</button></div>
<p class="ok" aria-live="polite"></p>
<button type="button" class="btn ghost edit" style="width:100%;margin-top:6px">${t.edit}</button>
</div>
</dialog>
<script>(${String(E)})(${x(s)}, ${String(h)});<\/script>
</body>
</html>`}function E(e,t){let n=e.w,r=e=>document.querySelector(e),i=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``)),a=(e,t,...n)=>{let r=document.createElement(e);return t&&(r.className=t),r.append(...n),r},o=`vitrum-gallery:${e.id}:${e.child}`,s={c:{},name:e.child,note:``};try{let e=JSON.parse(localStorage.getItem(o)||`null`);e&&typeof e==`object`&&e.c&&(s={...s,...e})}catch{}let c=()=>{try{localStorage.setItem(o,JSON.stringify(s))}catch{}},l=[...document.querySelectorAll(`.tile`)],u=e=>l[e].querySelector(`img`).src,d=e=>{let t=/\d+(?:[.,]\d+)?/.exec(e);return t?parseFloat(t[0].replace(`,`,`.`)):null},f=e.items.find(e=>d(e.price)!==null)?.price??``,p=e.lang===`bg`||/\d,\d/.test(f),m=/\d[.,]\d/.test(f),h=e=>f.replace(/\d+(?:[.,]\d+)?/,()=>{let t=e.toFixed(m||e%1?2:0);return p?t.replace(`.`,`,`):t}),g=e=>i(e===1?n.piece:n.pieces,{n:e}),_=(e,t)=>`${e}.${t}`,v=()=>Object.entries(s.c).map(([e,t])=>{let[n,r]=e.split(`.`).map(Number);return{i:n,j:r,n:t}}).filter(t=>t.n>0&&l[t.i]&&e.items[t.j]).sort((e,t)=>e.i-t.i||e.j-t.j),y=()=>{let t=v(),n=0,r=0,i=!!f;for(let a of t){n+=a.n;let t=d(e.items[a.j].price);t===null?i=!1:r+=t*a.n}return{lines:t,count:n,money:r,priced:i,photos:new Set(t.map(e=>e.i)).size}},b=r(`.bar`),x=r(`.bar .sum`),S=r(`.bar .go`);b.hidden=!1;function C(){l.forEach((t,r)=>{let a=e.items.reduce((e,t,n)=>e+(s.c[_(r,n)]||0),0),o=t.querySelector(`.got`);t.classList.toggle(`on`,a>0),o.hidden=!a,o.textContent=String(a),t.setAttribute(`aria-label`,i(n.photoN,{n:r+1})+(a?`, ${g(a)}`:``))});let t=y();x.replaceChildren(...t.count?[a(`b`,``,g(t.count)+(t.priced?` · ${h(t.money)}`:``)),a(`small`,``,i(t.photos===1?n.fromPhoto:n.fromPhotos,{n:t.photos}))]:[a(`small`,``,n.hint)]),S.disabled=!t.count,c()}let w=r(`#view`),T=r(`#view .stage img`),E=r(`#view .rows`),D=0;function O(t){D=(t+l.length)%l.length,T.src=u(D),T.alt=i(n.photoN,{n:D+1}),r(`#view .name`).textContent=i(n.photoN,{n:D+1}),r(`#view .at`).textContent=l.length>1?i(n.at,{n:D+1,all:l.length}):``,E.replaceChildren(...e.items.map((e,t)=>{let r=s.c[_(D,t)]||0,o=e=>()=>{let n=Math.max(0,Math.min(99,r+e));n?s.c[_(D,t)]=n:delete s.c[_(D,t)],O(D),C()},c=a(`button`,``,`−`),l=a(`button`,``,`+`);return c.setAttribute(`aria-label`,i(n.less,{item:e.name})),l.setAttribute(`aria-label`,i(n.more,{item:e.name})),c.disabled=!r,c.onclick=o(-1),l.onclick=o(1),a(`li`,r?`on`:``,a(`div`,`what`,a(`span`,``,e.name),a(`small`,``,e.price)),a(`div`,`step`,c,a(`output`,``,String(r)),l))}))}l.forEach((e,t)=>{e.onclick=()=>{O(t),w.showModal()}}),r(`#view .l`).onclick=()=>O(D-1),r(`#view .r`).onclick=()=>O(D+1),r(`#view .x`).onclick=r(`#view .done`).onclick=()=>w.close(),l.length<2&&(r(`#view .l`).hidden=!0,r(`#view .r`).hidden=!0),w.addEventListener(`click`,e=>{e.target===w&&w.close()}),w.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&O(D-1),e.key===`ArrowRight`&&O(D+1)});let k=null,A=r(`#view .stage`);A.addEventListener(`pointerdown`,e=>{k=e.clientX}),A.addEventListener(`pointerup`,e=>{k!==null&&Math.abs(e.clientX-k)>50&&O(D+(e.clientX<k?1:-1)),k=null});let j=r(`#order`),M=r(`#order [name=name]`),N=r(`#order [name=note]`),P=r(`#order .err`),F=r(`#order .msgbox`),I=r(`#order .ok`),L=/[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+/.exec(e.to)?.[0]??``,R=/\+?\d[\d\s()-]{6,}\d/.exec(e.to)?.[0].replace(/[\s()-]/g,``)??``,z=r(`#order .mail`),B=r(`#order .sms`),V=r(`#order .share`);z.hidden=!L,B.hidden=!R,V.hidden=!navigator.share,navigator.share||r(`#order .copy`).classList.remove(`ghost`);function H(){let r=y(),a=M.value.trim(),o=N.value.trim();return[i(n.orderOf,{title:e.title}),`${n.from}: ${a||`…`}`,...r.lines.map(t=>{let r=d(e.items[t.j].price);return`• ${i(n.photoN,{n:t.i+1})}: ${e.items[t.j].name}, ${g(t.n)}${r!==null&&f?` (${h(r*t.n)})`:``}`}),`${n.total}: ${g(r.count)}${r.priced?`, ${h(r.money)}`:``}`,...o?[`${n.noteWord}: ${o}`]:[],``,t(e.id,r.lines.map(t=>[e.photos[t.i].n,t.j+1,t.n]),a||`?`)].join(`
`)}function U(){s.name=M.value,s.note=N.value,c(),F.textContent=H(),M.value.trim()&&(P.hidden=!0)}M.oninput=N.oninput=U,S.onclick=()=>{let t=y();r(`#order .lines`).replaceChildren(...t.lines.map(t=>{let r=document.createElement(`img`),o=d(e.items[t.j].price);return r.src=u(t.i),r.alt=``,a(`li`,``,r,a(`div`,``,a(`span`,``,e.items[t.j].name),a(`small`,``,`${i(n.photoN,{n:t.i+1})} · ${g(t.n)}`)),a(`b`,``,o!==null&&f?h(o*t.n):``))})),r(`#order .total`).replaceChildren(a(`span`,``,n.total),a(`span`,``,g(t.count)+(t.priced?` · ${h(t.money)}`:``))),M.value=s.name,N.value=s.note,I.textContent=``,P.hidden=!0,U(),j.showModal()};let W=()=>M.value.trim()?!0:(P.hidden=!1,M.focus(),!1);async function G(){if(W()){try{await navigator.clipboard.writeText(H())}catch{let e=document.createRange();e.selectNodeContents(F),getSelection()?.removeAllRanges(),getSelection()?.addRange(e),document.execCommand(`copy`)}I.textContent=n.copied}}r(`#order .copy`).onclick=()=>void G(),V.onclick=async()=>{if(W())try{await navigator.share({text:H()}),I.textContent=n.shared}catch(e){e.name!==`AbortError`&&G()}},z.onclick=()=>{W()&&(location.href=`mailto:${L}?subject=${encodeURIComponent(i(n.orderOf,{title:e.title}))}&body=${encodeURIComponent(H())}`)},B.onclick=()=>{W()&&(location.href=`sms:${R}?&body=${encodeURIComponent(H())}`)},r(`#order .x`).onclick=r(`#order .edit`).onclick=()=>j.close(),j.addEventListener(`click`,e=>{e.target===j&&j.close()}),C()}var D=e({openGallery:()=>k});function O(e){let t=new Set(e.selected.length?e.selected:e.currentId?[e.currentId]:[]);return n(e).filter(e=>t.has(e.id)&&!e.pending)}function k(e){let n=r.get().print,i=m(n.product);r.set({selected:e,currentId:e.includes(r.get().currentId??``)?r.get().currentId:e[0]??null}),!i.pricing&&!i.ordering&&o({product:`order-form`,page:0}),u.set(`sec:print-gallery`,!0),t(`print`),requestAnimationFrame(()=>document.getElementById(`gallery-out`)?.scrollIntoView({block:`start`,behavior:`smooth`}))}function A(e,t,n){if(!t)return[{child:``,photos:e}];let r=e.filter(e=>n.includes(e.name)),i=new Map;for(let t of e)n.includes(t.name)||i.set(t.name,[...i.get(t.name)??[],t]);return[...i].sort(([e],[t])=>e.localeCompare(t,void 0,{numeric:!0})).map(([e,t])=>({child:e,photos:[...t,...r]}))}var j=e=>e.trim().replace(/\s*[\\/:*?"<>|]+\s*/g,` `).trim()||`gallery`,M=e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>n(r.error),r.readAsDataURL(e)}),N=e=>`${(e/1048576).toLocaleString(r.get().lang,{maximumFractionDigits:+(e<10485760)})} MB`;async function P(e){let t=r.get(),n=t.print.gallery,i=t.print.lang,u=t.print.items.filter(e=>e.name.trim()),m=O(t),h=m.filter(e=>t.bench.consent[e.name]?.solo!==!1),g=m.length-h.length;if(!h.length||!u.length){e?.close(),l(h.length?f(`Put at least one item on the price list first`):f(`Select the photos for the gallery first`));return}let _=A(h,n.each,n.shared).slice(0,e?1:void 0),v=[...new Set(_.flatMap(e=>e.photos))],y=e?`preview`:Math.random().toString(36).slice(2,8).padEnd(6,`0`),b=n.title.trim()||(i===`bg`?`Снимки`:`Photos`),x=new Map(h.map((e,t)=>[e.id,t+1])),S=new Map,C=0;try{for(let[e,t]of v.entries()){r.set({busy:f(`Gallery: photo {n} of {all}`,{n:e+1,all:v.length})});try{let e=await c(t,{type:`image/jpeg`,quality:.8,longEdge:1200,mark:n.mark.trim()||void 0,markAt:`middle`}),r=await createImageBitmap(e);S.set(t.id,{w:r.width,h:r.height,src:await M(e)}),r.close()}catch{C++}}let t=_.filter(e=>e.photos.some(e=>S.has(e.id))).map(e=>({child:e.child,html:T({id:y,lang:i,title:b,message:n.message.trim(),deadline:n.deadline,by:n.by.trim(),to:n.to.trim(),child:e.child,photos:e.photos.filter(e=>S.has(e.id)).map(e=>({n:x.get(e.id),...S.get(e.id)})),items:u.map(e=>({name:e.name.trim(),price:e.price.trim()}))})}));if(!t.length){e?.close(),l(f(`None of the photos could be read: is their folder still open?`));return}let m={id:y,made:Date.now(),title:b,photos:h.map(e=>({id:e.id,path:e.path,size:e.size})),items:u.map(e=>e.id)};o({galleries:[m,...r.get().print.galleries.filter(e=>e.id!==y)].slice(0,40)});let w=`${C?` ${f(`{n} could not be read and were left out.`,{n:C})}`:``}${g?` ${f(`{n} left out: no consent to portraits.`,{n:g})}`:``}`;if(e){e.location.href=URL.createObjectURL(new Blob([t[0].html],{type:`text/html`})),C&&l(w.trim());return}if(t.length===1){let e=new Blob([t[0].html],{type:`text/html`});p(e,`${j(t[0].child?`${b} ${t[0].child}`:b)}.html`),l(`${f(`Gallery saved: {photos}, {size}. Send the file to the families.`,{photos:d(S.size,`photo`),size:N(e.size)})}${w}`)}else{let e=a(),n=[],r=new Set;for(let i of t){let t=new TextEncoder().encode(i.html);n.push(e.entry(s(`${j(i.child)}.html`,r),t),new Blob([t]))}n.push(e.end());let i=new Blob(n,{type:`application/zip`});p(i,`${j(b)}.zip`),l(`${f(`{n} galleries saved, one a child, in one zip ({size}). Send each family its own file.`,{n:t.length,size:N(i.size)})}${w}`)}}finally{r.set({busy:null})}}function F(e,t=r.get()){let n=t.print.galleries.find(t=>t.id===e.gallery);if(!n)return null;let i=[];for(let[r,a,o]of e.lines){let e=n.photos[r-1],s=n.items[a-1],c=e&&(t.photos.find(t=>t.id===e.id)??t.photos.find(t=>t.path===e.path&&t.size===e.size));c&&s&&t.print.items.some(e=>e.id===s)&&i.push([c.id,s,o])}return{lines:i,lost:e.lines.length-i.length}}var I=e=>`${e.gallery}:${e.name.toLocaleLowerCase()}`,L=e=>e.length>3?f(`{names} and {n} more`,{names:e.slice(0,3).join(`, `),n:e.length-3}):e.join(`, `);function R(e){let{codes:t,broken:n}=_(e),a=r.get(),s={},c=[...a.print.taken],u=0,d=0,p=0,m=0,h=[],g=(e,t)=>{for(let[n,r,i]of e)(s[n]??={})[r]=(s[n][r]??0)+t*i};for(let e of t){let t=I(e),n=c.find(e=>e.key===t);if(n?.code===e.code){u++;continue}let r=F(e,a);if(!r)d++;else{if(n){let e=_(n.code).codes[0],t=e&&F(e,a);t&&g(t.lines,-1),c=c.filter(e=>e!==n),p++}g(r.lines,1),m+=r.lost,c.push({key:t,code:e.code,name:e.name,at:Date.now()}),h.push(e.name)}}Object.keys(s).length&&i(s),h.length&&o({taken:c});let v=[h.length&&f(`Orders added: {names}`,{names:L(h)}),p&&f(`Replaced an earlier order from the same family: {n}`,{n:p}),u&&f(`Already taken in: {n}`,{n:u}),d&&f(`From a gallery not made in this browser: {n}`,{n:d}),n&&f(`Damaged, ask the family to send them again: {n}`,{n}),m&&f(`Lines for photos or items no longer here: {n}`,{n:m})].filter(Boolean);return l(v.length?v.join(`. `):f(`No order code in this text. A code starts with VITRUM:`)),h.length>0}function z(e){let t=r.get(),n=_(e.code).codes[0],a=n&&F(n,t);if(a){let e={};for(let[t,n,r]of a.lines)(e[t]??={})[n]=(e[t][n]??0)-r;i(e)}o({taken:t.print.taken.filter(t=>t!==e)}),l(f(`Removed the order of {name}`,{name:e.name}),{label:f(`Undo`),run:()=>void R(e.code)})}var B=e=>_(e.code).codes[0]?.lines.reduce((e,t)=>e+t[2],0)??0;export{O as a,A as i,P as n,B as o,D as r,R as s,z as t};