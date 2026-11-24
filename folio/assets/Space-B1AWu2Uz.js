const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Atlas-BaDVo8UJ.js","./i18n-DqqWKbkD.js","./rolldown-runtime-4tVxZq34.js","./countries-110m-BYrHn7Xh.js","./index-DspRLFnA.js","./react-dom-75MSrfsz.js","./store-TeViJFW3.js","./links-DXVyzO7G.js","./sound-D_andtWq.js","./ui-CEWC_8aL.js","./jsx-runtime-Dw_NFuYc.js","./index-BjkzOJye.css","./Globe-dOMqDlAC.js","./sky-CZ8PnCTM.js","./handover-ziA8KDk1.js"])))=>i.map(i=>d[i]);
import{d as e,h as t,m as n,r}from"./i18n-DqqWKbkD.js";import{r as i,x as a}from"./links-DXVyzO7G.js";import{C as o,D as s,E as c,It as l,O as u,T as d,_ as f,bt as p,g as m,k as ee,l as h,pt as g,w as _,xt as te,yt as v}from"./index-DspRLFnA.js";import{At as ne,Et as re,Ft as ie,I as ae,K as y,Lt as b,M as oe,N as se,Nt as ce,X as le,_t as ue,at as de,bt as fe,ct as pe,g as me,gt as he,h as ge,kt as _e,l as ve,n as ye,q as be,r as xe,u as x,vt as Se,x as Ce,xt as we,yt as Te}from"./three.module-Dm-x96Fb.js";import{a as Ee}from"./sound-D_andtWq.js";import{h as S,i as De,l as C,o as w}from"./ui-CEWC_8aL.js";import{i as T,n as Oe,r as ke,t as Ae}from"./Story-BDemGu-P.js";import{t as je}from"./jsx-runtime-Dw_NFuYc.js";import{n as E,t as Me}from"./handover-ziA8KDk1.js";var D=t(),Ne=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Pe=(e,t,n)=>e+(t-e)*n;function Fe(e,t){let n=Math.hypot(t.target[0]-e.target[0],t.target[1]-e.target[1],t.target[2]-e.target[2]),r=Math.log(e.dist),i=Math.log(t.dist),a=Math.max(0,Math.log(n*1.4)-Math.max(r,i)),o=(t.yaw-e.yaw)%360;return o>180&&(o-=360),o<-180&&(o+=360),n=>{if(n<=0)return e;if(n>=1)return t;let s=Ne(n),c=a>0?Ne(Math.min(1,Math.max(0,(n-.15)/.7))):s;return{target:[0,1,2].map(n=>Pe(e.target[n],t.target[n],c)),dist:Math.exp(Pe(r,i,s)+a*Math.sin(Math.PI*n)),yaw:e.yaw+o*s,pitch:Pe(e.pitch,t.pitch,s)}}}var Ie=(e,t,n)=>e/Math.sin(Math.atan(Math.tan(t/2*Math.PI/180)*n)),Le=6,Re=160,ze=`./textures/`,Be=3.2,Ve=2.6,He=.15;function O(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let e of t)e()},sub(e){return t.add(e),()=>void t.delete(e)}}}var k=e=>v[e].km/o,A=Math.PI/180,j=e=>new b(e[0],e[1],e[2]),Ue=[[1,0,0],[0,1,0],[0,0,1]],We=(e,t,n)=>{let[r,i]=[Math.tan(35/2*A),Math.tan(n/2*A)],a=Math.min(.999,t/e);return a<1e-6?e*r/i:t/Math.sin(Math.atan(Math.tan(Math.asin(a))/r*i))},Ge=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ke=`
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
}`;function qe(){let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,`rgba(255,236,190,1)`),n.addColorStop(.25,`rgba(255,200,110,0.55)`),n.addColorStop(1,`rgba(255,170,60,0)`),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new x(e);return r.colorSpace=Te,r}function Je(){try{return!!document.createElement(`canvas`).getContext(`webgl2`)}catch{return!1}}function Ye(e,t){if(!Je())return null;let n;try{n=new ye({antialias:!0,logarithmicDepthBuffer:!0})}catch{return null}n.setPixelRatio(Math.min(devicePixelRatio,2)),n.setClearColor(131848,1);let r=n.domElement;r.style.touchAction=`none`,r.style.transition=`opacity .15s`,e.appendChild(r);let i=n.capabilities.getMaxAnisotropy(),a=matchMedia(`(prefers-reduced-motion: reduce)`).matches,o=Date.now(),l=s(o),f=Object.fromEntries(p.map(e=>[e,d(e,o)])),m=new fe,h=new de(35,1,1e-6,1e7),g=new Ce;m.add(g);let te=new pe(16777215,Be,0,0);g.add(te);let x=new me(16777215,0);m.add(x,x.target);let Ee=new xe(16777215,He);m.add(Ee);let S=new re(1,96,64),De=new ce,C=[S],w=(e,t)=>{De.load(ze+e,e=>{e.colorSpace=Te,e.anisotropy=i,C.push(e),t(e),Q()})},T={},Oe=new Set;for(let e of p){let t=v[e],n=e===`Sun`?new be({color:t.colour}):new le({color:t.colour,roughness:1,metalness:0});C.push(n);let r=new y(S,n),[i,a,o]=f[e],s=k(e);if(r.matrixAutoUpdate=!1,r.matrix.makeBasis(j(i),j(o),j(a).negate()).scale(new b(s,s,s)).setPosition(j(l[e])),g.add(r),T[e]=r,t.ring){let{inner:e,outer:n,map:i}=t.ring,a=new Se(e,n,160,1),o=a.attributes.uv,s=a.attributes.position;for(let t=0;t<s.count;t++)o.setXY(t,(Math.hypot(s.getX(t),s.getY(t))-e)/(n-e),.5);a.rotateX(-Math.PI/2);let c=new le({color:16777215,side:2,transparent:!0,opacity:0,depthWrite:!1,roughness:1});C.push(a,c),r.add(new y(a,c)),w(i,e=>{c.map=e,c.opacity=1,c.needsUpdate=!0})}}let ke=e=>{let t=e===`Earth`?`earth-day-2k.jpg`:v[e].map;!Oe.has(e)&&t&&(Oe.add(e),e===`Earth`&&(w(`earth-clouds.jpg`,e=>{M.alphaMap=e,M.opacity=.92,M.needsUpdate=!0}),w(`earth-night-2k.jpg`,e=>{E.emissiveMap=e,E.emissive.set(16771524),E.emissiveIntensity=1.5,E.needsUpdate=!0})),w(t,t=>{let n=T[e].material;n.map=t,n.color.set(16777215),n.needsUpdate=!0}))},Ae=j(l.Sun).sub(j(l.Earth)).normalize(),je={uSunDir:{value:new b(1,0,0)},uNight:{value:1}},E=T.Earth.material;E.onBeforeCompile=e=>{Object.assign(e.uniforms,je),e.fragmentShader=`uniform vec3 uSunDir;\nuniform float uNight;\n${e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
  totalEmissiveRadiance *= uNight * smoothstep(0.08, -0.2, dot(normalize(vNormal), uSunDir));`)}`};let Me=(e,t)=>new b(Math.cos(e*A)*Math.cos(t*A),Math.sin(e*A),-Math.cos(e*A)*Math.sin(t*A)),[D,Ne,Pe]=f.Earth.map(j),O={uTime:{value:0},uPower:{value:.7},uRadius:{value:.4},uSun:{value:new b(Ae.dot(D),Ae.dot(Pe),-Ae.dot(Ne))},uNorth:{value:Me(80.7,-72.7)},uSouth:{value:Me(-80.7,107.3)},uMap:{value:null},uLive:{value:0}},Ye=(e,t)=>{let n=new we({uniforms:O,transparent:!0,depthWrite:!1,blending:2,vertexShader:`#include <common>
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
        ${Ke}
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
        }`}),r=new y(S,n);r.scale.setScalar(e),T.Earth.add(r),C.push(n)};Ye(1.017,!1),Ye(1.039,!0);let M=new le({color:16777215,transparent:!0,opacity:0,depthWrite:!1,roughness:1,metalness:0});M.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying float vUp;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vUp = position.y;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vUp;`).replace(`#include <alphamap_fragment>`,`#include <alphamap_fragment>
  diffuseColor.a *= smoothstep(0.985, 0.9, abs(vUp));`)};let N=new y(S,M);N.scale.setScalar(1.006),T.Earth.add(N),C.push(M);let Xe=2,Ze={value:0},Qe=T.Sun.material;Qe.onBeforeCompile=e=>{e.uniforms.uTime=Ze,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vSun;
varying vec3 vSunN;
varying vec3 vSunV;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vSun = position;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vSunV = mvPosition.xyz;
vSunN = normalize(normalMatrix * normal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nuniform float uTime;\nvarying vec3 vSun;\nvarying vec3 vSunN;\nvarying vec3 vSunV;\n${Ke}`).replace(`#include <map_fragment>`,`#include <map_fragment>
        vec3 flow = vec3(snoise(vSun * 3.0 + vec3(0.0, 0.0, uTime * 0.012)), snoise(vSun * 3.0 + vec3(31.4, 0.0, -uTime * 0.01)), snoise(vSun * 3.0 + vec3(0.0, 57.2, uTime * 0.008)));
        float cells = fbm(vSun * 34.0 + flow * 1.6 + uTime * 0.05);
        float currents = fbm(vSun * 6.0 + flow * 0.6 - uTime * 0.015);
        float mu = clamp(dot(normalize(vSunN), normalize(-vSunV)), 0.0, 1.0);
        diffuseColor.rgb *= (0.8 + 0.3 * cells + 0.14 * currents) * (0.4 + 0.6 * pow(mu, 0.5));
        diffuseColor.rgb = mix(diffuseColor.rgb * vec3(1.0, 0.62, 0.32), diffuseColor.rgb, smoothstep(0.0, 0.55, mu));`)};let P=1.12,$e=new we({uniforms:{uTime:Ze},transparent:!0,depthWrite:!1,side:1,blending:2,vertexShader:`#include <common>
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
      ${Ke}
      void main() {
        #include <logdepthbuf_fragment>
        // 1 just outside the Sun's edge, 0 at the shell's own edge
        float mu = abs(dot(normalize(vN), normalize(-vV)));
        float h = clamp(mu / sqrt(1.0 - 1.0 / (${P} * ${P})), 0.0, 1.0);
        float n = fbm(vPos * 3.0 + vec3(0.0, uTime * 0.04, uTime * 0.025));
        float tongues = smoothstep(-0.1, 0.8, n);
        float a = pow(h, 3.0 - 1.6 * tongues) * (0.25 + 0.85 * tongues);
        gl_FragColor = vec4(mix(vec3(1.0, 0.32, 0.08), vec3(1.0, 0.75, 0.35), a) * a, a);
      }`}),et=new y(S,$e);et.scale.setScalar(P),T.Sun.add(et),C.push($e);let tt=qe(),F=new ne({map:tt,blending:2,depthWrite:!1,transparent:!0}),nt=new _e(F);g.add(nt),C.push(tt,F);let rt=[],it=(e,t,n,r)=>{let i=new ve().setFromPoints(e.map(j)),a=new se({color:t,transparent:!0,opacity:.5,depthWrite:!1}),o=new oe(i,a);n.add(o),rt.push({line:o,m:a,moon:r}),C.push(i,a)};for(let e of p)e!==`Sun`&&e!==`Moon`&&it(c(e,o),v[e].colour,g);{let e=Array.from({length:180},(e,t)=>{let n=s(o+t/180*2360594880);return[n.Moon[0]-n.Earth[0],n.Moon[1]-n.Earth[1],n.Moon[2]-n.Earth[2]]}),t=new Ce;t.position.copy(j(l.Earth)),g.add(t),it([...e,e[0]],v.Moon.colour,t,!0)}let I=new be({color:9079434,side:1,depthWrite:!1}),L=new y(S,I);{let[e,t,n]=_;L.matrixAutoUpdate=!1,L.matrix.makeBasis(j(e),j(n).negate(),j(t)).scale(new b(1e5,1e5,1e5)),L.renderOrder=-1,L.visible=!1}m.add(L),C.push(I);let at=setTimeout(()=>w(`4k_stars_milky_way.jpg`,e=>{I.map=e,I.needsUpdate=!0,L.visible=!0}),400),R=1,z=1,B=null,V=`camera`,H=Ue,ot=()=>Ie(33,35,.92*Math.min(1,R/z)),U={target:[0,0,0],dist:100,yaw:-90,pitch:35},W={...U},G=null,st=new b(0,0,1),K=0,q=0,J=35,Y=35,X={x:.5,y:.5},Z={x:.5,y:.5},ct=0,lt=0,ut=!1,dt=(e,t)=>{let[n,r,i,a]=[Math.cos(e.yaw*A),Math.sin(e.yaw*A),Math.cos(e.pitch*A),Math.sin(e.pitch*A)];return[0,1,2].map(e=>i*n*t[0][e]+i*r*t[1][e]+a*t[2][e])},ft=(e,t)=>{let n=n=>e[0]*t[n][0]+e[1]*t[n][1]+e[2]*t[n][2];return{yaw:Math.atan2(n(1),n(0))/A,pitch:Math.asin(Math.max(-1,Math.min(1,n(2))))/A}},pt=()=>{let e=V===`globe`&&B?f[B]:Ue;if(e===H)return;let t=dt(U,H),n=dt(W,H);H=e,U={...U,...ft(t,H)},W={...W,...ft(n,H)},G&&=null},mt=()=>Ie(k(B??`Sun`),35,.9),ht=e=>Math.max(-85,Math.min(85,e)),gt=e=>{let t=e.clone().applyMatrix4(h.matrixWorldInverse),n=e.clone().project(h);return{x:(n.x+1)/2*R,y:(1-n.y)/2*z,front:t.z<0}},_t=e=>{if(lt=0,ut)return;let r=ct?Math.min(100,e-ct):16;ct=e;let i=!1,s=e=>1-Math.exp(-r/e);if(G){let t=Math.min(1,(e-G.start)/G.ms);U=G.run(t),t>=1&&(G=null,W={...U}),i=!0}else{let e=s(70),t=(W.yaw-U.yaw)%360;t>180&&(t-=360),t<-180&&(t+=360);let n=Math.log(W.dist/U.dist),r=W.pitch-U.pitch;Math.abs(t)>.01||Math.abs(r)>.01||Math.abs(n)>5e-4?(U={target:W.target,yaw:U.yaw+t*e,pitch:U.pitch+r*e,dist:U.dist*Math.exp(n*e)},i=!0):U={...W}}Math.abs(q-K)>.002?(K+=(q-K)*s(180),i=!0):K=q,Math.abs(Math.log(Y/J))>.002?(J*=Math.exp(Math.log(Y/J)*s(160)),i=!0):J=Y;let c=j(H[2]);st.distanceTo(c)>.001?(st.lerp(c,s(180)).normalize(),i=!0):st.copy(c);for(let e of[`x`,`y`])Math.abs(Z[e]-X[e])>5e-4?(X[e]+=(Z[e]-X[e])*s(150),i=!0):X[e]=Z[e];g.position.copy(j(U.target)).negate();let d=dt(U,H),f=We(U.dist,B?k(B):0,J);h.position.set(d[0]*f,d[1]*f,d[2]*f),h.up.copy(st),h.lookAt(0,0,0),h.fov=J,h.near=f*1e-4,h.far=1e7,h.aspect=R/z,h.setViewOffset(R,z,R/2-X.x*R,z/2-X.y*z,R,z),h.updateMatrixWorld(),g.updateMatrixWorld(),L.matrix.setPosition(h.position),te.intensity=Be*(1-K),x.intensity=Ve*K,Ee.intensity=He+.9*K,x.position.copy(new b(-.6,.5,1).applyQuaternion(h.quaternion).multiplyScalar(f).add(h.position)),je.uSunDir.value.copy(Ae).transformDirection(h.matrixWorldInverse),je.uNight.value=1-K,O.uTime.value=e/1e3,a||(Ze.value=e/1e3,N.rotation.y=e/1e3*.003),O.uPower.value=(.75+Xe*.18)*(1-K),O.uRadius.value=.36+Xe*.025;let ee=Math.tan(J/2*A);I.color.setScalar(.54*Ge(8,30,J));let _=p.map(e=>{let t=j(l[e]).add(g.position),n=t.distanceTo(h.position),r=z/2*Math.tan(Math.asin(Math.min(1,k(e)/n)))/ee;(r>4||e===B)&&ke(e);let i=gt(t);return{id:e,x:i.x,y:i.y,px:r,visible:i.front&&i.x>-R*.1&&i.x<R*1.1&&i.y>-z*.1&&i.y<z*1.1}});{let e=_[0].px,t=j(l.Sun).add(g.position).distanceTo(h.position),n=Math.max(e*1.6,26);nt.scale.setScalar(n*2*(2*t*ee/z))}let v=Ge(.004,.05,U.dist);for(let e of rt)e.m.opacity=e.moon?.45*Ge(6e-4,.002,U.dist)*(1-Ge(.03,.12,U.dist)):.45*v;for(let e of rt)e.line.visible=e.m.opacity>.01;!a&&_[p.indexOf(`Earth`)].px>30&&K<.98&&(i=!0),!a&&_[0].px>24&&_[0].visible&&(i=!0),n.render(m,h),t.onFrame({bodies:_,flying:!!G,project(e,t){if(!B)return null;let n=u(B,o,e,t),r=k(B),i=j(l[B]).add(g.position),a=j(n).multiplyScalar(r).add(i),s=gt(a);return{x:s.x,y:s.y,front:j(n).dot(h.position.clone().sub(a))>0}}}),i&&Q()},Q=()=>{!lt&&!ut&&(lt=requestAnimationFrame(_t))},$=new Map,vt=()=>{G&&(G=null,W={...U})},yt=e=>{vt(),W={...W,dist:Math.max(mt(),Math.min(Re,W.dist*e))},Q()},bt=e=>{r.setPointerCapture(e.pointerId),$.set(e.pointerId,{x:e.clientX,y:e.clientY})},xt=e=>{let t=$.get(e.pointerId);if(!t)return;let n={x:e.clientX,y:e.clientY};if($.size===1){vt();let e=z/2*k(B??`Sun`)/U.dist/Math.tan(35/2*A),r=Math.max(.03,Math.min(.35,57/Math.max(1,e)));W={...W,yaw:W.yaw-(n.x-t.x)*r,pitch:ht(W.pitch+(n.y-t.y)*r)},Q()}else if($.size===2){let[t,r]=[...$.entries()].map(([t,r])=>t===e.pointerId?n:r),[i,a]=[...$.values()],o=Math.hypot(i.x-a.x,i.y-a.y),s=Math.hypot(t.x-r.x,t.y-r.y);o>0&&s>0&&yt(o/s)}$.set(e.pointerId,n)},St=e=>$.delete(e.pointerId),Ct=e=>{e.preventDefault(),yt(Math.exp(e.deltaY*(e.deltaMode===1?16:1)*.0015))};r.addEventListener(`pointerdown`,bt),r.addEventListener(`pointermove`,xt),r.addEventListener(`pointerup`,St),r.addEventListener(`pointercancel`,St),r.addEventListener(`wheel`,Ct,{passive:!1});let wt=new ResizeObserver(()=>{R=Math.max(1,e.clientWidth),z=Math.max(1,e.clientHeight),n.setSize(R,z),Q()});wt.observe(e),R=Math.max(1,e.clientWidth),z=Math.max(1,e.clientHeight),n.setSize(R,z),Q();let Tt=e=>{G=null,U=e,W={...e},Q()};return{focus(e,t={}){let n=e!==B;B=e,pt();let i=e?l[e]:[0,0,0],o=e?Ie(k(e),35,t.fill??1/3):ot(),{yaw:s,pitch:c}=W;(n||t.night)&&V===`camera`&&(e?e===`Sun`?c=15:t.night?(s=(Math.atan2(i[1],i[0])/A+20)%360,c=50):(s=(Math.atan2(i[1],i[0])/A+115)%360,c=12):c=Math.max(c,30));let u={target:i,dist:o,yaw:s,pitch:c};if(t.instant||!n&&!t.night&&!G&&Math.abs(Math.log(o/U.dist))<.01)return Tt(u);if(a){r.style.opacity=`0`,setTimeout(()=>{Tt(u),r.style.opacity=`1`},150);return}let d={...U},f=Math.max(Math.hypot(...i.map((e,t)=>e-d.target[t])),o,d.dist)/Math.min(o,d.dist);G={run:Fe(d,u),start:performance.now(),ms:Math.min(1800,1e3+70*Math.log(f))},Q()},setLight(e){q=+(e===`reading`),a&&(K=q),Q()},setSpin(e){V=e,pt(),Q()},setCentre(e,t){Z.x=e,Z.y=t,(a||!ct)&&Object.assign(X,Z),Q()},turnTo(e,t){V===`globe`&&(vt(),W={...W,yaw:t,pitch:ht(e)},Q())},setAurora(e){Xe=Math.max(0,Math.min(9,e)),Q()},setAuroraMap(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=Math.round(Math.max(0,Math.min(100,e[n]))*2.55);let n=new ge(t,360,181,he,ie);n.magFilter=n.minFilter=ae,n.wrapS=ue,n.needsUpdate=!0,O.uMap.value?.dispose(),O.uMap.value=n,O.uLive.value=1,C.push(n),Q()},setLens(e){Y=e===`long`?Le:35,a&&(J=Y),Q()},viewFrom(e,t,n,r,i,a){B=e,V=`globe`,H=f[e],st.copy(j(H[2])),K=q=1,J=Y=Le,X.x=Z.x=i,X.y=Z.y=a,Tt({target:l[e],dist:Ie(k(e),35,r/(z/2)),yaw:n,pitch:t})},centreOf(e){let t=j(l[e]).add(g.position),n=h.position.clone().sub(t);return ee(e,o,[n.x,n.y,n.z])},dispose(){ut=!0,cancelAnimationFrame(lt),clearTimeout(at),wt.disconnect(),r.removeEventListener(`wheel`,Ct);for(let e of C)e.dispose();n.dispose(),r.remove()}}}var M=e=>{let t=(e%360+540)%360-180;return t===-180?180:Math.round(t*1e6)/1e6},N=(e,t,n,r)=>({lang:`en`,key:e.replace(/ /g,`_`),title:e,lat:t,lon:M(n),kind:r}),Xe={Moon:[N(`Apollo 11`,.67416,23.47314,`landing`),N(`Apollo 12`,-3.01239,-23.42157,`landing`),N(`Apollo 14`,-3.6453,-17.47136,`landing`),N(`Apollo 15`,26.1322,3.6339,`landing`),N(`Apollo 16`,-8.97301,15.50019,`landing`),N(`Apollo 17`,20.1908,30.7717,`landing`),N(`Chang’e 4`,-45.444,177.599,`landing`),N(`Tycho (lunar crater)`,-43.31,-11.36,`crater`),N(`Copernicus (lunar crater)`,9.62,-20.08,`crater`)],Mars:[N(`Viking 1`,22.27,312.05,`landing`),N(`Viking 2`,47.64,-225.71,`landing`),N(`Mars Pathfinder`,19.13,-33.22,`landing`),N(`Spirit (rover)`,-14.5684,175.4726,`landing`),N(`Opportunity (rover)`,-1.9462,354.4734,`landing`),N(`Curiosity (rover)`,-4.5895,137.4417,`landing`),N(`InSight`,4.5024,135.6234,`landing`),N(`Perseverance (rover)`,18.4446,77.4509,`landing`),N(`Zhurong (rover)`,25.102,109.914,`landing`)]},Ze={Moon:[`Category:Maria on the Moon`,`Category:Impact craters on the Moon`],Mars:[`Category:Mountains on Mars`,`Category:Valleys and canyons on Mars`,`Category:Impact craters on Mars`]};function Qe(e,t){return/Maria|Mare |Oceanus|Lacus|Sinus|Palus/.test(e+` `+t)?`sea`:/Mountains|Mons|Montes/.test(e)?`mountain`:/Valleys|canyons/.test(e)?`valley`:`crater`}var P=e=>e.replace(/ \([^)]*\)$/,``),$e={Moon:8e3,Mars:4e3};async function et(e,t){let n=[],r={};for(let i=0;i<6;i++){let i=new URLSearchParams({action:`query`,format:`json`,formatversion:`2`,origin:`*`,generator:`categorymembers`,gcmtitle:t,gcmtype:`page`,gcmlimit:`max`,prop:`coordinates|info`,coprop:`globe`,colimit:`max`,...r}),a=await fetch(`https://en.wikipedia.org/w/api.php?${i}`).then(e=>e.json());for(let r of a.query?.pages??[]){let i=r.coordinates?.find(t=>t.globe?.toLowerCase()===e.toLowerCase()),a=Qe(t,r.title);i&&(a!==`crater`||(r.length??0)>=$e[e])&&n.push(N(r.title,i.lat,i.lon,a))}if(!a.continue)break;r=a.continue}return n}async function tt(e){let t=[];for(let n of Ze[e])t.push(...await et(e,n).catch(()=>[]));let n=new Set;return[...Xe[e],...t].filter(e=>!n.has(e.title)&&n.add(e.title))}var F=je(),nt={landing:0,sea:1,mountain:2,valley:3,crater:4},rt=40,it={landing:r(`Landing sites`),sea:r(`Seas`),mountain:r(`Mountains`),valley:r(`Valleys`),crater:r(`Craters`)};function I(t,n){return e(t===`landing`?`Landing site`:t===`sea`?n===`Moon`?`A “sea” of old lava`:`A plain`:t===`mountain`?`A mountain`:t===`valley`?`A valley or canyon`:`A crater`)}function L({world:t,frames:n,space:r}){let{data:i,error:o}=S(()=>tt(t).then(e=>l(e))),[s,c]=(0,D.useState)(null),u=(0,D.useMemo)(()=>new Map((i??[]).map(e=>[P(e.title),e])),[i]),d=(e,t=!1)=>{Ee(`pop`),c(e),e&&t&&r?.turnTo(e.lat,e.lon)};return(0,F.jsxs)(F.Fragment,{children:[i&&(0,F.jsx)(at,{frames:n,world:t,places:i,picked:s,onPick:e=>d(e)}),(0,F.jsxs)(`div`,{className:`explore-bar`,children:[(0,F.jsxs)(`a`,{className:`btn quiet`,href:a(t),children:[(0,F.jsx)(De,{name:`left`,size:18}),` `,T(t)]}),(0,F.jsxs)(`label`,{className:`explore-find`,children:[(0,F.jsx)(De,{name:`search`,size:18}),(0,F.jsx)(`input`,{className:`input`,list:`explore-places`,placeholder:e(i?`Find a place`:`Finding places…`),"aria-label":e(t===`Moon`?`Find a place on the Moon`:`Find a place on Mars`),disabled:!i,onChange:e=>{let t=u.get(e.target.value);t&&d(t,!0)}})]}),(0,F.jsx)(`datalist`,{id:`explore-places`,children:[...u.keys()].sort().map(e=>(0,F.jsx)(`option`,{value:e},e))}),o?(0,F.jsx)(`p`,{className:`explore-note`,children:e(`The places didn’t load. Check the connection.`)}):null]}),(0,F.jsx)(`ul`,{className:`explore-key`,"aria-label":e(`What the pins mean`),children:[`landing`,`sea`,`mountain`,`valley`,`crater`].filter(e=>i?.some(t=>t.kind===e)).map(t=>(0,F.jsxs)(`li`,{"data-kind":t,children:[(0,F.jsx)(`i`,{"aria-hidden":`true`}),e(it[t])]},t))}),s&&(0,F.jsx)(R,{place:s,world:t,onClose:()=>c(null)},s.title)]})}function at({frames:e,world:t,places:n,picked:r,onPick:i}){let a=(0,D.useSyncExternalStore)(e.sub,e.get);if(!a||a.flying)return null;let o=a.bodies.find(e=>e.id===t);if(!o)return null;let s=n.map(e=>({p:e,s:a.project(e.lat,e.lon)})).filter(({s:e})=>e&&e.front&&Math.hypot(e.x-o.x,e.y-o.y)<o.px*.93).map(({p:e,s:t})=>({p:e,x:t.x,y:t.y,d:Math.hypot(t.x-o.x,t.y-o.y)})).sort((e,t)=>nt[e.p.kind]-nt[t.p.kind]||e.d-t.d),c=[],l=[],u=0;return(0,F.jsx)(`div`,{className:`place-pins`,children:s.map(({p:e,x:t,y:n})=>{if(e.kind!==`landing`&&c.some(e=>Math.hypot(e.x-t,e.y-n)<26)||e.kind===`crater`&&++u>rt)return null;c.push({x:t,y:n});let a=P(e.title),o={x0:t-6,x1:t+14+a.length*7.2,y:n},s=l.some(e=>Math.abs(e.y-n)<18&&e.x0<o.x1&&o.x0<e.x1);return s||l.push(o),(0,F.jsxs)(`button`,{className:`place-pin`,"data-kind":e.kind,"data-crowded":s||void 0,"aria-pressed":r?.title===e.title,style:{transform:`translate(${t}px, ${n}px)`},onClick:()=>i(e),children:[(0,F.jsx)(`i`,{"aria-hidden":`true`}),(0,F.jsx)(`span`,{children:a})]},e.title)})})}function R({place:t,world:n,onClose:r}){let{data:i,error:a}=S(()=>ke(t.title)),o=h([t.title]);return(0,F.jsxs)(`section`,{className:`place-card`,"aria-live":`polite`,children:[(0,F.jsxs)(`header`,{children:[(0,F.jsx)(`p`,{className:`story-kind`,children:I(t.kind,n)}),(0,F.jsx)(`h2`,{children:P(t.title)}),(0,F.jsx)(`button`,{className:`icon-btn`,onClick:r,"aria-label":e(`Close`),children:(0,F.jsx)(De,{name:`x`})})]}),i?.extract?(0,F.jsx)(`p`,{lang:i.lang,children:Oe(i.extract,3,i.lang)}):a?null:(0,F.jsx)(C,{lines:3}),(0,F.jsx)(`a`,{className:`btn primary`,href:o(t.title),children:e(`Read about it`)})]})}function z(e,t,n,r){if(!e)return{fx:.5,fy:.5,fill:0};let i=v[e].ring?1.9:1;if(t)return n>=900?{fx:(n-400)/2/n,fy:.52,fill:Math.min(.42*r,.4*(n-400))/(r/2)}:{fx:.5,fy:.42,fill:Math.min(.3*r,.44*n)/(r/2)};if(n>=900){let e=n-Math.min(448,.4*n)-48,t=Math.min(e*.3,r*.3)/i;return{fx:e/2/n,fy:.5,fill:t/(r/2)}}return{fx:.5,fy:.26,fill:Math.min(n*.3,r*.17)/i/(r/2)}}function B({body:t,explore:r=!1}){let o=(0,D.useRef)(null),s=(0,D.useRef)(null),c=(0,D.useMemo)(O,[]),[l,u]=(0,D.useState)(!1),[d,ee]=(0,D.useState)(null),h=(0,D.useSyncExternalStore)(c.sub,()=>c.get()?.flying??!0),[_,v]=(0,D.useState)(0),[ne,re]=(0,D.useState)(0),ie=_>=5||ne>=50;(0,D.useEffect)(()=>{let e=o.current,t=Ye(e,{onFrame:c.set});t||u(!0),s.current=t,m().then(e=>{t?.setAurora(e.kp),v(e.kp)},()=>{});let n=new ResizeObserver(()=>ee([e.clientWidth,e.clientHeight]));return n.observe(e),()=>{n.disconnect(),t?.dispose(),s.current=null}},[c]),(0,D.useEffect)(()=>{t===`Earth`&&f().then(e=>{s.current?.setAuroraMap(e.grid),re(e.max)},()=>{})},[t]);let ae=(0,D.useRef)(!1);(0,D.useEffect)(()=>{if(t!==`Earth`||r){ae.current=!1;return}if(!ie||!d||ae.current)return;ae.current=!0;let e=setTimeout(()=>{s.current?.focus(`Earth`,{fill:z(`Earth`,!1,...d).fill,night:!0}),g(`aurora`)},1600);return()=>clearTimeout(e)},[ie,t,r,d]);let y=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=s.current;if(!e||!d)return;let n=`${t}/${r}`,i=y.current!==null&&y.current!==n,{fx:a,fy:c,fill:l}=z(t,r,...d),u=y.current===null&&t===`Earth`&&!r?Me():null;if(u){let t=o.current.getBoundingClientRect();e.viewFrom(`Earth`,u.lat,u.lon,u.radiusPx,(u.cx-t.left)/d[0],(u.cy-t.top)/d[1])}e.setLens(`wide`),e.setSpin(r?`globe`:`camera`),e.setLight(r?`reading`:`sun`),e.setCentre(a,c),e.focus(t??null,{instant:!i&&!u,fill:l}),y.current=n},[t,r,d]);let[b,oe]=(0,D.useState)(!1);return(0,F.jsxs)(`div`,{className:`space`,"data-body":t?!0:void 0,"data-explore":r||void 0,children:[(0,F.jsx)(`div`,{className:`space-stage`,ref:o,role:`img`,"aria-label":e(`The solar system in 3D, as it is right now. Drag to turn, pinch or scroll to zoom.`),children:l&&(0,F.jsx)(`div`,{className:`space-none`,children:(0,F.jsx)(w,{title:e(`Space needs 3D graphics`),children:e(`This browser can’t draw 3D scenes, or they are switched off. The articles about the planets are still a search away.`)})})}),!r&&!b&&(0,F.jsx)(V,{frames:c,focus:t}),(0,F.jsxs)(`nav`,{className:`space-list`,"aria-label":e(`Worlds`),hidden:r||b,children:[(0,F.jsx)(`a`,{href:a(),"aria-current":!t||void 0,children:e(`Whole solar system`)}),p.map(n=>(0,F.jsxs)(`a`,{href:a(n),"aria-current":n===t&&!r||void 0,children:[T(n),n===`Earth`&&ie&&(0,F.jsx)(`span`,{className:`aurora-badge`,children:(0,F.jsx)(`span`,{className:`vh`,children:e(`The northern lights are out right now`)})})]},n))]}),r&&(t===`Moon`||t===`Mars`)&&(0,F.jsx)(L,{world:t,frames:c,space:s.current},t),t&&!r&&(0,F.jsx)(`div`,{className:`space-story`,"data-shown":!h&&!b||void 0,children:(0,F.jsx)(Ae,{id:t,onAtlas:()=>{let e=s.current,t=o.current,r=t?.closest(`main`);if(!e||!t||!r||!d)return te(`#/atlas`);n(()=>import(`./Atlas-BaDVo8UJ.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url);let a=E(r),c=t.getBoundingClientRect();oe(!0),e.setSpin(`globe`),e.setLight(`reading`),e.setLens(`long`),e.setCentre((a.cx-c.left)/d[0],(a.cy-c.top)/d[1]),e.focus(`Earth`,{fill:a.radiusPx/(d[1]/2)}),setTimeout(()=>{let{lat:t,lon:n}=e.centreOf(`Earth`);te(i(t,n))},1250)}})},t)]})}function V({frames:e,focus:t}){let n=(0,D.useSyncExternalStore)(e.sub,e.get);if(!n)return null;let r=[];return(0,F.jsx)(`div`,{className:`space-marks`,"aria-hidden":`true`,children:n.bodies.map(e=>{if(!e.visible||e.id===t||e.px>40)return null;let n=e.px>5,i=n?e.y+e.px+6:e.y,o=r.some(t=>Math.abs(t.x-e.x)<56&&Math.abs(t.y-i)<20);return o||r.push({x:e.x,y:i}),(0,F.jsxs)(`a`,{className:`space-mark`,href:a(e.id),tabIndex:-1,"data-big":n||void 0,"data-crowded":o||void 0,style:{transform:`translate(${e.x}px, ${i}px)`,"--c":v[e.id].colour},children:[(0,F.jsx)(`i`,{}),(0,F.jsx)(`span`,{children:T(e.id)})]},e.id)})})}export{B as default};