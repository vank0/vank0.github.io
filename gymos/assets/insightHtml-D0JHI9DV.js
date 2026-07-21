const g=/&lt;(strong|b|em|i|span)(?:\s+style=(?:"([^"]*)"|'([^']*)'))?\s*&gt;/gi,i=/&lt;\/(strong|b|em|i|span)\s*&gt;/gi,o=/&lt;br\s*\/?\s*&gt;/gi,u=/^[\w\s:#(),.%;-]*$/,a={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};function d(t){return t.replace(/<br\s*\/?>/gi,". ").replace(/<[^>]+>/g,"").replace(/&(?:amp|lt|gt|quot|#39);/g,e=>a[e]??e).replace(/[\p{Extended_Pictographic}️]/gu,"").replace(/\s+/g," ").replace(/\s+([.,!?])/g,"$1").replace(/\.\s*\./g,".").trim()}function E(t){return t.replace(/<br\s*\/?>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&(?:amp|lt|gt|quot|#39);/g,e=>a[e]??e).replace(/[\p{Extended_Pictographic}️]/gu,"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).join(`
`).replace(/\n{3,}/g,`

`).trim()}function h(t){return t.replace(/```[a-z]*\n?/gi,"").replace(/```/g,"").trim().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(g,(c,s,n,p)=>{const r=n??p??"",l=r&&u.test(r)&&!/url\(|expression|javascript:/i.test(r)?` style="${r}"`:"";return`<${s.toLowerCase()}${l}>`}).replace(i,(c,s)=>`</${s.toLowerCase()}>`).replace(o,"<br>")}export{E as a,d as h,h as s};
