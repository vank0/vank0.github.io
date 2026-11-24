const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Atlas-D60mD-Bm.js","./jsx-runtime-DUsEEzsM.js","./rolldown-runtime-4tVxZq34.js","./Globe-fHRzHKAP.js","./sky-B3Rgzh1f.js","./index-Xugyghkp.js","./react-dom-BDyeOywj.js","./store-BsaxPCw3.js","./ui-DZomnimx.js","./sound-BLRQsRhh.js","./index-DKH_h9LK.css","./handover-ziA8KDk1.js","./where-w8zGBUIw.js"])))=>i.map(i=>d[i]);
import{f as e,g as t,h as n,i as r,t as i}from"./jsx-runtime-DUsEEzsM.js";import{F as a,h as o,i as s,l as c,o as l,y as u}from"./ui-DZomnimx.js";import{d,f,g as p,h as ee,i as m,it as te,m as h,nt as g,p as ne,rt as _,t as v,u as re,vt as y}from"./index-Xugyghkp.js";import{B as ie,Ct as b,E as ae,H as oe,Q as se,T as ce,X as le,_t as ue,c as de,ct as fe,h as pe,lt as me,mt as he,n as ge,p as _e,s as ve,st as ye,t as be,ut as xe,vt as Se,xt as Ce,z as x}from"./three.module-BLDnuzIS.js";import{r as S}from"./sound-BLRQsRhh.js";import{i as C,n as w,r as we,t as Te}from"./Story-D3SPaepM.js";import{n as T,t as Ee}from"./handover-ziA8KDk1.js";var E=t(),De=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Oe=(e,t,n)=>e+(t-e)*n;function ke(e,t){let n=Math.hypot(t.target[0]-e.target[0],t.target[1]-e.target[1],t.target[2]-e.target[2]),r=Math.log(e.dist),i=Math.log(t.dist),a=Math.max(0,Math.log(n*1.4)-Math.max(r,i)),o=(t.yaw-e.yaw)%360;return o>180&&(o-=360),o<-180&&(o+=360),n=>{if(n<=0)return e;if(n>=1)return t;let s=De(n),c=a>0?De(Math.min(1,Math.max(0,(n-.15)/.7))):s;return{target:[0,1,2].map(n=>Oe(e.target[n],t.target[n],c)),dist:Math.exp(Oe(r,i,s)+a*Math.sin(Math.PI*n)),yaw:e.yaw+o*s,pitch:Oe(e.pitch,t.pitch,s)}}}var Ae=(e,t,n)=>e/Math.sin(Math.atan(Math.tan(t/2*Math.PI/180)*n)),je=6,Me=160,Ne=`./textures/`,Pe=3.2,Fe=2.6,Ie=.15;function Le(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let e of t)e()},sub(e){return t.add(e),()=>void t.delete(e)}}}var D=e=>g[e].km/re,O=Math.PI/180,k=e=>new b(e[0],e[1],e[2]),Re=[[1,0,0],[0,1,0],[0,0,1]],ze=(e,t,n)=>{let[r,i]=[Math.tan(35/2*O),Math.tan(n/2*O)],a=Math.min(.999,t/e);return a<1e-6?e*r/i:t/Math.sin(Math.atan(Math.tan(Math.asin(a))/r*i))},Be=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ve=`
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
}`;function He(){let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,`rgba(255,236,190,1)`),n.addColorStop(.25,`rgba(255,200,110,0.55)`),n.addColorStop(1,`rgba(255,170,60,0)`),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new de(e);return r.colorSpace=fe,r}function Ue(){try{return!!document.createElement(`canvas`).getContext(`webgl2`)}catch{return!1}}function We(e,t){if(!Ue())return null;let n;try{n=new be({antialias:!0,logarithmicDepthBuffer:!0})}catch{return null}n.setPixelRatio(Math.min(devicePixelRatio,2)),n.setClearColor(131848,1);let r=n.domElement;r.style.touchAction=`none`,r.style.transition=`opacity .15s`,e.appendChild(r);let i=n.capabilities.getMaxAnisotropy(),a=matchMedia(`(prefers-reduced-motion: reduce)`).matches,o=Date.now(),s=h(o),c=Object.fromEntries(_.map(e=>[e,f(e,o)])),l=new me,u=new le(35,1,1e-6,1e7),m=new pe;l.add(m);let te=new se(16777215,Pe,0,0);m.add(te);let v=new _e(16777215,0);l.add(v,v.target);let re=new ge(16777215,Ie);l.add(re);let y=new he(1,96,64),de=new Ce,S=[y],C=(e,t)=>{de.load(Ne+e,e=>{e.colorSpace=fe,e.anisotropy=i,S.push(e),t(e),Q()})},w={},we=new Set;for(let e of _){let t=g[e],n=e===`Sun`?new ie({color:t.colour}):new oe({color:t.colour,roughness:1,metalness:0});S.push(n);let r=new x(y,n),[i,a,o]=c[e],l=D(e);if(r.matrixAutoUpdate=!1,r.matrix.makeBasis(k(i),k(o),k(a).negate()).scale(new b(l,l,l)).setPosition(k(s[e])),m.add(r),w[e]=r,t.ring){let{inner:e,outer:n,map:i}=t.ring,a=new ye(e,n,160,1),o=a.attributes.uv,s=a.attributes.position;for(let t=0;t<s.count;t++)o.setXY(t,(Math.hypot(s.getX(t),s.getY(t))-e)/(n-e),.5);a.rotateX(-Math.PI/2);let c=new oe({color:16777215,side:2,transparent:!0,opacity:0,depthWrite:!1,roughness:1});S.push(a,c),r.add(new x(a,c)),C(i,e=>{c.map=e,c.opacity=1,c.needsUpdate=!0})}}let Te=e=>{let t=e===`Earth`?`earth-day-2k.jpg`:g[e].map;!we.has(e)&&t&&(we.add(e),e===`Earth`&&(C(`earth-clouds.jpg`,e=>{M.alphaMap=e,M.opacity=.92,M.needsUpdate=!0}),C(`earth-night-2k.jpg`,e=>{E.emissiveMap=e,E.emissive.set(16771524),E.emissiveIntensity=1.5,E.needsUpdate=!0})),C(t,t=>{let n=w[e].material;n.map=t,n.color.set(16777215),n.needsUpdate=!0}))},T=k(s.Sun).sub(k(s.Earth)).normalize(),Ee={uSunDir:{value:new b(1,0,0)},uNight:{value:1}},E=w.Earth.material;E.onBeforeCompile=e=>{Object.assign(e.uniforms,Ee),e.fragmentShader=`uniform vec3 uSunDir;\nuniform float uNight;\n${e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
  totalEmissiveRadiance *= uNight * smoothstep(0.08, -0.2, dot(normalize(vNormal), uSunDir));`)}`};let De=(e,t)=>new b(Math.cos(e*O)*Math.cos(t*O),Math.sin(e*O),-Math.cos(e*O)*Math.sin(t*O)),[Oe,Le,We]=c.Earth.map(k),A={uTime:{value:0},uPower:{value:.7},uRadius:{value:.4},uSun:{value:new b(T.dot(Oe),T.dot(We),-T.dot(Le))},uNorth:{value:De(80.7,-72.7)},uSouth:{value:De(-80.7,107.3)}},j=(e,t)=>{let n=new xe({uniforms:A,transparent:!0,depthWrite:!1,blending:2,vertexShader:`#include <common>
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
        uniform float uTime, uPower, uRadius;
        uniform vec3 uSun, uNorth, uSouth;
        varying vec3 vPos;
        varying vec3 vN;
        varying vec3 vV;
        ${Ve}
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
        void main() {
          #include <logdepthbuf_fragment>
          vec3 p = normalize(vPos);
          float dark = smoothstep(0.12, -0.18, dot(p, uSun));
          float limb = clamp(0.35 / (abs(dot(normalize(vN), normalize(-vV))) + 0.25), 1.0, 3.0);
          float glow = (oval(p, uNorth, 0.0) + oval(p, uSouth, 11.0)) * dark * limb * uPower;
          ${t?`glow *= 0.32;
          gl_FragColor = vec4(vec3(1.0, 0.16, 0.2) * glow, glow);`:`vec3 colour = mix(vec3(0.2, 1.0, 0.45), vec3(0.75, 1.0, 0.8), smoothstep(0.8, 1.6, glow));
          gl_FragColor = vec4(colour * glow, glow);`}
        }`}),r=new x(y,n);r.scale.setScalar(e),w.Earth.add(r),S.push(n)};j(1.017,!1),j(1.039,!0);let M=new oe({color:16777215,transparent:!0,opacity:0,depthWrite:!1,roughness:1,metalness:0});M.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying float vUp;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vUp = position.y;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vUp;`).replace(`#include <alphamap_fragment>`,`#include <alphamap_fragment>
  diffuseColor.a *= smoothstep(0.985, 0.9, abs(vUp));`)};let Ge=new x(y,M);Ge.scale.setScalar(1.006),w.Earth.add(Ge),S.push(M);let Ke=2,N={value:0},qe=w.Sun.material;qe.onBeforeCompile=e=>{e.uniforms.uTime=N,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vSun;
varying vec3 vSunN;
varying vec3 vSunV;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vSun = position;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vSunV = mvPosition.xyz;
vSunN = normalize(normalMatrix * normal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nuniform float uTime;\nvarying vec3 vSun;\nvarying vec3 vSunN;\nvarying vec3 vSunV;\n${Ve}`).replace(`#include <map_fragment>`,`#include <map_fragment>
        vec3 flow = vec3(snoise(vSun * 3.0 + vec3(0.0, 0.0, uTime * 0.012)), snoise(vSun * 3.0 + vec3(31.4, 0.0, -uTime * 0.01)), snoise(vSun * 3.0 + vec3(0.0, 57.2, uTime * 0.008)));
        float cells = fbm(vSun * 34.0 + flow * 1.6 + uTime * 0.05);
        float currents = fbm(vSun * 6.0 + flow * 0.6 - uTime * 0.015);
        float mu = clamp(dot(normalize(vSunN), normalize(-vSunV)), 0.0, 1.0);
        diffuseColor.rgb *= (0.8 + 0.3 * cells + 0.14 * currents) * (0.4 + 0.6 * pow(mu, 0.5));
        diffuseColor.rgb = mix(diffuseColor.rgb * vec3(1.0, 0.62, 0.32), diffuseColor.rgb, smoothstep(0.0, 0.55, mu));`)};let Je=1.12,Ye=new xe({uniforms:{uTime:N},transparent:!0,depthWrite:!1,side:1,blending:2,vertexShader:`#include <common>
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
      ${Ve}
      void main() {
        #include <logdepthbuf_fragment>
        // 1 just outside the Sun's edge, 0 at the shell's own edge
        float mu = abs(dot(normalize(vN), normalize(-vV)));
        float h = clamp(mu / sqrt(1.0 - 1.0 / (${Je} * ${Je})), 0.0, 1.0);
        float n = fbm(vPos * 3.0 + vec3(0.0, uTime * 0.04, uTime * 0.025));
        float tongues = smoothstep(-0.1, 0.8, n);
        float a = pow(h, 3.0 - 1.6 * tongues) * (0.25 + 0.85 * tongues);
        gl_FragColor = vec4(mix(vec3(1.0, 0.32, 0.08), vec3(1.0, 0.75, 0.35), a) * a, a);
      }`}),P=new x(y,Ye);P.scale.setScalar(Je),w.Sun.add(P),S.push(Ye);let Xe=He(),Ze=new Se({map:Xe,blending:2,depthWrite:!1,transparent:!0}),Qe=new ue(Ze);m.add(Qe),S.push(Xe,Ze);let $e=[],et=(e,t,n,r)=>{let i=new ve().setFromPoints(e.map(k)),a=new ae({color:t,transparent:!0,opacity:.5,depthWrite:!1}),o=new ce(i,a);n.add(o),$e.push({line:o,m:a,moon:r}),S.push(i,a)};for(let e of _)e!==`Sun`&&e!==`Moon`&&et(ne(e,o),g[e].colour,m);{let e=Array.from({length:180},(e,t)=>{let n=h(o+t/180*2360594880);return[n.Moon[0]-n.Earth[0],n.Moon[1]-n.Earth[1],n.Moon[2]-n.Earth[2]]}),t=new pe;t.position.copy(k(s.Earth)),m.add(t),et([...e,e[0]],g.Moon.colour,t,!0)}let F=new ie({color:9079434,side:1,depthWrite:!1}),I=new x(y,F);{let[e,t,n]=d;I.matrixAutoUpdate=!1,I.matrix.makeBasis(k(e),k(n).negate(),k(t)).scale(new b(1e5,1e5,1e5)),I.renderOrder=-1,I.visible=!1}l.add(I),S.push(F);let tt=setTimeout(()=>C(`4k_stars_milky_way.jpg`,e=>{F.map=e,F.needsUpdate=!0,I.visible=!0}),400),L=1,R=1,z=null,B=`camera`,V=Re,nt=()=>Ae(33,35,.92*Math.min(1,L/R)),H={target:[0,0,0],dist:100,yaw:-90,pitch:35},U={...H},W=null,G=new b(0,0,1),K=0,q=0,J=35,Y=35,X={x:.5,y:.5},Z={x:.5,y:.5},rt=0,it=0,at=!1,ot=(e,t)=>{let[n,r,i,a]=[Math.cos(e.yaw*O),Math.sin(e.yaw*O),Math.cos(e.pitch*O),Math.sin(e.pitch*O)];return[0,1,2].map(e=>i*n*t[0][e]+i*r*t[1][e]+a*t[2][e])},st=(e,t)=>{let n=n=>e[0]*t[n][0]+e[1]*t[n][1]+e[2]*t[n][2];return{yaw:Math.atan2(n(1),n(0))/O,pitch:Math.asin(Math.max(-1,Math.min(1,n(2))))/O}},ct=()=>{let e=B===`globe`&&z?c[z]:Re;if(e===V)return;let t=ot(H,V),n=ot(U,V);V=e,H={...H,...st(t,V)},U={...U,...st(n,V)},W&&=null},lt=()=>Ae(D(z??`Sun`),35,.9),ut=e=>Math.max(-85,Math.min(85,e)),dt=e=>{let t=e.clone().applyMatrix4(u.matrixWorldInverse),n=e.clone().project(u);return{x:(n.x+1)/2*L,y:(1-n.y)/2*R,front:t.z<0}},ft=e=>{if(it=0,at)return;let r=rt?Math.min(100,e-rt):16;rt=e;let i=!1,c=e=>1-Math.exp(-r/e);if(W){let t=Math.min(1,(e-W.start)/W.ms);H=W.run(t),t>=1&&(W=null,U={...H}),i=!0}else{let e=c(70),t=(U.yaw-H.yaw)%360;t>180&&(t-=360),t<-180&&(t+=360);let n=Math.log(U.dist/H.dist),r=U.pitch-H.pitch;Math.abs(t)>.01||Math.abs(r)>.01||Math.abs(n)>5e-4?(H={target:U.target,yaw:H.yaw+t*e,pitch:H.pitch+r*e,dist:H.dist*Math.exp(n*e)},i=!0):H={...U}}Math.abs(q-K)>.002?(K+=(q-K)*c(180),i=!0):K=q,Math.abs(Math.log(Y/J))>.002?(J*=Math.exp(Math.log(Y/J)*c(160)),i=!0):J=Y;let d=k(V[2]);G.distanceTo(d)>.001?(G.lerp(d,c(180)).normalize(),i=!0):G.copy(d);for(let e of[`x`,`y`])Math.abs(Z[e]-X[e])>5e-4?(X[e]+=(Z[e]-X[e])*c(150),i=!0):X[e]=Z[e];m.position.copy(k(H.target)).negate();let f=ot(H,V),p=ze(H.dist,z?D(z):0,J);u.position.set(f[0]*p,f[1]*p,f[2]*p),u.up.copy(G),u.lookAt(0,0,0),u.fov=J,u.near=p*1e-4,u.far=1e7,u.aspect=L/R,u.setViewOffset(L,R,L/2-X.x*L,R/2-X.y*R,L,R),u.updateMatrixWorld(),m.updateMatrixWorld(),I.matrix.setPosition(u.position),te.intensity=Pe*(1-K),v.intensity=Fe*K,re.intensity=Ie+.9*K,v.position.copy(new b(-.6,.5,1).applyQuaternion(u.quaternion).multiplyScalar(p).add(u.position)),Ee.uSunDir.value.copy(T).transformDirection(u.matrixWorldInverse),Ee.uNight.value=1-K,A.uTime.value=e/1e3,a||(N.value=e/1e3,Ge.rotation.y=e/1e3*.003),A.uPower.value=(.75+Ke*.18)*(1-K),A.uRadius.value=.36+Ke*.025;let h=Math.tan(J/2*O);F.color.setScalar(.54*Be(8,30,J));let g=_.map(e=>{let t=k(s[e]).add(m.position),n=t.distanceTo(u.position),r=R/2*Math.tan(Math.asin(Math.min(1,D(e)/n)))/h;(r>4||e===z)&&Te(e);let i=dt(t);return{id:e,x:i.x,y:i.y,px:r,visible:i.front&&i.x>-L*.1&&i.x<L*1.1&&i.y>-R*.1&&i.y<R*1.1}});{let e=g[0].px,t=k(s.Sun).add(m.position).distanceTo(u.position),n=Math.max(e*1.6,26);Qe.scale.setScalar(n*2*(2*t*h/R))}let ne=Be(.004,.05,H.dist);for(let e of $e)e.m.opacity=e.moon?.45*Be(6e-4,.002,H.dist)*(1-Be(.03,.12,H.dist)):.45*ne;for(let e of $e)e.line.visible=e.m.opacity>.01;!a&&g[_.indexOf(`Earth`)].px>30&&K<.98&&(i=!0),!a&&g[0].px>24&&g[0].visible&&(i=!0),n.render(l,u),t.onFrame({bodies:g,flying:!!W,project(e,t){if(!z)return null;let n=ee(z,o,e,t),r=D(z),i=k(s[z]).add(m.position),a=k(n).multiplyScalar(r).add(i),c=dt(a);return{x:c.x,y:c.y,front:k(n).dot(u.position.clone().sub(a))>0}}}),i&&Q()},Q=()=>{!it&&!at&&(it=requestAnimationFrame(ft))},$=new Map,pt=()=>{W&&(W=null,U={...H})},mt=e=>{pt(),U={...U,dist:Math.max(lt(),Math.min(Me,U.dist*e))},Q()},ht=e=>{r.setPointerCapture(e.pointerId),$.set(e.pointerId,{x:e.clientX,y:e.clientY})},gt=e=>{let t=$.get(e.pointerId);if(!t)return;let n={x:e.clientX,y:e.clientY};if($.size===1){pt();let e=R/2*D(z??`Sun`)/H.dist/Math.tan(35/2*O),r=Math.max(.03,Math.min(.35,57/Math.max(1,e)));U={...U,yaw:U.yaw-(n.x-t.x)*r,pitch:ut(U.pitch+(n.y-t.y)*r)},Q()}else if($.size===2){let[t,r]=[...$.entries()].map(([t,r])=>t===e.pointerId?n:r),[i,a]=[...$.values()],o=Math.hypot(i.x-a.x,i.y-a.y),s=Math.hypot(t.x-r.x,t.y-r.y);o>0&&s>0&&mt(o/s)}$.set(e.pointerId,n)},_t=e=>$.delete(e.pointerId),vt=e=>{e.preventDefault(),mt(Math.exp(e.deltaY*(e.deltaMode===1?16:1)*.0015))};r.addEventListener(`pointerdown`,ht),r.addEventListener(`pointermove`,gt),r.addEventListener(`pointerup`,_t),r.addEventListener(`pointercancel`,_t),r.addEventListener(`wheel`,vt,{passive:!1});let yt=new ResizeObserver(()=>{L=Math.max(1,e.clientWidth),R=Math.max(1,e.clientHeight),n.setSize(L,R),Q()});yt.observe(e),L=Math.max(1,e.clientWidth),R=Math.max(1,e.clientHeight),n.setSize(L,R),Q();let bt=e=>{W=null,H=e,U={...e},Q()};return{focus(e,t={}){let n=e!==z;z=e,ct();let i=e?s[e]:[0,0,0],o=e?Ae(D(e),35,t.fill??1/3):nt(),{yaw:c,pitch:l}=U;n&&B===`camera`&&(e?e===`Sun`?l=15:(c=(Math.atan2(i[1],i[0])/O+115)%360,l=12):l=Math.max(l,30));let u={target:i,dist:o,yaw:c,pitch:l};if(t.instant||!n&&!W&&Math.abs(Math.log(o/H.dist))<.01)return bt(u);if(a){r.style.opacity=`0`,setTimeout(()=>{bt(u),r.style.opacity=`1`},150);return}let d={...H},f=Math.max(Math.hypot(...i.map((e,t)=>e-d.target[t])),o,d.dist)/Math.min(o,d.dist);W={run:ke(d,u),start:performance.now(),ms:Math.min(1800,1e3+70*Math.log(f))},Q()},setLight(e){q=+(e===`reading`),a&&(K=q),Q()},setSpin(e){B=e,ct(),Q()},setCentre(e,t){Z.x=e,Z.y=t,(a||!rt)&&Object.assign(X,Z),Q()},turnTo(e,t){B===`globe`&&(pt(),U={...U,yaw:t,pitch:ut(e)},Q())},setAurora(e){Ke=Math.max(0,Math.min(9,e)),Q()},setLens(e){Y=e===`long`?je:35,a&&(J=Y),Q()},viewFrom(e,t,n,r,i,a){z=e,B=`globe`,V=c[e],G.copy(k(V[2])),K=q=1,J=Y=je,X.x=Z.x=i,X.y=Z.y=a,bt({target:s[e],dist:Ae(D(e),35,r/(R/2)),yaw:n,pitch:t})},centreOf(e){let t=k(s[e]).add(m.position),n=u.position.clone().sub(t);return p(e,o,[n.x,n.y,n.z])},dispose(){at=!0,cancelAnimationFrame(it),clearTimeout(tt),yt.disconnect(),r.removeEventListener(`wheel`,vt);for(let e of S)e.dispose();n.dispose(),r.remove()}}}var A=e=>{let t=(e%360+540)%360-180;return t===-180?180:Math.round(t*1e6)/1e6},j=(e,t,n,r)=>({lang:`en`,key:e.replace(/ /g,`_`),title:e,lat:t,lon:A(n),kind:r}),M={Moon:[j(`Apollo 11`,.67416,23.47314,`landing`),j(`Apollo 12`,-3.01239,-23.42157,`landing`),j(`Apollo 14`,-3.6453,-17.47136,`landing`),j(`Apollo 15`,26.1322,3.6339,`landing`),j(`Apollo 16`,-8.97301,15.50019,`landing`),j(`Apollo 17`,20.1908,30.7717,`landing`),j(`Chang’e 4`,-45.444,177.599,`landing`),j(`Tycho (lunar crater)`,-43.31,-11.36,`crater`),j(`Copernicus (lunar crater)`,9.62,-20.08,`crater`)],Mars:[j(`Viking 1`,22.27,312.05,`landing`),j(`Viking 2`,47.64,-225.71,`landing`),j(`Mars Pathfinder`,19.13,-33.22,`landing`),j(`Spirit (rover)`,-14.5684,175.4726,`landing`),j(`Opportunity (rover)`,-1.9462,354.4734,`landing`),j(`Curiosity (rover)`,-4.5895,137.4417,`landing`),j(`InSight`,4.5024,135.6234,`landing`),j(`Perseverance (rover)`,18.4446,77.4509,`landing`),j(`Zhurong (rover)`,25.102,109.914,`landing`)]},Ge={Moon:[`Category:Maria on the Moon`,`Category:Impact craters on the Moon`],Mars:[`Category:Mountains on Mars`,`Category:Valleys and canyons on Mars`,`Category:Impact craters on Mars`]};function Ke(e,t){return/Maria|Mare |Oceanus|Lacus|Sinus|Palus/.test(e+` `+t)?`sea`:/Mountains|Mons|Montes/.test(e)?`mountain`:/Valleys|canyons/.test(e)?`valley`:`crater`}var N=e=>e.replace(/ \([^)]*\)$/,``),qe={Moon:8e3,Mars:4e3};async function Je(e,t){let n=[],r={};for(let i=0;i<6;i++){let i=new URLSearchParams({action:`query`,format:`json`,formatversion:`2`,origin:`*`,generator:`categorymembers`,gcmtitle:t,gcmtype:`page`,gcmlimit:`max`,prop:`coordinates|info`,coprop:`globe`,colimit:`max`,...r}),a=await fetch(`https://en.wikipedia.org/w/api.php?${i}`).then(e=>e.json());for(let r of a.query?.pages??[]){let i=r.coordinates?.find(t=>t.globe?.toLowerCase()===e.toLowerCase()),a=Ke(t,r.title);i&&(a!==`crater`||(r.length??0)>=qe[e])&&n.push(j(r.title,i.lat,i.lon,a))}if(!a.continue)break;r=a.continue}return n}async function Ye(e){let t=[];for(let n of Ge[e])t.push(...await Je(e,n).catch(()=>[]));let n=new Set;return[...M[e],...t].filter(e=>!n.has(e.title)&&n.add(e.title))}var P=i(),Xe={landing:0,sea:1,mountain:2,valley:3,crater:4},Ze=40,Qe={landing:r(`Landing sites`),sea:r(`Seas`),mountain:r(`Mountains`),valley:r(`Valleys`),crater:r(`Craters`)};function $e(t,n){return e(t===`landing`?`Landing site`:t===`sea`?n===`Moon`?`A “sea” of old lava`:`A plain`:t===`mountain`?`A mountain`:t===`valley`?`A valley or canyon`:`A crater`)}function et({world:t,frames:n,space:r}){let{data:i,error:c}=o(()=>Ye(t).then(e=>y(e))),[l,u]=(0,E.useState)(null),d=(0,E.useMemo)(()=>new Map((i??[]).map(e=>[N(e.title),e])),[i]),f=(e,t=!1)=>{S(`pop`),u(e),e&&t&&r?.turnTo(e.lat,e.lon)};return(0,P.jsxs)(P.Fragment,{children:[i&&(0,P.jsx)(F,{frames:n,world:t,places:i,picked:l,onPick:e=>f(e)}),(0,P.jsxs)(`div`,{className:`explore-bar`,children:[(0,P.jsxs)(`a`,{className:`btn quiet`,href:a(t),children:[(0,P.jsx)(s,{name:`left`,size:18}),` `,C(t)]}),(0,P.jsxs)(`label`,{className:`explore-find`,children:[(0,P.jsx)(s,{name:`search`,size:18}),(0,P.jsx)(`input`,{className:`input`,list:`explore-places`,placeholder:e(i?`Find a place`:`Finding places…`),"aria-label":e(t===`Moon`?`Find a place on the Moon`:`Find a place on Mars`),disabled:!i,onChange:e=>{let t=d.get(e.target.value);t&&f(t,!0)}})]}),(0,P.jsx)(`datalist`,{id:`explore-places`,children:[...d.keys()].sort().map(e=>(0,P.jsx)(`option`,{value:e},e))}),c?(0,P.jsx)(`p`,{className:`explore-note`,children:e(`The places didn’t load. Check the connection.`)}):null]}),(0,P.jsx)(`ul`,{className:`explore-key`,"aria-label":e(`What the pins mean`),children:[`landing`,`sea`,`mountain`,`valley`,`crater`].filter(e=>i?.some(t=>t.kind===e)).map(t=>(0,P.jsxs)(`li`,{"data-kind":t,children:[(0,P.jsx)(`i`,{"aria-hidden":`true`}),e(Qe[t])]},t))}),l&&(0,P.jsx)(I,{place:l,world:t,onClose:()=>u(null)},l.title)]})}function F({frames:e,world:t,places:n,picked:r,onPick:i}){let a=(0,E.useSyncExternalStore)(e.sub,e.get);if(!a||a.flying)return null;let o=a.bodies.find(e=>e.id===t);if(!o)return null;let s=n.map(e=>({p:e,s:a.project(e.lat,e.lon)})).filter(({s:e})=>e&&e.front&&Math.hypot(e.x-o.x,e.y-o.y)<o.px*.93).map(({p:e,s:t})=>({p:e,x:t.x,y:t.y,d:Math.hypot(t.x-o.x,t.y-o.y)})).sort((e,t)=>Xe[e.p.kind]-Xe[t.p.kind]||e.d-t.d),c=[],l=[],u=0;return(0,P.jsx)(`div`,{className:`place-pins`,children:s.map(({p:e,x:t,y:n})=>{if(e.kind!==`landing`&&c.some(e=>Math.hypot(e.x-t,e.y-n)<26)||e.kind===`crater`&&++u>Ze)return null;c.push({x:t,y:n});let a=N(e.title),o={x0:t-6,x1:t+14+a.length*7.2,y:n},s=l.some(e=>Math.abs(e.y-n)<18&&e.x0<o.x1&&o.x0<e.x1);return s||l.push(o),(0,P.jsxs)(`button`,{className:`place-pin`,"data-kind":e.kind,"data-crowded":s||void 0,"aria-pressed":r?.title===e.title,style:{transform:`translate(${t}px, ${n}px)`},onClick:()=>i(e),children:[(0,P.jsx)(`i`,{"aria-hidden":`true`}),(0,P.jsx)(`span`,{children:a})]},e.title)})})}function I({place:t,world:n,onClose:r}){let{data:i,error:a}=o(()=>we(t.title)),l=v([t.title]);return(0,P.jsxs)(`section`,{className:`place-card`,"aria-live":`polite`,children:[(0,P.jsxs)(`header`,{children:[(0,P.jsx)(`p`,{className:`story-kind`,children:$e(t.kind,n)}),(0,P.jsx)(`h2`,{children:N(t.title)}),(0,P.jsx)(`button`,{className:`icon-btn`,onClick:r,"aria-label":e(`Close`),children:(0,P.jsx)(s,{name:`x`})})]}),i?.extract?(0,P.jsx)(`p`,{lang:i.lang,children:w(i.extract,3,i.lang)}):a?null:(0,P.jsx)(c,{lines:3}),(0,P.jsx)(`a`,{className:`btn primary`,href:l(t.title),children:e(`Read about it`)})]})}function tt(e,t,n,r){if(!e)return{fx:.5,fy:.5,fill:0};let i=g[e].ring?1.9:1;if(t)return n>=900?{fx:(n-400)/2/n,fy:.52,fill:Math.min(.42*r,.4*(n-400))/(r/2)}:{fx:.5,fy:.42,fill:Math.min(.3*r,.44*n)/(r/2)};if(n>=900){let e=n-Math.min(448,.4*n)-48,t=Math.min(e*.3,r*.3)/i;return{fx:e/2/n,fy:.5,fill:t/(r/2)}}return{fx:.5,fy:.26,fill:Math.min(n*.3,r*.17)/i/(r/2)}}function L({body:t,explore:r=!1}){let i=(0,E.useRef)(null),o=(0,E.useRef)(null),s=(0,E.useMemo)(Le,[]),[c,d]=(0,E.useState)(!1),[f,p]=(0,E.useState)(null),ee=(0,E.useSyncExternalStore)(s.sub,()=>s.get()?.flying??!0);(0,E.useEffect)(()=>{let e=i.current,t=We(e,{onFrame:s.set});t||d(!0),o.current=t,m().then(e=>t?.setAurora(e.kp),()=>{});let n=new ResizeObserver(()=>p([e.clientWidth,e.clientHeight]));return n.observe(e),()=>{n.disconnect(),t?.dispose(),o.current=null}},[s]);let h=(0,E.useRef)(null);(0,E.useEffect)(()=>{let e=o.current;if(!e||!f)return;let n=`${t}/${r}`,a=h.current!==null&&h.current!==n,{fx:s,fy:c,fill:l}=tt(t,r,...f),u=h.current===null&&t===`Earth`&&!r?Ee():null;if(u){let t=i.current.getBoundingClientRect();e.viewFrom(`Earth`,u.lat,u.lon,u.radiusPx,(u.cx-t.left)/f[0],(u.cy-t.top)/f[1])}e.setLens(`wide`),e.setSpin(r?`globe`:`camera`),e.setLight(r?`reading`:`sun`),e.setCentre(s,c),e.focus(t??null,{instant:!a&&!u,fill:l}),h.current=n},[t,r,f]);let[g,ne]=(0,E.useState)(!1);return(0,P.jsxs)(`div`,{className:`space`,"data-body":t?!0:void 0,"data-explore":r||void 0,children:[(0,P.jsx)(`div`,{className:`space-stage`,ref:i,role:`img`,"aria-label":e(`The solar system in 3D, as it is right now. Drag to turn, pinch or scroll to zoom.`),children:c&&(0,P.jsx)(`div`,{className:`space-none`,children:(0,P.jsx)(l,{title:e(`Space needs 3D graphics`),children:e(`This browser can’t draw 3D scenes, or they are switched off. The articles about the planets are still a search away.`)})})}),!r&&!g&&(0,P.jsx)(R,{frames:s,focus:t}),(0,P.jsxs)(`nav`,{className:`space-list`,"aria-label":e(`Worlds`),hidden:r||g,children:[(0,P.jsx)(`a`,{href:a(),"aria-current":!t||void 0,children:e(`Whole solar system`)}),_.map(e=>(0,P.jsx)(`a`,{href:a(e),"aria-current":e===t&&!r||void 0,children:C(e)},e))]}),r&&(t===`Moon`||t===`Mars`)&&(0,P.jsx)(et,{world:t,frames:s,space:o.current},t),t&&!r&&(0,P.jsx)(`div`,{className:`space-story`,"data-shown":!ee&&!g||void 0,children:(0,P.jsx)(Te,{id:t,onAtlas:()=>{let e=o.current,t=i.current,r=t?.closest(`main`);if(!e||!t||!r||!f)return te(`#/atlas`);n(()=>import(`./Atlas-D60mD-Bm.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]),import.meta.url);let a=T(r),s=t.getBoundingClientRect();ne(!0),e.setSpin(`globe`),e.setLight(`reading`),e.setLens(`long`),e.setCentre((a.cx-s.left)/f[0],(a.cy-s.top)/f[1]),e.focus(`Earth`,{fill:a.radiusPx/(f[1]/2)}),setTimeout(()=>{let{lat:t,lon:n}=e.centreOf(`Earth`);te(u(t,n))},1250)}})},t)]})}function R({frames:e,focus:t}){let n=(0,E.useSyncExternalStore)(e.sub,e.get);if(!n)return null;let r=[];return(0,P.jsx)(`div`,{className:`space-marks`,"aria-hidden":`true`,children:n.bodies.map(e=>{if(!e.visible||e.id===t||e.px>40)return null;let n=e.px>5,i=n?e.y+e.px+6:e.y,o=r.some(t=>Math.abs(t.x-e.x)<56&&Math.abs(t.y-i)<20);return o||r.push({x:e.x,y:i}),(0,P.jsxs)(`a`,{className:`space-mark`,href:a(e.id),tabIndex:-1,"data-big":n||void 0,"data-crowded":o||void 0,style:{transform:`translate(${e.x}px, ${i}px)`,"--c":g[e.id].colour},children:[(0,P.jsx)(`i`,{}),(0,P.jsx)(`span`,{children:C(e.id)})]},e.id)})})}export{L as default};