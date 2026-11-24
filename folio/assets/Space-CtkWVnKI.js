const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Atlas-DQK5NmgE.js","./jsx-runtime-0-5nSPw2.js","./rolldown-runtime-4tVxZq34.js","./Globe-Yi_h9Ibd.js","./sky-31J7kRNq.js","./index-Cta3XKN4.js","./react-dom-kV2y0rSg.js","./store-r0kqocqH.js","./ui-Pk-Db17H.js","./sound-BmtYxzeF.js","./index-DNRoUUaR.css","./handover-ziA8KDk1.js","./where-w8zGBUIw.js"])))=>i.map(i=>d[i]);
import{f as e,g as t,h as n,i as r,t as i}from"./jsx-runtime-0-5nSPw2.js";import{L as a,h as o,i as s,l as c,o as l,y as u}from"./ui-Pk-Db17H.js";import{St as d,_ as f,b as p,c as ee,ct as m,et as te,g as h,h as ne,m as g,ot as _,s as re,st as v,t as y,v as ie,y as ae}from"./index-Cta3XKN4.js";import{At as oe,Et as se,Ft as ce,I as le,K as b,Lt as x,M as ue,N as de,Nt as fe,X as pe,_t as me,at as he,bt as ge,ct as _e,g as ve,gt as ye,h as be,kt as xe,l as Se,n as Ce,q as we,r as Te,u as S,vt as Ee,x as De,xt as Oe,yt as ke}from"./three.module-Dm-x96Fb.js";import{r as C}from"./sound-BmtYxzeF.js";import{i as Ae,n as je,r as w,t as Me}from"./Story-DpAg8mvo.js";import{n as T,t as Ne}from"./handover-ziA8KDk1.js";var E=t(),Pe=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Fe=(e,t,n)=>e+(t-e)*n;function Ie(e,t){let n=Math.hypot(t.target[0]-e.target[0],t.target[1]-e.target[1],t.target[2]-e.target[2]),r=Math.log(e.dist),i=Math.log(t.dist),a=Math.max(0,Math.log(n*1.4)-Math.max(r,i)),o=(t.yaw-e.yaw)%360;return o>180&&(o-=360),o<-180&&(o+=360),n=>{if(n<=0)return e;if(n>=1)return t;let s=Pe(n),c=a>0?Pe(Math.min(1,Math.max(0,(n-.15)/.7))):s;return{target:[0,1,2].map(n=>Fe(e.target[n],t.target[n],c)),dist:Math.exp(Fe(r,i,s)+a*Math.sin(Math.PI*n)),yaw:e.yaw+o*s,pitch:Fe(e.pitch,t.pitch,s)}}}var Le=(e,t,n)=>e/Math.sin(Math.atan(Math.tan(t/2*Math.PI/180)*n)),Re=6,ze=160,Be=`./textures/`,Ve=3.2,He=2.6,Ue=.15;function D(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let e of t)e()},sub(e){return t.add(e),()=>void t.delete(e)}}}var O=e=>_[e].km/g,k=Math.PI/180,A=e=>new x(e[0],e[1],e[2]),We=[[1,0,0],[0,1,0],[0,0,1]],Ge=(e,t,n)=>{let[r,i]=[Math.tan(35/2*k),Math.tan(n/2*k)],a=Math.min(.999,t/e);return a<1e-6?e*r/i:t/Math.sin(Math.atan(Math.tan(Math.asin(a))/r*i))},Ke=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},qe=`
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) { s += a * snoise(p); p = p * 2.07 + vec3(17.1, 5.3, 9.7); a *= 0.5; }
  return s;
}`;function Je(){let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,`rgba(255,236,190,1)`),n.addColorStop(.25,`rgba(255,200,110,0.55)`),n.addColorStop(1,`rgba(255,170,60,0)`),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new S(e);return r.colorSpace=ke,r}function Ye(){try{return!!document.createElement(`canvas`).getContext(`webgl2`)}catch{return!1}}function Xe(e,t){if(!Ye())return null;let n;try{n=new Ce({antialias:!0,logarithmicDepthBuffer:!0})}catch{return null}n.setPixelRatio(Math.min(devicePixelRatio,2)),n.setClearColor(131848,1);let r=n.domElement;r.style.touchAction=`none`,r.style.transition=`opacity .15s`,e.appendChild(r);let i=n.capabilities.getMaxAnisotropy(),a=matchMedia(`(prefers-reduced-motion: reduce)`).matches,o=Date.now(),s=ie(o),c=Object.fromEntries(v.map(e=>[e,h(e,o)])),l=new ge,u=new he(35,1,1e-6,1e7),d=new De;l.add(d);let ee=new _e(16777215,Ve,0,0);d.add(ee);let m=new ve(16777215,0);l.add(m,m.target);let te=new Te(16777215,Ue);l.add(te);let g=new se(1,96,64),re=new fe,y=[g],S=(e,t)=>{re.load(Be+e,e=>{e.colorSpace=ke,e.anisotropy=i,y.push(e),t(e),Q()})},C={},Ae=new Set;for(let e of v){let t=_[e],n=e===`Sun`?new we({color:t.colour}):new pe({color:t.colour,roughness:1,metalness:0});y.push(n);let r=new b(g,n),[i,a,o]=c[e],l=O(e);if(r.matrixAutoUpdate=!1,r.matrix.makeBasis(A(i),A(o),A(a).negate()).scale(new x(l,l,l)).setPosition(A(s[e])),d.add(r),C[e]=r,t.ring){let{inner:e,outer:n,map:i}=t.ring,a=new Ee(e,n,160,1),o=a.attributes.uv,s=a.attributes.position;for(let t=0;t<s.count;t++)o.setXY(t,(Math.hypot(s.getX(t),s.getY(t))-e)/(n-e),.5);a.rotateX(-Math.PI/2);let c=new pe({color:16777215,side:2,transparent:!0,opacity:0,depthWrite:!1,roughness:1});y.push(a,c),r.add(new b(a,c)),S(i,e=>{c.map=e,c.opacity=1,c.needsUpdate=!0})}}let je=e=>{let t=e===`Earth`?`earth-day-2k.jpg`:_[e].map;!Ae.has(e)&&t&&(Ae.add(e),e===`Earth`&&(S(`earth-clouds.jpg`,e=>{j.alphaMap=e,j.opacity=.92,j.needsUpdate=!0}),S(`earth-night-2k.jpg`,e=>{T.emissiveMap=e,T.emissive.set(16771524),T.emissiveIntensity=1.5,T.needsUpdate=!0})),S(t,t=>{let n=C[e].material;n.map=t,n.color.set(16777215),n.needsUpdate=!0}))},w=A(s.Sun).sub(A(s.Earth)).normalize(),Me={uSunDir:{value:new x(1,0,0)},uNight:{value:1}},T=C.Earth.material;T.onBeforeCompile=e=>{Object.assign(e.uniforms,Me),e.fragmentShader=`uniform vec3 uSunDir;\nuniform float uNight;\n${e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
  totalEmissiveRadiance *= uNight * smoothstep(0.08, -0.2, dot(normalize(vNormal), uSunDir));`)}`};let Ne=(e,t)=>new x(Math.cos(e*k)*Math.cos(t*k),Math.sin(e*k),-Math.cos(e*k)*Math.sin(t*k)),[E,Pe,Fe]=c.Earth.map(A),D={uTime:{value:0},uPower:{value:.7},uRadius:{value:.4},uSun:{value:new x(w.dot(E),w.dot(Fe),-w.dot(Pe))},uNorth:{value:Ne(80.7,-72.7)},uSouth:{value:Ne(-80.7,107.3)},uMap:{value:null},uLive:{value:0}},Xe=(e,t)=>{let n=new Oe({uniforms:D,transparent:!0,depthWrite:!1,blending:2,vertexShader:`#include <common>
