import{i as e,n as t,t as n}from"./rolldown-runtime-COiEfhsA.js";import{N as r,P as i}from"./index-D65ew5E0.js";import{G as a,Pn as o,Vn as s,Wn as c,br as l,jn as u,kt as d,x as f,xr as p}from"./engine-DzQJreud.js";import{a as m,f as h,p as g,s as _}from"./i18n-J0biEcdM.js";import{l as v}from"./products-FtnBwv-d.js";import{c as y,i as b,l as x}from"./families-Dmqk7KBG.js";function S(e,t,n){let r=n.normalize(`NFC`).replace(/[:\r\n]+/g,` `).replace(/\s+/g,` `).trim().slice(0,60),i=`VITRUM:${e}:${t.map(e=>e.join(`.`)).join(`,`)}:${r}`,a=2166136261;for(let e=0;e<i.length;e++)a=Math.imul(a^i.charCodeAt(e),16777619);return`${i}:${((a>>>0)%1679616).toString(36).padStart(4,`0`)}`}var C=/VITRUM:([0-9a-z]{4,12}):(\d+\.\d+\.\d+(?:,\d+\.\d+\.\d+)*):([^:\r\n]*):([0-9a-z]{4})/g;function w(e){let t=e.normalize(`NFC`),n=[],r=0;for(let e of t.matchAll(C)){r++;let t=e[2].split(`,`).map(e=>e.split(`.`).map(Number)),i=t.some(([e,t])=>!e&&!t),a=t.filter(([e,t])=>e||t);S(e[1],t,e[3])!==e[0]||a.some(([e,t,n])=>!e||!t||!n)||n.push({gallery:e[1],name:e[3].trim(),lines:a,code:e[0],retake:i})}return{codes:n,broken:(t.match(/VITRUM:/g)?.length??0)-r+(r-n.length)}}var T=e(n(((e,t)=>{var n=function(){var e=function(e,t){var r=e,a=n[t],p=null,m=0,h=null,g=[],v={},y=function(e,t){m=r*4+17,p=function(e){for(var t=Array(e),n=0;n<e;n+=1){t[n]=Array(e);for(var r=0;r<e;r+=1)t[n][r]=null}return t}(m),b(0,0),b(m-7,0),b(0,m-7),C(),S(),T(e,t),r>=7&&w(e),h??=O(r,a,g),E(h,t)},b=function(e,t){for(var n=-1;n<=7;n+=1)if(!(e+n<=-1||m<=e+n))for(var r=-1;r<=7;r+=1)t+r<=-1||m<=t+r||(0<=n&&n<=6&&(r==0||r==6)||0<=r&&r<=6&&(n==0||n==6)||2<=n&&n<=4&&2<=r&&r<=4?p[e+n][t+r]=!0:p[e+n][t+r]=!1)},x=function(){for(var e=0,t=0,n=0;n<8;n+=1){y(!0,n);var r=i.getLostPoint(v);(n==0||e>r)&&(e=r,t=n)}return t},S=function(){for(var e=8;e<m-8;e+=1)p[e][6]??(p[e][6]=e%2==0);for(var t=8;t<m-8;t+=1)p[6][t]??(p[6][t]=t%2==0)},C=function(){for(var e=i.getPatternPosition(r),t=0;t<e.length;t+=1)for(var n=0;n<e.length;n+=1){var a=e[t],o=e[n];if(p[a][o]==null)for(var s=-2;s<=2;s+=1)for(var c=-2;c<=2;c+=1)s==-2||s==2||c==-2||c==2||s==0&&c==0?p[a+s][o+c]=!0:p[a+s][o+c]=!1}},w=function(e){for(var t=i.getBCHTypeNumber(r),n=0;n<18;n+=1){var a=!e&&(t>>n&1)==1;p[Math.floor(n/3)][n%3+m-8-3]=a}for(var n=0;n<18;n+=1){var a=!e&&(t>>n&1)==1;p[n%3+m-8-3][Math.floor(n/3)]=a}},T=function(e,t){for(var n=a<<3|t,r=i.getBCHTypeInfo(n),o=0;o<15;o+=1){var s=!e&&(r>>o&1)==1;o<6?p[o][8]=s:o<8?p[o+1][8]=s:p[m-15+o][8]=s}for(var o=0;o<15;o+=1){var s=!e&&(r>>o&1)==1;o<8?p[8][m-o-1]=s:o<9?p[8][15-o-1+1]=s:p[8][15-o-1]=s}p[m-8][8]=!e},E=function(e,t){for(var n=-1,r=m-1,a=7,o=0,s=i.getMaskFunction(t),c=m-1;c>0;c-=2)for(c==6&&--c;;){for(var l=0;l<2;l+=1)if(p[r][c-l]==null){var u=!1;o<e.length&&(u=(e[o]>>>a&1)==1),s(r,c-l)&&(u=!u),p[r][c-l]=u,--a,a==-1&&(o+=1,a=7)}if(r+=n,r<0||m<=r){r-=n,n=-n;break}}},D=function(e,t){for(var n=0,r=0,a=0,s=Array(t.length),c=Array(t.length),l=0;l<t.length;l+=1){var u=t[l].dataCount,d=t[l].totalCount-u;r=Math.max(r,u),a=Math.max(a,d),s[l]=Array(u);for(var f=0;f<s[l].length;f+=1)s[l][f]=255&e.getBuffer()[f+n];n+=u;var p=i.getErrorCorrectPolynomial(d),m=o(s[l],p.getLength()-1).mod(p);c[l]=Array(p.getLength()-1);for(var f=0;f<c[l].length;f+=1){var h=f+m.getLength()-c[l].length;c[l][f]=h>=0?m.getAt(h):0}}for(var g=0,f=0;f<t.length;f+=1)g+=t[f].totalCount;for(var _=Array(g),v=0,f=0;f<r;f+=1)for(var l=0;l<t.length;l+=1)f<s[l].length&&(_[v]=s[l][f],v+=1);for(var f=0;f<a;f+=1)for(var l=0;l<t.length;l+=1)f<c[l].length&&(_[v]=c[l][f],v+=1);return _},O=function(e,t,n){for(var r=s.getRSBlocks(e,t),a=c(),o=0;o<n.length;o+=1){var l=n[o];a.put(l.getMode(),4),a.put(l.getLength(),i.getLengthInBits(l.getMode(),e)),l.write(a)}for(var u=0,o=0;o<r.length;o+=1)u+=r[o].dataCount;if(a.getLengthInBits()>u*8)throw`code length overflow. (`+a.getLengthInBits()+`>`+u*8+`)`;for(a.getLengthInBits()+4<=u*8&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(!1);for(;!(a.getLengthInBits()>=u*8||(a.put(236,8),a.getLengthInBits()>=u*8));)a.put(17,8);return D(a,r)};v.addData=function(e,t){t||=`Byte`;var n=null;switch(t){case`Numeric`:n=l(e);break;case`Alphanumeric`:n=u(e);break;case`Byte`:n=d(e);break;case`Kanji`:n=f(e);break;default:throw`mode:`+t}g.push(n),h=null},v.isDark=function(e,t){if(e<0||m<=e||t<0||m<=t)throw e+`,`+t;return p[e][t]},v.getModuleCount=function(){return m},v.make=function(){if(r<1){for(var e=1;e<40;e++){for(var t=s.getRSBlocks(e,a),n=c(),o=0;o<g.length;o++){var l=g[o];n.put(l.getMode(),4),n.put(l.getLength(),i.getLengthInBits(l.getMode(),e)),l.write(n)}for(var u=0,o=0;o<t.length;o++)u+=t[o].dataCount;if(n.getLengthInBits()<=u*8)break}r=e}y(!1,x())},v.createTableTag=function(e,t){e||=2,t=t===void 0?e*4:t;var n=``;n+=`<table style="`,n+=` border-width: 0px; border-style: none;`,n+=` border-collapse: collapse;`,n+=` padding: 0px; margin: `+t+`px;`,n+=`">`,n+=`<tbody>`;for(var r=0;r<v.getModuleCount();r+=1){n+=`<tr>`;for(var i=0;i<v.getModuleCount();i+=1)n+=`<td style="`,n+=` border-width: 0px; border-style: none;`,n+=` border-collapse: collapse;`,n+=` padding: 0px; margin: 0px;`,n+=` width: `+e+`px;`,n+=` height: `+e+`px;`,n+=` background-color: `,n+=v.isDark(r,i)?`#000000`:`#ffffff`,n+=`;`,n+=`"/>`;n+=`</tr>`}return n+=`</tbody>`,n+=`</table>`,n},v.createSvgTag=function(e,t,n,r){var i={};typeof arguments[0]==`object`&&(i=arguments[0],e=i.cellSize,t=i.margin,n=i.alt,r=i.title),e||=2,t=t===void 0?e*4:t,n=typeof n==`string`?{text:n}:n||{},n.text=n.text||null,n.id=n.text?n.id||`qrcode-description`:null,r=typeof r==`string`?{text:r}:r||{},r.text=r.text||null,r.id=r.text?r.id||`qrcode-title`:null;var a=v.getModuleCount()*e+t*2,o,s,c,l,u=``,d=`l`+e+`,0 0,`+e+` -`+e+`,0 0,-`+e+`z `;for(u+=`<svg version="1.1" xmlns="http://www.w3.org/2000/svg"`,u+=i.scalable?``:` width="`+a+`px" height="`+a+`px"`,u+=` viewBox="0 0 `+a+` `+a+`" `,u+=` preserveAspectRatio="xMinYMin meet"`,u+=r.text||n.text?` role="img" aria-labelledby="`+k([r.id,n.id].join(` `).trim())+`"`:``,u+=`>`,u+=r.text?`<title id="`+k(r.id)+`">`+k(r.text)+`</title>`:``,u+=n.text?`<description id="`+k(n.id)+`">`+k(n.text)+`</description>`:``,u+=`<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>`,u+=`<path d="`,c=0;c<v.getModuleCount();c+=1)for(l=c*e+t,o=0;o<v.getModuleCount();o+=1)v.isDark(c,o)&&(s=o*e+t,u+=`M`+s+`,`+l+d);return u+=`" stroke="transparent" fill="black"/>`,u+=`</svg>`,u},v.createDataURL=function(e,t){e||=2,t=t===void 0?e*4:t;var n=v.getModuleCount()*e+t*2,r=t,i=n-t;return _(n,n,function(t,n){if(r<=t&&t<i&&r<=n&&n<i){var a=Math.floor((t-r)/e),o=Math.floor((n-r)/e);return+!v.isDark(o,a)}return 1})},v.createImgTag=function(e,t,n){e||=2,t=t===void 0?e*4:t;var r=v.getModuleCount()*e+t*2,i=``;return i+=`<img`,i+=` src="`,i+=v.createDataURL(e,t),i+=`"`,i+=` width="`,i+=r,i+=`"`,i+=` height="`,i+=r,i+=`"`,n&&(i+=` alt="`,i+=k(n),i+=`"`),i+=`/>`,i};var k=function(e){for(var t=``,n=0;n<e.length;n+=1){var r=e.charAt(n);switch(r){case`<`:t+=`&lt;`;break;case`>`:t+=`&gt;`;break;case`&`:t+=`&amp;`;break;case`"`:t+=`&quot;`;break;default:t+=r}}return t},A=function(e){var t=1;e=e===void 0?t*2:e;var n=v.getModuleCount()*t+e*2,r=e,i=n-e,a,o,s,c,l,u={"██":`█`,"█ ":`▀`," █":`▄`,"  ":` `},d={"██":`▀`,"█ ":`▀`," █":` `,"  ":` `},f=``;for(a=0;a<n;a+=2){for(s=Math.floor((a-r)/t),c=Math.floor((a+1-r)/t),o=0;o<n;o+=1)l=`█`,r<=o&&o<i&&r<=a&&a<i&&v.isDark(s,Math.floor((o-r)/t))&&(l=` `),r<=o&&o<i&&r<=a+1&&a+1<i&&v.isDark(c,Math.floor((o-r)/t))?l+=` `:l+=`█`,f+=e<1&&a+1>=i?d[l]:u[l];f+=`
`}return n%2&&e>0?f.substring(0,f.length-n-1)+Array(n+1).join(`▀`):f.substring(0,f.length-1)};return v.createASCII=function(e,t){if(e||=1,e<2)return A(t);--e,t=t===void 0?e*2:t;var n=v.getModuleCount()*e+t*2,r=t,i=n-t,a,o,s,c,l=Array(e+1).join(`██`),u=Array(e+1).join(`  `),d=``,f=``;for(a=0;a<n;a+=1){for(s=Math.floor((a-r)/e),f=``,o=0;o<n;o+=1)c=1,r<=o&&o<i&&r<=a&&a<i&&v.isDark(s,Math.floor((o-r)/e))&&(c=0),f+=c?l:u;for(s=0;s<e;s+=1)d+=f+`
`}return d.substring(0,d.length-1)},v.renderTo2dContext=function(e,t){t||=2;for(var n=v.getModuleCount(),r=0;r<n;r++)for(var i=0;i<n;i++)e.fillStyle=v.isDark(r,i)?`black`:`white`,e.fillRect(r*t,i*t,t,t)},v};e.stringToBytesFuncs={default:function(e){for(var t=[],n=0;n<e.length;n+=1){var r=e.charCodeAt(n);t.push(r&255)}return t}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(e,t){var n=function(){for(var n=h(e),r=function(){var e=n.read();if(e==-1)throw`eof`;return e},i=0,a={};;){var o=n.read();if(o==-1)break;var s=r(),c=r(),l=r(),u=String.fromCharCode(o<<8|s);a[u]=c<<8|l,i+=1}if(i!=t)throw i+` != `+t;return a}(),r=63;return function(e){for(var t=[],i=0;i<e.length;i+=1){var a=e.charCodeAt(i);if(a<128)t.push(a);else{var o=n[e.charAt(i)];typeof o==`number`?(o&255)==o?t.push(o):(t.push(o>>>8),t.push(o&255)):t.push(r)}}return t}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},n={L:1,M:0,Q:3,H:2},r={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},i=function(){var e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],n=1335,i=7973,s=21522,c={},l=function(e){for(var t=0;e!=0;)t+=1,e>>>=1;return t};return c.getBCHTypeInfo=function(e){for(var t=e<<10;l(t)-l(n)>=0;)t^=n<<l(t)-l(n);return(e<<10|t)^s},c.getBCHTypeNumber=function(e){for(var t=e<<12;l(t)-l(i)>=0;)t^=i<<l(t)-l(i);return e<<12|t},c.getPatternPosition=function(t){return e[t-1]},c.getMaskFunction=function(e){switch(e){case r.PATTERN000:return function(e,t){return(e+t)%2==0};case r.PATTERN001:return function(e,t){return e%2==0};case r.PATTERN010:return function(e,t){return t%3==0};case r.PATTERN011:return function(e,t){return(e+t)%3==0};case r.PATTERN100:return function(e,t){return(Math.floor(e/2)+Math.floor(t/3))%2==0};case r.PATTERN101:return function(e,t){return e*t%2+e*t%3==0};case r.PATTERN110:return function(e,t){return(e*t%2+e*t%3)%2==0};case r.PATTERN111:return function(e,t){return(e*t%3+(e+t)%2)%2==0};default:throw`bad maskPattern:`+e}},c.getErrorCorrectPolynomial=function(e){for(var t=o([1],0),n=0;n<e;n+=1)t=t.multiply(o([1,a.gexp(n)],0));return t},c.getLengthInBits=function(e,n){if(1<=n&&n<10)switch(e){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw`mode:`+e}else if(n<27)switch(e){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw`mode:`+e}else if(n<41)switch(e){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw`mode:`+e}else throw`type:`+n},c.getLostPoint=function(e){for(var t=e.getModuleCount(),n=0,r=0;r<t;r+=1)for(var i=0;i<t;i+=1){for(var a=0,o=e.isDark(r,i),s=-1;s<=1;s+=1)if(!(r+s<0||t<=r+s))for(var c=-1;c<=1;c+=1)i+c<0||t<=i+c||(s!=0||c!=0)&&o==e.isDark(r+s,i+c)&&(a+=1);a>5&&(n+=3+a-5)}for(var r=0;r<t-1;r+=1)for(var i=0;i<t-1;i+=1){var l=0;e.isDark(r,i)&&(l+=1),e.isDark(r+1,i)&&(l+=1),e.isDark(r,i+1)&&(l+=1),e.isDark(r+1,i+1)&&(l+=1),(l==0||l==4)&&(n+=3)}for(var r=0;r<t;r+=1)for(var i=0;i<t-6;i+=1)e.isDark(r,i)&&!e.isDark(r,i+1)&&e.isDark(r,i+2)&&e.isDark(r,i+3)&&e.isDark(r,i+4)&&!e.isDark(r,i+5)&&e.isDark(r,i+6)&&(n+=40);for(var i=0;i<t;i+=1)for(var r=0;r<t-6;r+=1)e.isDark(r,i)&&!e.isDark(r+1,i)&&e.isDark(r+2,i)&&e.isDark(r+3,i)&&e.isDark(r+4,i)&&!e.isDark(r+5,i)&&e.isDark(r+6,i)&&(n+=40);for(var u=0,i=0;i<t;i+=1)for(var r=0;r<t;r+=1)e.isDark(r,i)&&(u+=1);var d=Math.abs(100*u/t/t-50)/5;return n+=d*10,n},c}(),a=function(){for(var e=Array(256),t=Array(256),n=0;n<8;n+=1)e[n]=1<<n;for(var n=8;n<256;n+=1)e[n]=e[n-4]^e[n-5]^e[n-6]^e[n-8];for(var n=0;n<255;n+=1)t[e[n]]=n;var r={};return r.glog=function(e){if(e<1)throw`glog(`+e+`)`;return t[e]},r.gexp=function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return e[t]},r}();function o(e,t){if(e.length===void 0)throw e.length+`/`+t;var n=function(){for(var n=0;n<e.length&&e[n]==0;)n+=1;for(var r=Array(e.length-n+t),i=0;i<e.length-n;i+=1)r[i]=e[i+n];return r}(),r={};return r.getAt=function(e){return n[e]},r.getLength=function(){return n.length},r.multiply=function(e){for(var t=Array(r.getLength()+e.getLength()-1),n=0;n<r.getLength();n+=1)for(var i=0;i<e.getLength();i+=1)t[n+i]^=a.gexp(a.glog(r.getAt(n))+a.glog(e.getAt(i)));return o(t,0)},r.mod=function(e){if(r.getLength()-e.getLength()<0)return r;for(var t=a.glog(r.getAt(0))-a.glog(e.getAt(0)),n=Array(r.getLength()),i=0;i<r.getLength();i+=1)n[i]=r.getAt(i);for(var i=0;i<e.getLength();i+=1)n[i]^=a.gexp(a.glog(e.getAt(i))+t);return o(n,0).mod(e)},r}var s=function(){var e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(e,t){var n={};return n.totalCount=e,n.dataCount=t,n},r={},i=function(t,r){switch(r){case n.L:return e[(t-1)*4+0];case n.M:return e[(t-1)*4+1];case n.Q:return e[(t-1)*4+2];case n.H:return e[(t-1)*4+3];default:return}};return r.getRSBlocks=function(e,n){var r=i(e,n);if(r===void 0)throw`bad rs block @ typeNumber:`+e+`/errorCorrectionLevel:`+n;for(var a=r.length/3,o=[],s=0;s<a;s+=1)for(var c=r[s*3+0],l=r[s*3+1],u=r[s*3+2],d=0;d<c;d+=1)o.push(t(l,u));return o},r}(),c=function(){var e=[],t=0,n={};return n.getBuffer=function(){return e},n.getAt=function(t){return(e[Math.floor(t/8)]>>>7-t%8&1)==1},n.put=function(e,t){for(var r=0;r<t;r+=1)n.putBit((e>>>t-r-1&1)==1)},n.getLengthInBits=function(){return t},n.putBit=function(n){var r=Math.floor(t/8);e.length<=r&&e.push(0),n&&(e[r]|=128>>>t%8),t+=1},n},l=function(e){var n=t.MODE_NUMBER,r=e,i={};i.getMode=function(){return n},i.getLength=function(e){return r.length},i.write=function(e){for(var t=r,n=0;n+2<t.length;)e.put(a(t.substring(n,n+3)),10),n+=3;n<t.length&&(t.length-n==1?e.put(a(t.substring(n,n+1)),4):t.length-n==2&&e.put(a(t.substring(n,n+2)),7))};var a=function(e){for(var t=0,n=0;n<e.length;n+=1)t=t*10+o(e.charAt(n));return t},o=function(e){if(`0`<=e&&e<=`9`)return e.charCodeAt(0)-48;throw`illegal char :`+e};return i},u=function(e){var n=t.MODE_ALPHA_NUM,r=e,i={};i.getMode=function(){return n},i.getLength=function(e){return r.length},i.write=function(e){for(var t=r,n=0;n+1<t.length;)e.put(a(t.charAt(n))*45+a(t.charAt(n+1)),11),n+=2;n<t.length&&e.put(a(t.charAt(n)),6)};var a=function(e){if(`0`<=e&&e<=`9`)return e.charCodeAt(0)-48;if(`A`<=e&&e<=`Z`)return e.charCodeAt(0)-65+10;switch(e){case` `:return 36;case`$`:return 37;case`%`:return 38;case`*`:return 39;case`+`:return 40;case`-`:return 41;case`.`:return 42;case`/`:return 43;case`:`:return 44;default:throw`illegal char :`+e}};return i},d=function(n){var r=t.MODE_8BIT_BYTE,i=e.stringToBytes(n),a={};return a.getMode=function(){return r},a.getLength=function(e){return i.length},a.write=function(e){for(var t=0;t<i.length;t+=1)e.put(i[t],8)},a},f=function(n){var r=t.MODE_KANJI,i=e.stringToBytesFuncs.SJIS;if(!i)throw`sjis not supported.`;(function(e,t){var n=i(e);if(n.length!=2||(n[0]<<8|n[1])!=t)throw`sjis not supported.`})(`友`,38726);var a=i(n),o={};return o.getMode=function(){return r},o.getLength=function(e){return~~(a.length/2)},o.write=function(e){for(var t=a,n=0;n+1<t.length;){var r=(255&t[n])<<8|255&t[n+1];if(33088<=r&&r<=40956)r-=33088;else if(57408<=r&&r<=60351)r-=49472;else throw`illegal char at `+(n+1)+`/`+r;r=(r>>>8&255)*192+(r&255),e.put(r,13),n+=2}if(n<t.length)throw`illegal char at `+(n+1)},o},p=function(){var e=[],t={};return t.writeByte=function(t){e.push(t&255)},t.writeShort=function(e){t.writeByte(e),t.writeByte(e>>>8)},t.writeBytes=function(e,n,r){n||=0,r||=e.length;for(var i=0;i<r;i+=1)t.writeByte(e[i+n])},t.writeString=function(e){for(var n=0;n<e.length;n+=1)t.writeByte(e.charCodeAt(n))},t.toByteArray=function(){return e},t.toString=function(){var t=``;t+=`[`;for(var n=0;n<e.length;n+=1)n>0&&(t+=`,`),t+=e[n];return t+=`]`,t},t},m=function(){var e=0,t=0,n=0,r=``,i={},a=function(e){r+=String.fromCharCode(o(e&63))},o=function(e){if(!(e<0)){if(e<26)return 65+e;if(e<52)return 97+(e-26);if(e<62)return 48+(e-52);if(e==62)return 43;if(e==63)return 47}throw`n:`+e};return i.writeByte=function(r){for(e=e<<8|r&255,t+=8,n+=1;t>=6;)a(e>>>t-6),t-=6},i.flush=function(){if(t>0&&(a(e<<6-t),e=0,t=0),n%3!=0)for(var i=3-n%3,o=0;o<i;o+=1)r+=`=`},i.toString=function(){return r},i},h=function(e){var t=e,n=0,r=0,i=0,a={};a.read=function(){for(;i<8;){if(n>=t.length){if(i==0)return-1;throw`unexpected end of file./`+i}var e=t.charAt(n);if(n+=1,e==`=`)return i=0,-1;e.match(/^\s$/)||(r=r<<6|o(e.charCodeAt(0)),i+=6)}var a=r>>>i-8&255;return i-=8,a};var o=function(e){if(65<=e&&e<=90)return e-65;if(97<=e&&e<=122)return e-97+26;if(48<=e&&e<=57)return e-48+52;if(e==43)return 62;if(e==47)return 63;throw`c:`+e};return a},g=function(e,t){var n=e,r=t,i=Array(e*t),a={};a.setPixel=function(e,t,r){i[t*n+e]=r},a.write=function(e){e.writeString(`GIF87a`),e.writeShort(n),e.writeShort(r),e.writeByte(128),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(255),e.writeByte(255),e.writeByte(255),e.writeString(`,`),e.writeShort(0),e.writeShort(0),e.writeShort(n),e.writeShort(r),e.writeByte(0);var t=2,i=s(t);e.writeByte(t);for(var a=0;i.length-a>255;)e.writeByte(255),e.writeBytes(i,a,255),a+=255;e.writeByte(i.length-a),e.writeBytes(i,a,i.length-a),e.writeByte(0),e.writeString(`;`)};var o=function(e){var t=e,n=0,r=0,i={};return i.write=function(e,i){if(e>>>i)throw`length over`;for(;n+i>=8;)t.writeByte(255&(e<<n|r)),i-=8-n,e>>>=8-n,r=0,n=0;r=e<<n|r,n+=i},i.flush=function(){n>0&&t.writeByte(r)},i},s=function(e){for(var t=1<<e,n=(1<<e)+1,r=e+1,a=c(),s=0;s<t;s+=1)a.add(String.fromCharCode(s));a.add(String.fromCharCode(t)),a.add(String.fromCharCode(n));var l=p(),u=o(l);u.write(t,r);var d=0,f=String.fromCharCode(i[d]);for(d+=1;d<i.length;){var m=String.fromCharCode(i[d]);d+=1,a.contains(f+m)?f+=m:(u.write(a.indexOf(f),r),a.size()<4095&&(a.size()==1<<r&&(r+=1),a.add(f+m)),f=m)}return u.write(a.indexOf(f),r),u.write(n,r),u.flush(),l.toByteArray()},c=function(){var e={},t=0,n={};return n.add=function(r){if(n.contains(r))throw`dup key:`+r;e[r]=t,t+=1},n.size=function(){return t},n.indexOf=function(t){return e[t]},n.contains=function(t){return e[t]!==void 0},n};return a},_=function(e,t,n){for(var r=g(e,t),i=0;i<t;i+=1)for(var a=0;a<e;a+=1)r.setPixel(a,i,n(a,i));var o=p();r.write(o);for(var s=m(),c=o.toByteArray(),l=0;l<c.length;l+=1)s.writeByte(c[l]);return s.flush(),`data:image/gif;base64,`+s};return e}();(function(){n.stringToBytesFuncs[`UTF-8`]=function(e){function t(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);r<128?t.push(r):r<2048?t.push(192|r>>6,128|r&63):r<55296||r>=57344?t.push(224|r>>12,128|r>>6&63,128|r&63):(n++,r=65536+((r&1023)<<10|e.charCodeAt(n)&1023),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63))}return t}return t(e)}})(),(function(n){typeof define==`function`&&define.amd?define([],n):typeof e==`object`&&(t.exports=n())})(function(){return n})}))(),1);function E(e){let t=e.normalize(`NFC`).toLowerCase().replace(/\s+/g,` `).trim(),n=2166136261;for(let e=0;e<t.length;e++)n=Math.imul(n^t.charCodeAt(e),16777619);return`VT${((n>>>0)%1679616).toString(36).toUpperCase().padStart(4,`0`)}`}function D(e){let t=e.replace(/\s+/g,``).toUpperCase();if(!/^[A-Z]{2}\d{2}[A-Z0-9]{8,30}$/.test(t))return``;let n=(t.slice(4)+t.slice(0,4)).replace(/[A-Z]/g,e=>String(e.charCodeAt(0)-55)),r=0;for(let e of n)r=(r*10+Number(e))%97;return r===1?t:``}function O(e,t,n){let r=D(e.iban);if(!r||!e.name.trim())return``;let i=t>0&&t<1e9?`EUR${t.toFixed(2)}`:``;return[`BCD`,`002`,`1`,`SCT`,(e.bic??``).replace(/\s+/g,``).toUpperCase(),e.name.trim().slice(0,70),r,i,``,``,n.replace(/[\r\n]+/g,` `).trim().slice(0,140)].join(`
`)}function k(e,t=4){let n=(0,T.default)(0,`M`);n.addData(unescape(encodeURIComponent(e))),n.make();let r=n.getModuleCount(),i=(r+8)*t,a=``;for(let e=0;e<r;e++)for(let i=0;i<r;i++)n.isDark(e,i)&&(a+=`M${(i+4)*t} ${(e+4)*t}h${t}v${t}h-${t}z`);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${i}" width="${i}" height="${i}" role="img"><rect width="100%" height="100%" fill="#fff"/><path d="${a}" fill="#000"/></svg>`}function A(e){let t=e.replace(/[\s ']/g,``);if(!/^-?\d[\d.,]*$/.exec(t))return null;let n=/[.,](\d{1,2})$/.exec(t),r=(n?t.slice(0,-n[0].length):t).replace(/[.,]/g,``),i=Number(`${r}.${n?n[1]:`0`}`);return Number.isFinite(i)?i:null}function j(e,t){let n=/<Ntry[\s>]/.test(e)?e.split(/<Ntry[\s>]/).slice(1).map(e=>e.split(`</Ntry>`)[0]):e.split(/\r?\n/).slice(1),r=new Map,i=0;for(let e of n){if(!e.trim()||/<CdtDbtInd>\s*DBIT/.test(e))continue;let n=[...e.toUpperCase().matchAll(/VT[0-9A-Z]{4}/g)].map(e=>e[0]).filter(e=>t.has(e)),a=/<Amt[^>]*>([\d.,]+)<\/Amt>/.exec(e),o=a?A(a[1]):null;if(o===null){let t=e.split(/[;\t]|,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(e=>e.replace(/^"|"$/g,``).trim()).map(A).filter(e=>e!==null&&e>0&&e<1e6);o=t.length?Math.max(...t.filter(e=>!Number.isInteger(e)||e<1e4)):null}!n.length||o===null||!Number.isFinite(o)?(o!==null||n.length)&&i++:r.set(n[0],(r.get(n[0])??0)+o)}return{paid:r,unmatched:i}}var M=`//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

var qrcode = function() {

  //---------------------------------------------------------------------
  // qrcode
  //---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function(typeNumber, errorCorrectionLevel) {

    var PAD0 = 0xEC;
    var PAD1 = 0x11;

    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];

    var _this = {};

    var makeImpl = function(test, maskPattern) {

      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);

      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);

      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }

      mapData(_dataCache, maskPattern);
    };

    var setupPositionProbePattern = function(row, col) {

      for (var r = -1; r <= 7; r += 1) {

        if (row + r <= -1 || _moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c += 1) {

          if (col + c <= -1 || _moduleCount <= col + c) continue;

          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };

    var getBestMaskPattern = function() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i += 1) {

        makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(_this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    };

    var setupTimingPattern = function() {

      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };

    var setupPositionAdjustPattern = function() {

      var pos = QRUtil.getPatternPosition(_typeNumber);

      for (var i = 0; i < pos.length; i += 1) {

        for (var j = 0; j < pos.length; j += 1) {

          var row = pos[i];
          var col = pos[j];

          if (_modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r += 1) {

            for (var c = -2; c <= 2; c += 1) {

              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };

    var setupTypeNumber = function(test) {

      var bits = QRUtil.getBCHTypeNumber(_typeNumber);

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };

    var setupTypeInfo = function(test, maskPattern) {

      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test);
    };

    var mapData = function(data, maskPattern) {

      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);

      for (var col = _moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col -= 1;

        while (true) {

          for (var c = 0; c < 2; c += 1) {

            if (_modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }

              var mask = maskFunc(row, col - c);

              if (mask) {
                dark = !dark;
              }

              _modules[row][col - c] = dark;
              bitIndex -= 1;

              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };

    var createBytes = function(buffer, rsBlocks) {

      var offset = 0;

      var maxDcCount = 0;
      var maxEcCount = 0;

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r += 1) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }

      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }

      var data = new Array(totalCodeCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }

      return data;
    };

    var createData = function(typeNumber, errorCorrectionLevel, dataList) {

      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

      var buffer = qrBitBuffer();

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }

      // calc num max data.
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }

      // padding
      while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }

      return createBytes(buffer, rsBlocks);
    };

    _this.addData = function(data, mode) {

      mode = mode || 'Byte';

      var newData = null;

      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }

      _dataList.push(newData);
      _dataCache = null;
    };

    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };

    _this.getModuleCount = function() {
      return _moduleCount;
    };

    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();

          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        _typeNumber = typeNumber;
      }

      makeImpl(false, getBestMaskPattern() );
    };

    _this.createTableTag = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var qrHtml = '';

      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';

      for (var r = 0; r < _this.getModuleCount(); r += 1) {

        qrHtml += '<tr>';

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }

        qrHtml += '</tr>';
      }

      qrHtml += '</tbody>';
      qrHtml += '</table>';

      return qrHtml;
    };

    _this.createSvgTag = function(cellSize, margin, alt, title) {

      var opts = {};
      if (typeof arguments[0] == 'object') {
        // Called by options.
        opts = arguments[0];
        // overwrite cellSize and margin.
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      // Compose alt property surrogate
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

      // Compose title property surrogate
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';

      return qrSvg;
    };

    _this.createDataURL = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };

    _this.createImgTag = function(cellSize, margin, alt) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;

      var img = '';
      img += '<img';
      img += '\\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\\u0020width="';
      img += size;
      img += '"';
      img += '\\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';

      return img;
    };

    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };

    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r1, r2, p;

      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };

      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };

      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }

          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }

        ascii += '\\n';
      }

      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;

      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }

      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r, p;

      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');

      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          line += p ? white : black;
        }

        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\\n';
        }
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
      }
    }

    return _this;
  };

  //---------------------------------------------------------------------
  // qrcode.stringToBytes
  //---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function(unicodeData, numChars) {

    // create conversion map.

    var unicodeMap = function() {

      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };

      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }

      return unicodeMap;
    }();

    var unknownChar = '?'.charCodeAt(0);

    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              // 1byte
              bytes.push(b);
            } else {
              // 2bytes
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = function() {

    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    var _this = {};

    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {

      switch (maskPattern) {

      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 27) {

        // 10 - 26

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 41) {

        // 27 - 40

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }

      } else {
        throw 'type:' + type;
      }
    };

    _this.getLostPoint = function(qrcode) {

      var moduleCount = qrcode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {

          var sameCount = 0;
          var dark = qrcode.isDark(row, col);

          for (var r = -1; r <= 1; r += 1) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c += 1) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = function() {

    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }

    var _this = {};

    _this.glog = function(n) {

      if (n < 1) {
        throw 'glog(' + n + ')';
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {

    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }

    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();

    var _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {

      var num = new Array(_this.getLength() + e.getLength() - 1);

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {

      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  var QRRSBlock = function() {

    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    var _this = {};

    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }

      var length = rsBlock.length / 3;

      var list = [];

      for (var i = 0; i < length; i += 1) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }

      return list;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  var qrBitBuffer = function() {

    var _buffer = [];
    var _length = 0;

    var _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {

      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  var qrNumber = function(data) {

    var _mode = QRMode.MODE_NUMBER;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var data = _data;

      var i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };

    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };

    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  var qrAlphaNum = function(data) {

    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var s = _data;

      var i = 0;

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };

    var getCode = function(c) {

      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  var qr8BitByte = function(data) {

    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  var qrKanji = function(data) {

    var _mode = QRMode.MODE_KANJI;
    var _data = data;

    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      // self test for sjis support.
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\\u53cb', 0x9746);

    var _bytes = stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };

    _this.write = function(buffer) {

      var data = _bytes;

      var i = 0;

      while (i + 1 < data.length) {

        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }

        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

        buffer.put(c, 13);

        i += 2;
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };

    return _this;
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  var byteArrayOutputStream = function() {

    var _bytes = [];

    var _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  var base64EncodeOutputStream = function() {

    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';

    var _this = {};

    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };

    var encode = function(n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };

    _this.writeByte = function(n) {

      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };

    _this.flush = function() {

      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64DecodeInputStream
  //---------------------------------------------------------------------

  var base64DecodeInputStream = function(str) {

    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;

    var _this = {};

    _this.read = function() {

      while (_buflen < 8) {

        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }

        var c = _str.charAt(_pos);
        _pos += 1;

        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\\s$/) ) {
          // ignore if whitespace.
          continue;
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }

      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };

    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  var gifImage = function(width, height) {

    var _width = width;
    var _height = height;
    var _data = new Array(width * height);

    var _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {

      //---------------------------------
      // GIF Signature

      out.writeString('GIF87a');

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      var offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(';');
    };

    var bitOutputStream = function(out) {

      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;

      var _this = {};

      _this.write = function(data, length) {

        if ( (data >>> length) != 0) {
          throw 'length over';
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    var getLZWRaster = function(lzwMinCodeSize) {

      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      var table = lzwTable();

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );

      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      var dataIndex = 0;

      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {

        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c) ) {

          s = s + c;

        } else {

          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {

            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    var lzwTable = function() {

      var _map = {};
      var _size = 0;

      var _this = {};

      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };

      return _this;
    };

    return _this;
  };

  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }

    var b = byteArrayOutputStream();
    gif.write(b);

    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    return 'data:image/gif;base64,' + base64;
  };

  //---------------------------------------------------------------------
  // returns qrcode function.

  return qrcode;
}();

// multibyte support
!function() {

  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  }
}(function () {
    return qrcode;
}));
`,N={bg:{photoN:`Снимка {n}`,at:`{n} от {all}`,for:`За {name}`,until:`Поръчки до {date}`,step1:`Докоснете снимка`,step2:`Изберете какво и колко`,step3:`Изпратете поръчката`,prices:`Цени`,hint:`Докоснете снимка, за да поръчате от нея`,piece:`{n} бр.`,pieces:`{n} бр.`,fromPhoto:`от {n} сн.`,fromPhotos:`от {n} сн.`,order:`Поръчай`,yourOrder:`Вашата поръчка`,edit:`Промени`,done:`Готово`,close:`Затвори`,prev:`Предишна`,next:`Следваща`,more:`Още: {item}`,less:`По-малко: {item}`,name:`Име на детето или на семейството`,note:`Бележка (по желание)`,needName:`Напишете име, за да знае фотографът чия е поръчката.`,total:`Общо`,send:`Изпратете това съобщение{to}`,toWho:` до {to}`,share:`Изпрати`,copy:`Копирай`,mail:`Имейл`,sms:`SMS`,copied:`Копирано. Поставете го в съобщение до фотографа.`,shared:`Изпратено. Благодарим!`,codeNote:`Кодът в края казва на фотографа точно какво сте избрали. Не го променяйте.`,orderOf:`Поръчка: {title}`,from:`От`,noteWord:`Бележка`,ordersTo:`Поръчки: {to}`,nojs:`Ако бутоните не работят, отворете файла в браузър (Chrome или Safari). Или напишете номерата на снимките и колко от всяко искате в съобщение{to}.`,chosen:`{n} избрани`,retake:`Моля, снимайте детето отново`,askRetake:`Нито една не е сполучлива? Помолете за нова снимка`,retakeLine:`Молим за нова снимка.`,moreOff:`Всяко следващо копие от същото: −{p}%`,lateUp:`След {date}: +{p}%`,payBank:`Платете с банков превод`,payQr:`Сканирайте кода с банковото си приложение или въведете данните:`,payLine:`{name} · IBAN {iban} · основание {ref}`},en:{photoN:`Photo {n}`,at:`{n} of {all}`,for:`For {name}`,until:`Orders by {date}`,step1:`Tap a photo`,step2:`Choose what and how many`,step3:`Send the order`,prices:`Prices`,hint:`Tap a photo to order from it`,piece:`{n} piece`,pieces:`{n} pieces`,fromPhoto:`from {n} photo`,fromPhotos:`from {n} photos`,order:`Order`,yourOrder:`Your order`,edit:`Change`,done:`Done`,close:`Close`,prev:`Previous`,next:`Next`,more:`More: {item}`,less:`Fewer: {item}`,name:`Child's or family name`,note:`Note (optional)`,needName:`Write a name so the photographer knows whose order it is.`,total:`Total`,send:`Send this message{to}`,toWho:` to {to}`,share:`Send`,copy:`Copy`,mail:`E-mail`,sms:`Text`,copied:`Copied. Paste it into a message to the photographer.`,shared:`Sent. Thank you!`,codeNote:`The code at the end tells the photographer exactly what you chose. Please leave it as it is.`,orderOf:`Order: {title}`,from:`From`,noteWord:`Note`,ordersTo:`Orders: {to}`,nojs:`If the buttons do not work, open the file in a browser (Chrome or Safari). Or write the photo numbers and how many of each you want in a message{to}.`,chosen:`{n} chosen`,retake:`Please photograph the child again`,askRetake:`None of them right? Ask for a new photo`,retakeLine:`We would like a new photo.`,moreOff:`Each further piece of the same: −{p}%`,lateUp:`After {date}: +{p}%`,payBank:`Pay by bank transfer`,payQr:`Scan the code with your bank app, or type the details in:`,payLine:`{name} · IBAN {iban} · reference {ref}`}},P=e=>e.replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`),F=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``)),I=e=>JSON.stringify(e).replace(/</g,`\\u003c`).replace(/\u2028/g,`\\u2028`).replace(/\u2029/g,`\\u2029`),L=(e,t=22)=>`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,R={left:L(`<path d="M15 5l-7 7 7 7"/>`,26),right:L(`<path d="M9 5l7 7-7 7"/>`,26),close:L(`<path d="M6 6l12 12M18 6L6 18"/>`),share:L(`<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/>`,18),copy:L(`<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>`,18),mail:L(`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>`,18),sms:L(`<path d="M4 5h16v11H9l-5 4z"/>`,18)},z=`
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
.rule-note{margin:10px 0 0;color:var(--muted);font-size:14px;text-align:center}
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
.chk{display:flex;gap:10px;align-items:center;margin-top:14px;font-size:15px}.chk input{width:20px;height:20px;accent-color:var(--gold)}
.link{border:0;background:none;color:var(--muted);font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:6px}
.err{margin:8px 0 0;color:var(--err);font-size:14px}
.send{margin:22px 0 8px;font-weight:600}
.msgbox{margin:0;padding:12px 14px;border-radius:10px;background:var(--bg);color:var(--muted);font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere}
.small{margin:8px 0 0;color:var(--muted);font-size:13px}
.acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.acts .btn{flex:1 1 130px}
.pay{margin-top:18px;text-align:center}.pay .qr svg{display:block;width:180px;height:180px;margin:10px auto;border-radius:8px}.pay .small{overflow-wrap:anywhere}
.ok{min-height:1.5em;margin:12px 0 0;color:var(--muted);font-size:14px;text-align:center}
[hidden]{display:none!important}
`;function B(e){let t=N[e.lang],n=e.deadline?new Date(`${e.deadline}T12:00`).toLocaleDateString(e.lang===`bg`?`bg-BG`:`en-GB`,{day:`numeric`,month:`long`}):``,r=e.to.trim(),i=r?F(t.toWho,{to:r}):``,a=e.photos.map((e,n)=>`<button type="button" class="tile" style="--r:${(e.w/e.h).toFixed(4)}" aria-label="${P(F(t.photoN,{n:n+1}))}"><img src="${e.src}" alt="${P(F(t.photoN,{n:n+1}))}" decoding="async"><span class="no">${n+1}</span><span class="got" hidden></span></button>`).join(``),o=e.items.map(e=>`<li><span>${P(e.name)}</span><b>${P(e.price)}</b></li>`).join(``),s={id:e.id,lang:e.lang,title:e.title,child:e.child,to:r,w:t,photos:e.photos.map(e=>({n:e.n})),items:e.items,bank:e.bank,more:e.rules?.more??0,late:e.deadline&&e.rules?.late?{day:e.deadline,by:e.rules.late}:null};return`<!doctype html>
<html lang="${e.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<title>${P(e.child?`${e.title}: ${e.child}`:e.title)}</title>
<style>${z}</style>
</head>
<body>
<header class="top">
${e.by?`<p class="by">${P(e.by)}</p>`:``}
<h1>${P(e.title)}</h1>
<span class="rule"></span>
${e.child?`<p class="for serif">${P(F(t.for,{name:e.child}))}</p>`:``}
${e.message?`<p class="msg">${P(e.message)}</p>`:``}
${n?`<p class="due">${P(F(t.until,{date:n}))}</p>`:``}
</header>
<ol class="steps" aria-hidden="true"><li>${t.step1}</li><li>${t.step2}</li><li>${t.step3}</li></ol>
<main class="grid">${a}</main>
${o?`<section class="prices"><h2>${t.prices}</h2><ul>${o}</ul>${[e.rules?.more?F(t.moreOff,{p:e.rules.more}):``,n&&e.rules?.late?F(t.lateUp,{date:n,p:e.rules.late}):``].filter(Boolean).map(e=>`<p class="rule-note">${P(e)}</p>`).join(``)}</section>`:``}
${r?`<p class="foot">${P(F(t.ordersTo,{to:r}))}</p>`:``}
<p class="foot"><button type="button" class="link ask">${t.askRetake}</button></p>
<noscript><p class="nojs">${P(F(t.nojs,{to:i}))}</p></noscript>
<div class="bar" hidden><div class="sum" aria-live="polite"></div><button type="button" class="btn go">${t.order}</button></div>
<dialog id="view" aria-label="${P(e.title)}">
<div class="stage"><img alt=""><button type="button" class="round l" aria-label="${t.prev}">${R.left}</button><button type="button" class="round r" aria-label="${t.next}">${R.right}</button><button type="button" class="round x" aria-label="${t.close}">${R.close}</button></div>
<div class="side"><h2 class="name"></h2><p class="at"></p><ul class="rows"></ul><button type="button" class="btn done">${t.done}</button></div>
</dialog>
<dialog id="order" aria-labelledby="order-h">
<div class="head"><h2 id="order-h">${t.yourOrder}</h2><button type="button" class="round x" aria-label="${t.close}">${R.close}</button></div>
<div class="body">
<ul class="lines"></ul>
<div class="total"></div>
<div class="pay" hidden><p class="send">${t.payBank}</p><p class="small">${t.payQr}</p><div class="qr"></div><p class="small bankline"></p></div>
<label class="f">${t.name}<input name="name" autocomplete="name" maxlength="60" required></label>
<p class="err" hidden>${t.needName}</p>
<label class="f">${t.note}<textarea name="note" rows="2" maxlength="300"></textarea></label>
<label class="chk"><input type="checkbox" name="retake"> ${t.retake}</label>
<p class="send">${P(F(t.send,{to:i}))}</p>
<pre class="msgbox"></pre>
<p class="small">${t.codeNote}</p>
<div class="acts"><button type="button" class="btn share">${R.share}${t.share}</button><button type="button" class="btn ghost copy">${R.copy}${t.copy}</button><button type="button" class="btn ghost mail" hidden>${R.mail}${t.mail}</button><button type="button" class="btn ghost sms" hidden>${R.sms}${t.sms}</button></div>
<p class="ok" aria-live="polite"></p>
<button type="button" class="btn ghost edit" style="width:100%;margin-top:6px">${t.edit}</button>
</div>
</dialog>
${e.bank?`<script>${M.replace(/<\/script/gi,`<\\/script`)}<\/script>`:``}
<script>(${String(V)})(${I(s)}, ${String(S)}, ${String(E)});<\/script>
</body>
</html>`}function V(e,t,n){let r=e.w,i=e=>document.querySelector(e),a=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``)),o=(e,t,...n)=>{let r=document.createElement(e);return t&&(r.className=t),r.append(...n),r},s=`vitrum-gallery:${e.id}:${e.child}`,c={c:{},name:e.child,note:``};try{let e=JSON.parse(localStorage.getItem(s)||`null`);e&&typeof e==`object`&&e.c&&(c={...c,...e})}catch{}let l=()=>{try{localStorage.setItem(s,JSON.stringify(c))}catch{}},u=[...document.querySelectorAll(`.tile`)],d=e=>u[e].querySelector(`img`).src,f=e=>{let t=/\d+(?:[.,]\d+)?/.exec(e);return t?parseFloat(t[0].replace(`,`,`.`)):null},p=e.items.find(e=>f(e.price)!==null)?.price??``,m=e.lang===`bg`||/\d,\d/.test(p),h=/\d[.,]\d/.test(p),g=e=>p.replace(/\d+(?:[.,]\d+)?/,()=>{let t=e.toFixed(h||e%1?2:0);return m?t.replace(`.`,`,`):t}),_=e=>a(e===1?r.piece:r.pieces,{n:e}),v=(e,t)=>`${e}.${t}`,y=()=>Object.entries(c.c).map(([e,t])=>{let[n,r]=e.split(`.`).map(Number);return{i:n,j:r,n:t}}).filter(t=>t.n>0&&u[t.i]&&e.items[t.j]).sort((e,t)=>e.i-t.i||e.j-t.j),b=!!e.late&&Date.now()>new Date(`${e.late.day}T23:59:59`).getTime(),x=()=>{let t=y(),n=0,r=0,i=!!p,a=new Map;for(let e of t)n+=e.n,a.set(e.j,(a.get(e.j)??0)+e.n);for(let[t,n]of a){let a=f(e.items[t].price);a===null?i=!1:r+=a*(1+(n-1)*(1-e.more/100))}return b&&(r*=1+e.late.by/100),r=Math.round(r*100)/100,{lines:t,count:n,money:r,priced:i,photos:new Set(t.map(e=>e.i)).size}},S=i(`.bar`),C=i(`.bar .sum`),w=i(`.bar .go`);S.hidden=!1;function T(){u.forEach((t,n)=>{let i=e.items.reduce((e,t,r)=>e+(c.c[v(n,r)]||0),0),o=t.querySelector(`.got`);t.classList.toggle(`on`,i>0),o.hidden=!i,o.textContent=String(i),t.setAttribute(`aria-label`,a(r.photoN,{n:n+1})+(i?`, ${_(i)}`:``))});let t=x();C.replaceChildren(...t.count?[o(`b`,``,_(t.count)+(t.priced?` · ${g(t.money)}`:``)),o(`small`,``,a(t.photos===1?r.fromPhoto:r.fromPhotos,{n:t.photos}))]:[o(`small`,``,r.hint)]),w.disabled=!t.count,l()}let E=i(`#view`),D=i(`#view .stage img`),O=i(`#view .rows`),k=0;function A(t){k=(t+u.length)%u.length,D.src=d(k),D.alt=a(r.photoN,{n:k+1}),i(`#view .name`).textContent=a(r.photoN,{n:k+1}),i(`#view .at`).textContent=u.length>1?a(r.at,{n:k+1,all:u.length}):``,O.replaceChildren(...e.items.map((e,t)=>{let n=c.c[v(k,t)]||0,i=e=>()=>{let r=Math.max(0,Math.min(99,n+e));r?c.c[v(k,t)]=r:delete c.c[v(k,t)],A(k),T()},s=o(`button`,``,`−`),l=o(`button`,``,`+`);return s.setAttribute(`aria-label`,a(r.less,{item:e.name})),l.setAttribute(`aria-label`,a(r.more,{item:e.name})),s.disabled=!n,s.onclick=i(-1),l.onclick=i(1),o(`li`,n?`on`:``,o(`div`,`what`,o(`span`,``,e.name),o(`small`,``,e.price)),o(`div`,`step`,s,o(`output`,``,String(n)),l))}))}u.forEach((e,t)=>{e.onclick=()=>{A(t),E.showModal()}}),i(`#view .l`).onclick=()=>A(k-1),i(`#view .r`).onclick=()=>A(k+1),i(`#view .x`).onclick=i(`#view .done`).onclick=()=>E.close(),u.length<2&&(i(`#view .l`).hidden=!0,i(`#view .r`).hidden=!0),E.addEventListener(`click`,e=>{e.target===E&&E.close()}),E.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&A(k-1),e.key===`ArrowRight`&&A(k+1)});let j=null,M=i(`#view .stage`);M.addEventListener(`pointerdown`,e=>{j=e.clientX}),M.addEventListener(`pointerup`,e=>{j!==null&&Math.abs(e.clientX-j)>50&&A(k+(e.clientX<j?1:-1)),j=null});let N=i(`#order`),P=i(`#order [name=name]`),F=i(`#order [name=note]`),I=i(`#order .err`),L=i(`#order .msgbox`),R=i(`#order .ok`),z=/[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+/.exec(e.to)?.[0]??``,B=/\+?\d[\d\s()-]{6,}\d/.exec(e.to)?.[0].replace(/[\s()-]/g,``)??``,V=i(`#order .mail`),H=i(`#order .sms`),U=i(`#order .share`);V.hidden=!z,H.hidden=!B,U.hidden=!navigator.share,navigator.share||i(`#order .copy`).classList.remove(`ghost`);function W(){let n=x(),i=P.value.trim(),o=F.value.trim();return[a(r.orderOf,{title:e.title}),`${r.from}: ${i||`…`}`,...n.lines.map(t=>{let n=f(e.items[t.j].price);return`• ${a(r.photoN,{n:t.i+1})}: ${e.items[t.j].name}, ${_(t.n)}${n!==null&&p?` (${g(n*t.n)})`:``}`}),`${r.total}: ${_(n.count)}${n.priced?`, ${g(n.money)}`:``}`,...o?[`${r.noteWord}: ${o}`]:[],...c.retake?[r.retakeLine]:[],``,t(e.id,[...n.lines.map(t=>[e.photos[t.i].n,t.j+1,t.n]),...c.retake?[[0,0,1]]:[]],i||`?`)].join(`
`)}let G=globalThis.qrcode;function K(){let t=x(),o=i(`#order .pay`),s=P.value.trim()||e.child;if(o.hidden=!(e.bank&&G&&t.priced&&t.money>0&&s),o.hidden||!e.bank||!G)return;let c=n(s),l=[`BCD`,`002`,`1`,`SCT`,``,e.bank.name.slice(0,70),e.bank.iban,`EUR${t.money.toFixed(2)}`,``,``,`${e.title} ${s} ${c}`.slice(0,140)].join(`
`),u=G(0,`M`);u.addData(unescape(encodeURIComponent(l))),u.make();let d=u.getModuleCount(),f=``;for(let e=0;e<d;e++)for(let t=0;t<d;t++)u.isDark(e,t)&&(f+=`M${t+4} ${e+4}h1v1h-1z`);i(`#order .pay .qr`).innerHTML=`<svg viewBox="0 0 ${d+8} ${d+8}" role="img" aria-label="QR"><rect width="100%" height="100%" fill="#fff"/><path d="${f}" fill="#000"/></svg>`,i(`#order .bankline`).textContent=a(r.payLine,{name:e.bank.name,iban:e.bank.iban,ref:c})}let q=i(`#order [name=retake]`);function J(){c.name=P.value,c.note=F.value,c.retake=q.checked,l(),L.textContent=W(),P.value.trim()&&(I.hidden=!0),K()}P.oninput=F.oninput=q.onchange=J,i(`.ask`).onclick=()=>{c.retake=!0,Y()},w.onclick=()=>Y();function Y(){let t=x();i(`#order .lines`).replaceChildren(...t.lines.map(t=>{let n=document.createElement(`img`),i=f(e.items[t.j].price);return n.src=d(t.i),n.alt=``,o(`li`,``,n,o(`div`,``,o(`span`,``,e.items[t.j].name),o(`small`,``,`${a(r.photoN,{n:t.i+1})} · ${_(t.n)}`)),o(`b`,``,i!==null&&p?g(i*t.n):``))})),i(`#order .total`).replaceChildren(o(`span`,``,r.total),o(`span`,``,_(t.count)+(t.priced?` · ${g(t.money)}`:``))),P.value=c.name,F.value=c.note,q.checked=!!c.retake,R.textContent=``,I.hidden=!0,J(),N.showModal()}let X=()=>P.value.trim()?!0:(I.hidden=!1,P.focus(),!1);async function Z(){if(X()){try{await navigator.clipboard.writeText(W())}catch{let e=document.createRange();e.selectNodeContents(L),getSelection()?.removeAllRanges(),getSelection()?.addRange(e),document.execCommand(`copy`)}R.textContent=r.copied}}i(`#order .copy`).onclick=()=>void Z(),U.onclick=async()=>{if(X())try{await navigator.share({text:W()}),R.textContent=r.shared}catch(e){e.name!==`AbortError`&&Z()}},V.onclick=()=>{X()&&(location.href=`mailto:${z}?subject=${encodeURIComponent(a(r.orderOf,{title:e.title}))}&body=${encodeURIComponent(W())}`)},H.onclick=()=>{X()&&(location.href=`sms:${B}?&body=${encodeURIComponent(W())}`)},i(`#order .x`).onclick=i(`#order .edit`).onclick=()=>N.close(),N.addEventListener(`click`,e=>{e.target===N&&N.close()}),T()}var H=t({openGallery:()=>W});function U(e){let t=new Set(e.selected.length?e.selected:e.currentId?[e.currentId]:[]);return d(e).filter(e=>t.has(e.id)&&!e.pending)}function W(e){let t=s.get().print,n=v(t.product);s.set({selected:e,currentId:e.includes(s.get().currentId??``)?s.get().currentId:e[0]??null}),!n.pricing&&!n.ordering&&o({product:`order-form`,page:0}),g.set(`sec:print-gallery`,!0),u(`print`),requestAnimationFrame(()=>document.getElementById(`gallery-out`)?.scrollIntoView({block:`start`,behavior:`smooth`}))}function G(e,t,n){if(!t)return[{child:``,photos:e}];let r=e.filter(e=>n.includes(e.name)),i=new Map;for(let t of e)n.includes(t.name)||i.set(t.name,[...i.get(t.name)??[],t]);return[...i].sort(([e],[t])=>e.localeCompare(t,void 0,{numeric:!0})).map(([e,t])=>({child:e,photos:[...t,...r]}))}var K=e=>e.trim().replace(/\s*[\\/:*?"<>|]+\s*/g,` `).trim()||`gallery`,q=e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>n(r.error),r.readAsDataURL(e)}),J=e=>`${(e/1048576).toLocaleString(s.get().lang,{maximumFractionDigits:+(e<10485760)})} MB`;async function Y(e){let t=s.get(),n=t.print.gallery,a=t.print.lang,u=t.print.items.filter(e=>e.name.trim()),d=new Set(Object.keys(t.bench.consent).filter(e=>t.bench.consent[e]?.solo===!1).flatMap(e=>r(e).map(e=>e.id))),g=U(t),v=g.filter(e=>t.bench.consent[e.name]?.solo!==!1&&!d.has(e.id)),b=g.length-v.length;if(!v.length||!u.length){e?.close(),c(v.length?_(`Put at least one item on the price list first`):_(`Select the photos for the gallery first`));return}if(!await i(v)){e?.close();return}let S=G(v,n.each,n.shared).slice(0,e?1:void 0),C=s.get().print.bank,w=C?D(C.iban):``,T=y(u.find(e=>x(e.price)!==null)?.price??``),E=w&&C?.name.trim()&&(!T||/€|eur/i.test(T))?{iban:w,name:C.name.trim()}:void 0,O=[...new Set(S.flatMap(e=>e.photos))],k=e?`preview`:Math.random().toString(36).slice(2,8).padEnd(6,`0`),A=n.title.trim()||(a===`bg`?`Снимки`:`Photos`),j=new Map(v.map((e,t)=>[e.id,t+1])),M=new Map,N=0;try{for(let[e,t]of O.entries()){s.set({busy:_(`Gallery: photo {n} of {all}`,{n:e+1,all:O.length})});try{let e=await f(t,{type:`image/jpeg`,quality:.8,longEdge:1200,mark:n.mark.trim()||void 0,markAt:`tiled`}),r=await createImageBitmap(e);M.set(t.id,{w:r.width,h:r.height,src:await q(e)}),r.close()}catch{N++}}let t=S.filter(e=>e.photos.some(e=>M.has(e.id))).map(e=>({child:e.child,html:B({id:k,lang:a,title:A,message:n.message.trim(),deadline:n.deadline,by:n.by.trim(),to:n.to.trim(),child:e.child,photos:e.photos.filter(e=>M.has(e.id)).map(e=>({n:j.get(e.id),...M.get(e.id)})),items:u.map(e=>({name:e.name.trim(),price:e.price.trim()})),bank:E,rules:s.get().print.rules})}));if(!t.length){e?.close(),c(_(`None of the photos could be read: is their folder still open?`));return}let r={id:k,made:Date.now(),title:A,deadline:n.deadline||void 0,photos:v.map(e=>({id:e.id,path:e.path,size:e.size})),items:u.map(e=>e.id)};o({galleries:[r,...s.get().print.galleries.filter(e=>e.id!==k)].slice(0,40)});let i=`${N?` ${_(`{n} could not be read and were left out.`,{n:N})}`:``}${b?` ${_(`{n} left out: no consent to portraits.`,{n:b})}`:``}`;if(e){e.location.href=URL.createObjectURL(new Blob([t[0].html],{type:`text/html`})),N&&c(i.trim());return}if(t.length===1){let e=new Blob([t[0].html],{type:`text/html`});h(e,`${K(t[0].child?`${A} ${t[0].child}`:A)}.html`),c(`${_(`Gallery saved: {photos}, {size}. Send the file to the families.`,{photos:m(M.size,`photo`),size:J(e.size)})}${i}`)}else{let e=p(),n=[],r=new Set;for(let i of t){let t=new TextEncoder().encode(i.html);n.push(e.entry(l(`${K(i.child)}.html`,r),t),new Blob([t]))}n.push(e.end());let a=new Blob(n,{type:`application/zip`});h(a,`${K(A)}.zip`),c(`${_(`{n} galleries saved, one a child, in one zip ({size}). Send each family its own file.`,{n:t.length,size:J(a.size)})}${i}`)}}finally{s.set({busy:null})}}function X(e,t=s.get()){let n=t.print.galleries.find(t=>t.id===e.gallery);if(!n)return null;let r=[];for(let[i,a,o]of e.lines){let e=n.photos[i-1],s=n.items[a-1],c=e&&(t.photos.find(t=>t.id===e.id)??t.photos.find(t=>t.path===e.path&&t.size===e.size));c&&s&&t.print.items.some(e=>e.id===s)&&r.push([c.id,s,o])}return{lines:r,lost:e.lines.length-r.length}}var Z=e=>`${e.gallery}:${e.name.toLocaleLowerCase()}`,Q=e=>e.length>3?_(`{names} and {n} more`,{names:e.slice(0,3).join(`, `),n:e.length-3}):e.join(`, `);function $(e){let{codes:t,broken:n}=w(e),r=s.get(),i={},l=[...r.print.taken],u=0,d=0,f=0,p=0,m=[],h=(e,t)=>{for(let[n,r,a]of e)(i[n]??={})[r]=(i[n][r]??0)+t*a};for(let e of t){let t=Z(e),n=l.find(e=>e.key===t);if(n?.code===e.code){u++;continue}let i=X(e,r);if(!i)d++;else{if(n){let e=w(n.code).codes[0],t=e&&X(e,r);t&&h(t.lines,-1),l=l.filter(e=>e!==n),f++}h(i.lines,1),p+=i.lost,l.push({key:t,code:e.code,name:e.name,at:Date.now()}),m.push(e.name)}}Object.keys(i).length&&a(i),m.length&&o({taken:l});let g=[...new Set(t.filter(e=>e.retake).map(e=>e.name))];if(g.length){let e={...s.get().print.families};for(let t of g)e[t]={...e[t],retake:b()};o({families:e})}let v=[m.length&&_(`Orders added: {names}`,{names:Q(m)}),g.length&&_(`Asked for a retake: {names}`,{names:Q(g)}),f&&_(`Replaced an earlier order from the same family: {n}`,{n:f}),u&&_(`Already taken in: {n}`,{n:u}),d&&_(`From a gallery not made in this browser: {n}`,{n:d}),n&&_(`Damaged, ask the family to send them again: {n}`,{n}),p&&_(`Lines for photos or items no longer here: {n}`,{n:p})].filter(Boolean);return c(v.length?v.join(`. `):_(`No order code in this text. A code starts with VITRUM:`)),m.length>0}function ee(e){let t=s.get(),n=w(e.code).codes[0],r=n&&X(n,t);if(r){let e={};for(let[t,n,i]of r.lines)(e[t]??={})[n]=(e[t][n]??0)-i;a(e)}o({taken:t.print.taken.filter(t=>t!==e)}),c(_(`Removed the order of {name}`,{name:e.name}),{label:_(`Undo`),run:()=>void $(e.code)})}var te=e=>w(e.code).codes[0]?.lines.reduce((e,t)=>e+t[2],0)??0;export{U as a,D as c,j as d,E as f,G as i,O as l,Y as n,te as o,H as r,$ as s,ee as t,k as u};