#include <logdepthbuf_pars_vertex>
varying vec3 vPos;
varying vec3 vN;
varying vec3 vV;
void main() {
  vPos = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = mv.xyz;
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
  #include <logdepthbuf_vertex>
}`,fragmentShader:`
        #include <common>
        #include <logdepthbuf_pars_fragment>
        uniform float uTime, uPower, uRadius, uLive;
        uniform vec3 uSun, uNorth, uSouth;
        uniform sampler2D uMap;
        varying vec3 vPos;
        varying vec3 vN;
        varying vec3 vV;
        ${qe}
        float oval(vec3 p, vec3 pole, float seed) {
          float away = acos(clamp(dot(p, pole), -1.0, 1.0));
          // round the pole from local noon (towards the Sun) through midnight
          vec3 noon = normalize(uSun - pole * dot(uSun, pole));
          float round = atan(dot(p, cross(pole, noon)), dot(p, noon));
          float midnight = 0.5 - 0.5 * cos(round); // 0 at noon, 1 at midnight
          vec2 ring = vec2(cos(round), sin(round));
          float t = uTime;
          float r = uRadius - 0.075 * (1.0 - midnight)
            + 0.03 * fbm(vec3(ring * 1.6, seed + t * 0.012))
            + 0.008 * snoise(vec3(ring * 9.0, seed + t * 0.05));
          float off = away - r;
          float arc = exp(-pow(off / 0.016, 2.0));
          float second = 0.5 * exp(-pow((off - 0.032 - 0.01 * snoise(vec3(ring * 4.0, seed + 3.0 + t * 0.02))) / 0.012, 2.0));
          float diffuse = 0.32 * exp(-pow((off - 0.05) / 0.075, 2.0));
          float surge = smoothstep(-0.45, 0.6, fbm(vec3(ring * 2.2, seed + 7.0 + t * 0.035)));
          float rays = 0.75 + 0.25 * snoise(vec3(ring * 140.0, seed + t * 0.25));
          return ((arc + second) * rays + diffuse) * (0.45 + 0.55 * surge) * (0.4 + 0.6 * midnight) * 1.7;
        }
        // NOAA's map says where and how strongly (0 to 1); the noise gives it the look: arcs along the
        // magnetic latitude, fine rays across them, and brighter surges drifting along
        float live(vec3 p) {
          float lat = asin(clamp(p.y, -1.0, 1.0)) / PI * 180.0;
          float lon = atan(-p.z, p.x) / PI * 180.0;
          float strength = texture2D(uMap, vec2(fract((lon + 0.5) / 360.0 + 1.0), (lat + 90.5) / 181.0)).r;
          vec3 pole = p.y > 0.0 ? uNorth : uSouth;
          float seed = p.y > 0.0 ? 0.0 : 11.0;
          float away = acos(clamp(dot(p, pole), -1.0, 1.0));
          vec3 noon = normalize(uSun - pole * dot(uSun, pole));
          float round = atan(dot(p, cross(pole, noon)), dot(p, noon));
          vec2 ring = vec2(cos(round), sin(round));
          float t = uTime;
          // one to three arcs across the band, folding as they go
          float arcs = pow(1.0 - abs(snoise(vec3(away * 13.0 + 0.7 * snoise(vec3(ring * 3.0, seed + t * 0.02)), ring * 1.2 + vec2(seed, t * 0.015)))), 3.0);
          float rays = 0.75 + 0.25 * snoise(vec3(ring * 140.0, seed + t * 0.25));
          float surge = 0.6 + 0.4 * smoothstep(-0.45, 0.6, fbm(vec3(ring * 2.2, seed + 7.0 + t * 0.035)));
          // a quiet night still has a faint thin oval; a storm, a broad bright one
          return smoothstep(0.02, 0.6, strength) * (0.55 + 0.6 * arcs) * rays * surge * 1.45;
        }
        void main() {
          #include <logdepthbuf_fragment>
          vec3 p = normalize(vPos);
          float dark = smoothstep(0.12, -0.18, dot(p, uSun));
          float limb = clamp(0.35 / (abs(dot(normalize(vN), normalize(-vV))) + 0.25), 1.0, 3.0);
          float glow = (uLive > 0.5 ? live(p) : (oval(p, uNorth, 0.0) + oval(p, uSouth, 11.0)) * uPower) * dark * limb;
          ${t?`glow *= 0.32;
          gl_FragColor = vec4(vec3(1.0, 0.16, 0.2) * glow, glow);`:`vec3 colour = mix(vec3(0.2, 1.0, 0.45), vec3(0.7, 1.0, 0.78), smoothstep(1.1, 2.2, glow));
          gl_FragColor = vec4(colour * glow, glow);`}
        }`}),r=new b(g,n);r.scale.setScalar(e),C.Earth.add(r),y.push(n)};Xe(1.017,!1),Xe(1.039,!0);let j=new pe({color:16777215,transparent:!0,opacity:0,depthWrite:!1,roughness:1,metalness:0});j.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying float vUp;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vUp = position.y;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vUp;`).replace(`#include <alphamap_fragment>`,`#include <alphamap_fragment>
  diffuseColor.a *= smoothstep(0.985, 0.9, abs(vUp));`)};let M=new b(g,j);M.scale.setScalar(1.006),C.Earth.add(M),y.push(j);let Ze=2,Qe={value:0},$e=C.Sun.material;$e.onBeforeCompile=e=>{e.uniforms.uTime=Qe,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vSun;
varying vec3 vSunN;
varying vec3 vSunV;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vSun = position;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vSunV = mvPosition.xyz;
vSunN = normalize(normalMatrix * normal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nuniform float uTime;\nvarying vec3 vSun;\nvarying vec3 vSunN;\nvarying vec3 vSunV;\n${qe}`).replace(`#include <map_fragment>`,`#include <map_fragment>
        vec3 flow = vec3(snoise(vSun * 3.0 + vec3(0.0, 0.0, uTime * 0.012)), snoise(vSun * 3.0 + vec3(31.4, 0.0, -uTime * 0.01)), snoise(vSun * 3.0 + vec3(0.0, 57.2, uTime * 0.008)));
        float cells = fbm(vSun * 34.0 + flow * 1.6 + uTime * 0.05);
        float currents = fbm(vSun * 6.0 + flow * 0.6 - uTime * 0.015);
        float mu = clamp(dot(normalize(vSunN), normalize(-vSunV)), 0.0, 1.0);
        diffuseColor.rgb *= (0.8 + 0.3 * cells + 0.14 * currents) * (0.4 + 0.6 * pow(mu, 0.5));
        diffuseColor.rgb = mix(diffuseColor.rgb * vec3(1.0, 0.62, 0.32), diffuseColor.rgb, smoothstep(0.0, 0.55, mu));`)};let N=1.12,et=new Oe({uniforms:{uTime:Qe},transparent:!0,depthWrite:!1,side:1,blending:2,vertexShader:`#include <common>
#include <logdepthbuf_pars_vertex>
varying vec3 vPos;
varying vec3 vN;
varying vec3 vV;
void main() {
  vPos = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = mv.xyz;
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
  #include <logdepthbuf_vertex>
}`,fragmentShader:`
      #include <logdepthbuf_pars_fragment>
      uniform float uTime;
      varying vec3 vPos;
      varying vec3 vN;
      varying vec3 vV;
      ${qe}
      void main() {
        #include <logdepthbuf_fragment>
        // 1 just outside the Sun's edge, 0 at the shell's own edge
        float mu = abs(dot(normalize(vN), normalize(-vV)));
        float h = clamp(mu / sqrt(1.0 - 1.0 / (${N} * ${N})), 0.0, 1.0);
        float n = fbm(vPos * 3.0 + vec3(0.0, uTime * 0.04, uTime * 0.025));
        float tongues = smoothstep(-0.1, 0.8, n);
        float a = pow(h, 3.0 - 1.6 * tongues) * (0.25 + 0.85 * tongues);
        gl_FragColor = vec4(mix(vec3(1.0, 0.32, 0.08), vec3(1.0, 0.75, 0.35), a) * a, a);
      }`}),tt=new b(g,et);tt.scale.setScalar(N),C.Sun.add(tt),y.push(et);let nt=Je(),P=new oe({map:nt,blending:2,depthWrite:!1,transparent:!0}),rt=new xe(P);d.add(rt),y.push(nt,P);let it=[],at=(e,t,n,r)=>{let i=new Se().setFromPoints(e.map(A)),a=new de({color:t,transparent:!0,opacity:.5,depthWrite:!1}),o=new ue(i,a);n.add(o),it.push({line:o,m:a,moon:r}),y.push(i,a)};for(let e of v)e!==`Sun`&&e!==`Moon`&&at(f(e,o),_[e].colour,d);{let e=Array.from({length:180},(e,t)=>{let n=ie(o+t/180*2360594880);return[n.Moon[0]-n.Earth[0],n.Moon[1]-n.Earth[1],n.Moon[2]-n.Earth[2]]}),t=new De;t.position.copy(A(s.Earth)),d.add(t),at([...e,e[0]],_.Moon.colour,t,!0)}let F=new we({color:9079434,side:1,depthWrite:!1}),I=new b(g,F);{let[e,t,n]=ne;I.matrixAutoUpdate=!1,I.matrix.makeBasis(A(e),A(n).negate(),A(t)).scale(new x(1e5,1e5,1e5)),I.renderOrder=-1,I.visible=!1}l.add(I),y.push(F);let ot=setTimeout(()=>S(`4k_stars_milky_way.jpg`,e=>{F.map=e,F.needsUpdate=!0,I.visible=!0}),400),L=1,R=1,z=null,B=`camera`,V=We,st=()=>Le(33,35,.92*Math.min(1,L/R)),H={target:[0,0,0],dist:100,yaw:-90,pitch:35},U={...H},W=null,G=new x(0,0,1),K=0,q=0,J=35,Y=35,X={x:.5,y:.5},Z={x:.5,y:.5},ct=0,lt=0,ut=!1,dt=(e,t)=>{let[n,r,i,a]=[Math.cos(e.yaw*k),Math.sin(e.yaw*k),Math.cos(e.pitch*k),Math.sin(e.pitch*k)];return[0,1,2].map(e=>i*n*t[0][e]+i*r*t[1][e]+a*t[2][e])},ft=(e,t)=>{let n=n=>e[0]*t[n][0]+e[1]*t[n][1]+e[2]*t[n][2];return{yaw:Math.atan2(n(1),n(0))/k,pitch:Math.asin(Math.max(-1,Math.min(1,n(2))))/k}},pt=()=>{let e=B===`globe`&&z?c[z]:We;if(e===V)return;let t=dt(H,V),n=dt(U,V);V=e,H={...H,...ft(t,V)},U={...U,...ft(n,V)},W&&=null},mt=()=>Le(O(z??`Sun`),35,.9),ht=e=>Math.max(-85,Math.min(85,e)),gt=e=>{let t=e.clone().applyMatrix4(u.matrixWorldInverse),n=e.clone().project(u);return{x:(n.x+1)/2*L,y:(1-n.y)/2*R,front:t.z<0}},_t=e=>{if(lt=0,ut)return;let r=ct?Math.min(100,e-ct):16;ct=e;let i=!1,c=e=>1-Math.exp(-r/e);if(W){let t=Math.min(1,(e-W.start)/W.ms);H=W.run(t),t>=1&&(W=null,U={...H}),i=!0}else{let e=c(70),t=(U.yaw-H.yaw)%360;t>180&&(t-=360),t<-180&&(t+=360);let n=Math.log(U.dist/H.dist),r=U.pitch-H.pitch;Math.abs(t)>.01||Math.abs(r)>.01||Math.abs(n)>5e-4?(H={target:U.target,yaw:H.yaw+t*e,pitch:H.pitch+r*e,dist:H.dist*Math.exp(n*e)},i=!0):H={...U}}Math.abs(q-K)>.002?(K+=(q-K)*c(180),i=!0):K=q,Math.abs(Math.log(Y/J))>.002?(J*=Math.exp(Math.log(Y/J)*c(160)),i=!0):J=Y;let f=A(V[2]);G.distanceTo(f)>.001?(G.lerp(f,c(180)).normalize(),i=!0):G.copy(f);for(let e of[`x`,`y`])Math.abs(Z[e]-X[e])>5e-4?(X[e]+=(Z[e]-X[e])*c(150),i=!0):X[e]=Z[e];d.position.copy(A(H.target)).negate();let p=dt(H,V),h=Ge(H.dist,z?O(z):0,J);u.position.set(p[0]*h,p[1]*h,p[2]*h),u.up.copy(G),u.lookAt(0,0,0),u.fov=J,u.near=h*1e-4,u.far=1e7,u.aspect=L/R,u.setViewOffset(L,R,L/2-X.x*L,R/2-X.y*R,L,R),u.updateMatrixWorld(),d.updateMatrixWorld(),I.matrix.setPosition(u.position),ee.intensity=Ve*(1-K),m.intensity=He*K,te.intensity=Ue+.9*K,m.position.copy(new x(-.6,.5,1).applyQuaternion(u.quaternion).multiplyScalar(h).add(u.position)),Me.uSunDir.value.copy(w).transformDirection(u.matrixWorldInverse),Me.uNight.value=1-K,D.uTime.value=e/1e3,a||(Qe.value=e/1e3,M.rotation.y=e/1e3*.003),D.uPower.value=(.75+Ze*.18)*(1-K),D.uRadius.value=.36+Ze*.025;let ne=Math.tan(J/2*k);F.color.setScalar(.54*Ke(8,30,J));let g=v.map(e=>{let t=A(s[e]).add(d.position),n=t.distanceTo(u.position),r=R/2*Math.tan(Math.asin(Math.min(1,O(e)/n)))/ne;(r>4||e===z)&&je(e);let i=gt(t);return{id:e,x:i.x,y:i.y,px:r,visible:i.front&&i.x>-L*.1&&i.x<L*1.1&&i.y>-R*.1&&i.y<R*1.1}});{let e=g[0].px,t=A(s.Sun).add(d.position).distanceTo(u.position),n=Math.max(e*1.6,26);rt.scale.setScalar(n*2*(2*t*ne/R))}let _=Ke(.004,.05,H.dist);for(let e of it)e.m.opacity=e.moon?.45*Ke(6e-4,.002,H.dist)*(1-Ke(.03,.12,H.dist)):.45*_;for(let e of it)e.line.visible=e.m.opacity>.01;!a&&g[v.indexOf(`Earth`)].px>30&&K<.98&&(i=!0),!a&&g[0].px>24&&g[0].visible&&(i=!0),n.render(l,u),t.onFrame({bodies:g,flying:!!W,project(e,t){if(!z)return null;let n=ae(z,o,e,t),r=O(z),i=A(s[z]).add(d.position),a=A(n).multiplyScalar(r).add(i),c=gt(a);return{x:c.x,y:c.y,front:A(n).dot(u.position.clone().sub(a))>0}}}),i&&Q()},Q=()=>{!lt&&!ut&&(lt=requestAnimationFrame(_t))},$=new Map,vt=()=>{W&&(W=null,U={...H})},yt=e=>{vt(),U={...U,dist:Math.max(mt(),Math.min(ze,U.dist*e))},Q()},bt=e=>{r.setPointerCapture(e.pointerId),$.set(e.pointerId,{x:e.clientX,y:e.clientY})},xt=e=>{let t=$.get(e.pointerId);if(!t)return;let n={x:e.clientX,y:e.clientY};if($.size===1){vt();let e=R/2*O(z??`Sun`)/H.dist/Math.tan(35/2*k),r=Math.max(.03,Math.min(.35,57/Math.max(1,e)));U={...U,yaw:U.yaw-(n.x-t.x)*r,pitch:ht(U.pitch+(n.y-t.y)*r)},Q()}else if($.size===2){let[t,r]=[...$.entries()].map(([t,r])=>t===e.pointerId?n:r),[i,a]=[...$.values()],o=Math.hypot(i.x-a.x,i.y-a.y),s=Math.hypot(t.x-r.x,t.y-r.y);o>0&&s>0&&yt(o/s)}$.set(e.pointerId,n)},St=e=>$.delete(e.pointerId),Ct=e=>{e.preventDefault(),yt(Math.exp(e.deltaY*(e.deltaMode===1?16:1)*.0015))};r.addEventListener(`pointerdown`,bt),r.addEventListener(`pointermove`,xt),r.addEventListener(`pointerup`,St),r.addEventListener(`pointercancel`,St),r.addEventListener(`wheel`,Ct,{passive:!1});let wt=new ResizeObserver(()=>{L=Math.max(1,e.clientWidth),R=Math.max(1,e.clientHeight),n.setSize(L,R),Q()});wt.observe(e),L=Math.max(1,e.clientWidth),R=Math.max(1,e.clientHeight),n.setSize(L,R),Q();let Tt=e=>{W=null,H=e,U={...e},Q()};return{focus(e,t={}){let n=e!==z;z=e,pt();let i=e?s[e]:[0,0,0],o=e?Le(O(e),35,t.fill??1/3):st(),{yaw:c,pitch:l}=U;(n||t.night)&&B===`camera`&&(e?e===`Sun`?l=15:t.night?(c=(Math.atan2(i[1],i[0])/k+20)%360,l=50):(c=(Math.atan2(i[1],i[0])/k+115)%360,l=12):l=Math.max(l,30));let u={target:i,dist:o,yaw:c,pitch:l};if(t.instant||!n&&!t.night&&!W&&Math.abs(Math.log(o/H.dist))<.01)return Tt(u);if(a){r.style.opacity=`0`,setTimeout(()=>{Tt(u),r.style.opacity=`1`},150);return}let d={...H},f=Math.max(Math.hypot(...i.map((e,t)=>e-d.target[t])),o,d.dist)/Math.min(o,d.dist);W={run:Ie(d,u),start:performance.now(),ms:Math.min(1800,1e3+70*Math.log(f))},Q()},setLight(e){q=+(e===`reading`),a&&(K=q),Q()},setSpin(e){B=e,pt(),Q()},setCentre(e,t){Z.x=e,Z.y=t,(a||!ct)&&Object.assign(X,Z),Q()},turnTo(e,t){B===`globe`&&(vt(),U={...U,yaw:t,pitch:ht(e)},Q())},setAurora(e){Ze=Math.max(0,Math.min(9,e)),Q()},setAuroraMap(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=Math.round(Math.max(0,Math.min(100,e[n]))*2.55);let n=new be(t,360,181,ye,ce);n.magFilter=n.minFilter=le,n.wrapS=me,n.needsUpdate=!0,D.uMap.value?.dispose(),D.uMap.value=n,D.uLive.value=1,y.push(n),Q()},setLens(e){Y=e===`long`?Re:35,a&&(J=Y),Q()},viewFrom(e,t,n,r,i,a){z=e,B=`globe`,V=c[e],G.copy(A(V[2])),K=q=1,J=Y=Re,X.x=Z.x=i,X.y=Z.y=a,Tt({target:s[e],dist:Le(O(e),35,r/(R/2)),yaw:n,pitch:t})},centreOf(e){let t=A(s[e]).add(d.position),n=u.position.clone().sub(t);return p(e,o,[n.x,n.y,n.z])},dispose(){ut=!0,cancelAnimationFrame(lt),clearTimeout(ot),wt.disconnect(),r.removeEventListener(`wheel`,Ct);for(let e of y)e.dispose();n.dispose(),r.remove()}}}var j=e=>{let t=(e%360+540)%360-180;return t===-180?180:Math.round(t*1e6)/1e6},M=(e,t,n,r)=>({lang:`en`,key:e.replace(/ /g,`_`),title:e,lat:t,lon:j(n),kind:r}),Ze={Moon:[M(`Apollo 11`,.67416,23.47314,`landing`),M(`Apollo 12`,-3.01239,-23.42157,`landing`),M(`Apollo 14`,-3.6453,-17.47136,`landing`),M(`Apollo 15`,26.1322,3.6339,`landing`),M(`Apollo 16`,-8.97301,15.50019,`landing`),M(`Apollo 17`,20.1908,30.7717,`landing`),M(`Chang’e 4`,-45.444,177.599,`landing`),M(`Tycho (lunar crater)`,-43.31,-11.36,`crater`),M(`Copernicus (lunar crater)`,9.62,-20.08,`crater`)],Mars:[M(`Viking 1`,22.27,312.05,`landing`),M(`Viking 2`,47.64,-225.71,`landing`),M(`Mars Pathfinder`,19.13,-33.22,`landing`),M(`Spirit (rover)`,-14.5684,175.4726,`landing`),M(`Opportunity (rover)`,-1.9462,354.4734,`landing`),M(`Curiosity (rover)`,-4.5895,137.4417,`landing`),M(`InSight`,4.5024,135.6234,`landing`),M(`Perseverance (rover)`,18.4446,77.4509,`landing`),M(`Zhurong (rover)`,25.102,109.914,`landing`)]},Qe={Moon:[`Category:Maria on the Moon`,`Category:Impact craters on the Moon`],Mars:[`Category:Mountains on Mars`,`Category:Valleys and canyons on Mars`,`Category:Impact craters on Mars`]};function $e(e,t){return/Maria|Mare |Oceanus|Lacus|Sinus|Palus/.test(e+` `+t)?`sea`:/Mountains|Mons|Montes/.test(e)?`mountain`:/Valleys|canyons/.test(e)?`valley`:`crater`}var N=e=>e.replace(/ \([^)]*\)$/,``),et={Moon:8e3,Mars:4e3};async function tt(e,t){let n=[],r={};for(let i=0;i<6;i++){let i=new URLSearchParams({action:`query`,format:`json`,formatversion:`2`,origin:`*`,generator:`categorymembers`,gcmtitle:t,gcmtype:`page`,gcmlimit:`max`,prop:`coordinates|info`,coprop:`globe`,colimit:`max`,...r}),a=await fetch(`https://en.wikipedia.org/w/api.php?${i}`).then(e=>e.json());for(let r of a.query?.pages??[]){let i=r.coordinates?.find(t=>t.globe?.toLowerCase()===e.toLowerCase()),a=$e(t,r.title);i&&(a!==`crater`||(r.length??0)>=et[e])&&n.push(M(r.title,i.lat,i.lon,a))}if(!a.continue)break;r=a.continue}return n}async function nt(e){let t=[];for(let n of Qe[e])t.push(...await tt(e,n).catch(()=>[]));let n=new Set;return[...Ze[e],...t].filter(e=>!n.has(e.title)&&n.add(e.title))}var P=i(),rt={landing:0,sea:1,mountain:2,valley:3,crater:4},it=40,at={landing:r(`Landing sites`),sea:r(`Seas`),mountain:r(`Mountains`),valley:r(`Valleys`),crater:r(`Craters`)};function F(t,n){return e(t===`landing`?`Landing site`:t===`sea`?n===`Moon`?`A “sea” of old lava`:`A plain`:t===`mountain`?`A mountain`:t===`valley`?`A valley or canyon`:`A crater`)}function I({world:t,frames:n,space:r}){let{data:i,error:c}=o(()=>nt(t).then(e=>d(e))),[l,u]=(0,E.useState)(null),f=(0,E.useMemo)(()=>new Map((i??[]).map(e=>[N(e.title),e])),[i]),p=(e,t=!1)=>{C(`pop`),u(e),e&&t&&r?.turnTo(e.lat,e.lon)};return(0,P.jsxs)(P.Fragment,{children:[i&&(0,P.jsx)(ot,{frames:n,world:t,places:i,picked:l,onPick:e=>p(e)}),(0,P.jsxs)(`div`,{className:`explore-bar`,children:[(0,P.jsxs)(`a`,{className:`btn quiet`,href:a(t),children:[(0,P.jsx)(s,{name:`left`,size:18}),` `,Ae(t)]}),(0,P.jsxs)(`label`,{className:`explore-find`,children:[(0,P.jsx)(s,{name:`search`,size:18}),(0,P.jsx)(`input`,{className:`input`,list:`explore-places`,placeholder:e(i?`Find a place`:`Finding places…`),"aria-label":e(t===`Moon`?`Find a place on the Moon`:`Find a place on Mars`),disabled:!i,onChange:e=>{let t=f.get(e.target.value);t&&p(t,!0)}})]}),(0,P.jsx)(`datalist`,{id:`explore-places`,children:[...f.keys()].sort().map(e=>(0,P.jsx)(`option`,{value:e},e))}),c?(0,P.jsx)(`p`,{className:`explore-note`,children:e(`The places didn’t load. Check the connection.`)}):null]}),(0,P.jsx)(`ul`,{className:`explore-key`,"aria-label":e(`What the pins mean`),children:[`landing`,`sea`,`mountain`,`valley`,`crater`].filter(e=>i?.some(t=>t.kind===e)).map(t=>(0,P.jsxs)(`li`,{"data-kind":t,children:[(0,P.jsx)(`i`,{"aria-hidden":`true`}),e(at[t])]},t))}),l&&(0,P.jsx)(L,{place:l,world:t,onClose:()=>u(null)},l.title)]})}function ot({frames:e,world:t,places:n,picked:r,onPick:i}){let a=(0,E.useSyncExternalStore)(e.sub,e.get);if(!a||a.flying)return null;let o=a.bodies.find(e=>e.id===t);if(!o)return null;let s=n.map(e=>({p:e,s:a.project(e.lat,e.lon)})).filter(({s:e})=>e&&e.front&&Math.hypot(e.x-o.x,e.y-o.y)<o.px*.93).map(({p:e,s:t})=>({p:e,x:t.x,y:t.y,d:Math.hypot(t.x-o.x,t.y-o.y)})).sort((e,t)=>rt[e.p.kind]-rt[t.p.kind]||e.d-t.d),c=[],l=[],u=0;return(0,P.jsx)(`div`,{className:`place-pins`,children:s.map(({p:e,x:t,y:n})=>{if(e.kind!==`landing`&&c.some(e=>Math.hypot(e.x-t,e.y-n)<26)||e.kind===`crater`&&++u>it)return null;c.push({x:t,y:n});let a=N(e.title),o={x0:t-6,x1:t+14+a.length*7.2,y:n},s=l.some(e=>Math.abs(e.y-n)<18&&e.x0<o.x1&&o.x0<e.x1);return s||l.push(o),(0,P.jsxs)(`button`,{className:`place-pin`,"data-kind":e.kind,"data-crowded":s||void 0,"aria-pressed":r?.title===e.title,style:{transform:`translate(${t}px, ${n}px)`},onClick:()=>i(e),children:[(0,P.jsx)(`i`,{"aria-hidden":`true`}),(0,P.jsx)(`span`,{children:a})]},e.title)})})}function L({place:t,world:n,onClose:r}){let{data:i,error:a}=o(()=>w(t.title)),l=y([t.title]);return(0,P.jsxs)(`section`,{className:`place-card`,"aria-live":`polite`,children:[(0,P.jsxs)(`header`,{children:[(0,P.jsx)(`p`,{className:`story-kind`,children:F(t.kind,n)}),(0,P.jsx)(`h2`,{children:N(t.title)}),(0,P.jsx)(`button`,{className:`icon-btn`,onClick:r,"aria-label":e(`Close`),children:(0,P.jsx)(s,{name:`x`})})]}),i?.extract?(0,P.jsx)(`p`,{lang:i.lang,children:je(i.extract,3,i.lang)}):a?null:(0,P.jsx)(c,{lines:3}),(0,P.jsx)(`a`,{className:`btn primary`,href:l(t.title),children:e(`Read about it`)})]})}function R(e,t,n,r){if(!e)return{fx:.5,fy:.5,fill:0};let i=_[e].ring?1.9:1;if(t)return n>=900?{fx:(n-400)/2/n,fy:.52,fill:Math.min(.42*r,.4*(n-400))/(r/2)}:{fx:.5,fy:.42,fill:Math.min(.3*r,.44*n)/(r/2)};if(n>=900){let e=n-Math.min(448,.4*n)-48,t=Math.min(e*.3,r*.3)/i;return{fx:e/2/n,fy:.5,fill:t/(r/2)}}return{fx:.5,fy:.26,fill:Math.min(n*.3,r*.17)/i/(r/2)}}function z({body:t,explore:r=!1}){let i=(0,E.useRef)(null),o=(0,E.useRef)(null),s=(0,E.useMemo)(D,[]),[c,d]=(0,E.useState)(!1),[f,p]=(0,E.useState)(null),h=(0,E.useSyncExternalStore)(s.sub,()=>s.get()?.flying??!0),[ne,g]=(0,E.useState)(0),[_,y]=(0,E.useState)(0),ie=ne>=5||_>=50;(0,E.useEffect)(()=>{let e=i.current,t=Xe(e,{onFrame:s.set});t||d(!0),o.current=t,re().then(e=>{t?.setAurora(e.kp),g(e.kp)},()=>{});let n=new ResizeObserver(()=>p([e.clientWidth,e.clientHeight]));return n.observe(e),()=>{n.disconnect(),t?.dispose(),o.current=null}},[s]),(0,E.useEffect)(()=>{t===`Earth`&&ee().then(e=>{o.current?.setAuroraMap(e.grid),y(e.max)},()=>{})},[t]);let ae=(0,E.useRef)(!1);(0,E.useEffect)(()=>{if(t!==`Earth`||r){ae.current=!1;return}if(!ie||!f||ae.current)return;ae.current=!0;let e=setTimeout(()=>{o.current?.focus(`Earth`,{fill:R(`Earth`,!1,...f).fill,night:!0}),te(`aurora`)},1600);return()=>clearTimeout(e)},[ie,t,r,f]);let oe=(0,E.useRef)(null);(0,E.useEffect)(()=>{let e=o.current;if(!e||!f)return;let n=`${t}/${r}`,a=oe.current!==null&&oe.current!==n,{fx:s,fy:c,fill:l}=R(t,r,...f),u=oe.current===null&&t===`Earth`&&!r?Ne():null;if(u){let t=i.current.getBoundingClientRect();e.viewFrom(`Earth`,u.lat,u.lon,u.radiusPx,(u.cx-t.left)/f[0],(u.cy-t.top)/f[1])}e.setLens(`wide`),e.setSpin(r?`globe`:`camera`),e.setLight(r?`reading`:`sun`),e.setCentre(s,c),e.focus(t??null,{instant:!a&&!u,fill:l}),oe.current=n},[t,r,f]);let[se,ce]=(0,E.useState)(!1);return(0,P.jsxs)(`div`,{className:`space`,"data-body":t?!0:void 0,"data-explore":r||void 0,children:[(0,P.jsx)(`div`,{className:`space-stage`,ref:i,role:`img`,"aria-label":e(`The solar system in 3D, as it is right now. Drag to turn, pinch or scroll to zoom.`),children:c&&(0,P.jsx)(`div`,{className:`space-none`,children:(0,P.jsx)(l,{title:e(`Space needs 3D graphics`),children:e(`This browser can’t draw 3D scenes, or they are switched off. The articles about the planets are still a search away.`)})})}),!r&&!se&&(0,P.jsx)(B,{frames:s,focus:t}),(0,P.jsxs)(`nav`,{className:`space-list`,"aria-label":e(`Worlds`),hidden:r||se,children:[(0,P.jsx)(`a`,{href:a(),"aria-current":!t||void 0,children:e(`Whole solar system`)}),v.map(n=>(0,P.jsxs)(`a`,{href:a(n),"aria-current":n===t&&!r||void 0,children:[Ae(n),n===`Earth`&&ie&&(0,P.jsx)(`span`,{className:`aurora-badge`,children:(0,P.jsx)(`span`,{className:`vh`,children:e(`The northern lights are out right now`)})})]},n))]}),r&&(t===`Moon`||t===`Mars`)&&(0,P.jsx)(I,{world:t,frames:s,space:o.current},t),t&&!r&&(0,P.jsx)(`div`,{className:`space-story`,"data-shown":!h&&!se||void 0,children:(0,P.jsx)(Me,{id:t,onAtlas:()=>{let e=o.current,t=i.current,r=t?.closest(`main`);if(!e||!t||!r||!f)return m(`#/atlas`);n(()=>import(`./Atlas-DQK5NmgE.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]),import.meta.url);let a=T(r),s=t.getBoundingClientRect();ce(!0),e.setSpin(`globe`),e.setLight(`reading`),e.setLens(`long`),e.setCentre((a.cx-s.left)/f[0],(a.cy-s.top)/f[1]),e.focus(`Earth`,{fill:a.radiusPx/(f[1]/2)}),setTimeout(()=>{let{lat:t,lon:n}=e.centreOf(`Earth`);m(u(t,n))},1250)}})},t)]})}function B({frames:e,focus:t}){let n=(0,E.useSyncExternalStore)(e.sub,e.get);if(!n)return null;let r=[];return(0,P.jsx)(`div`,{className:`space-marks`,"aria-hidden":`true`,children:n.bodies.map(e=>{if(!e.visible||e.id===t||e.px>40)return null;let n=e.px>5,i=n?e.y+e.px+6:e.y,o=r.some(t=>Math.abs(t.x-e.x)<56&&Math.abs(t.y-i)<20);return o||r.push({x:e.x,y:i}),(0,P.jsxs)(`a`,{className:`space-mark`,href:a(e.id),tabIndex:-1,"data-big":n||void 0,"data-crowded":o||void 0,style:{transform:`translate(${e.x}px, ${i}px)`,"--c":_[e.id].colour},children:[(0,P.jsx)(`i`,{}),(0,P.jsx)(`span`,{children:Ae(e.id)})]},e.id)})})}export{z as default};