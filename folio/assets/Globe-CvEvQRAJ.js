import{d as e}from"./i18n-Dmwb8lq7.js";import{n as t,s as n}from"./sky-eAl3Flpb.js";import{a as r,c as i,d as a,f as o,i as s,l as c,o as l,r as u,u as ee}from"./d3-geo-DXq2g-HC.js";import{t as d}from"./react-B2YxQ349.js";import{n as f,r as p,t as m}from"./countries-110m-D8YJKQXa.js";import{mt as te}from"./index-We-DKYPy.js";import{a as h}from"./sound-D_RtPZ__.js";import{t as g}from"./jsx-runtime-Dw_NFuYc.js";function _(e,t){var n={},r={},i={},a=[],o=-1;t.forEach(function(n,r){var i=e.arcs[n<0?~n:n],a;i.length<3&&!i[1][0]&&!i[1][1]&&(a=t[++o],t[o]=n,t[r]=a)}),t.forEach(function(e){var t=s(e),n=t[0],a=t[1],o,c;if(o=i[n]){if(delete i[o.end],o.push(e),o.end=a,c=r[a]){delete r[c.start];var l=c===o?o:o.concat(c);r[l.start=o.start]=i[l.end=c.end]=l}else r[o.start]=i[o.end]=o}else if(o=r[a]){if(delete r[o.start],o.unshift(e),o.start=n,c=i[n]){delete i[c.end];var u=c===o?o:c.concat(o);r[u.start=c.start]=i[u.end=o.end]=u}else r[o.start]=i[o.end]=o}else o=[e],r[o.start=n]=i[o.end=a]=o});function s(t){var n=e.arcs[t<0?~t:t],r=n[0],i;return e.transform?(i=[0,0],n.forEach(function(e){i[0]+=e[0],i[1]+=e[1]})):i=n[n.length-1],t<0?[i,r]:[r,i]}function c(e,t){for(var r in e){var i=e[r];delete t[i.start],delete i.start,delete i.end,i.forEach(function(e){n[e<0?~e:e]=1}),a.push(i)}}return c(i,r),c(r,i),t.forEach(function(e){n[e<0?~e:e]||a.push([e])}),a}function v(e){return p(e,y.apply(this,arguments))}function y(e,t,n){var r,i,a;if(arguments.length>1)r=b(e,t,n);else for(i=0,r=Array(a=e.arcs.length);i<a;++i)r[i]=i;return{type:`MultiLineString`,arcs:_(e,r)}}function b(e,t,n){var r=[],i=[],a;function o(e){var t=e<0?~e:e;(i[t]||(i[t]=[])).push({i:e,g:a})}function s(e){e.forEach(o)}function c(e){e.forEach(s)}function l(e){e.forEach(c)}function u(e){switch(a=e,e.type){case`GeometryCollection`:e.geometries.forEach(u);break;case`LineString`:s(e.arcs);break;case`MultiLineString`:case`Polygon`:c(e.arcs);break;case`MultiPolygon`:l(e.arcs)}}return u(t),i.forEach(n==null?function(e){r.push(e[0].i)}:function(e){n(e[0].g,e[e.length-1].g)&&r.push(e[0].i)}),r}var x=d(),S=g(),C=4,w=`./textures/`,T,E=()=>T??=fetch(m).then(e=>e.json()).then(e=>({land:f(e,e.objects.land),borders:v(e,e.objects.countries,(e,t)=>e!==t),countries:f(e,e.objects.countries).features})),D=()=>E().then(e=>e.countries);async function O(){let{countries:e}=await E(),[t,n]=u(e[Math.floor(Math.random()*e.length)]);return[n+(Math.random()-.5)*3,t+(Math.random()-.5)*3]}async function k(){let{countries:e}=await E();return e.map(e=>{let[t,n]=u(e);return{name:e.properties.name,lat:n,lon:t}})}async function A(e,t){let{countries:n}=await E();return n.find(n=>r(n,[t,e]))?.properties.name}var j=(e,t,n)=>Math.max(t,Math.min(n,e)),M=`#version 300 es
in vec2 corner;
void main() { gl_Position = vec4(corner, 0.0, 1.0); }`,N=`#version 300 es
precision highp float;
uniform vec2 uCentre;      // px, origin bottom-left
uniform float uRadius;     // px
uniform vec2 uTurn;        // d3 rotate() angles in radians: longitude, latitude
uniform sampler2D uDay, uClouds, uWater, uNight;
uniform float uHasDay, uHasClouds, uHasWater, uHasNight;
uniform float uNightOn;    // 1: show the real night side, city lights and all
uniform vec3 uSunGeo;      // the point under the Sun, as a direction from the Earth's centre
uniform float uCloudTurn;  // radians the clouds have drifted ahead of the ground
uniform float uFlat;       // 0 a globe, 1 unrolled into a flat map twice as wide as it is high
out vec4 colour;

const float PI = 3.141592653589793;
const vec3 SUN = normalize(vec3(-0.5, 0.55, 0.67)); // upper left, a little in front
const vec3 AIR = vec3(0.42, 0.68, 1.0);

/** The longitude and latitude (radians) under a point of the disc. */
vec2 lonLat(vec2 p) {
  float d = min(length(p), 1.0);
  float depth = sqrt(max(1.0 - d * d, 0.0));
  float x = depth * cos(uTurn.y) + p.y * sin(uTurn.y);
  float z = -depth * sin(uTurn.y) + p.y * cos(uTurn.y);
  return vec2(atan(p.x, x) - uTurn.x, asin(clamp(z, -1.0, 1.0)));
}

void main() {
  vec2 p = (gl_FragCoord.xy - uCentre) / uRadius;
  // Unrolling: the disc stretches into a map 2.4 radii wide and 1.2 high, its outline squaring off as it
  // goes, and each point slides from where the globe shows it to where a flat map puts it.
  float hw = mix(1.0, 1.19, uFlat), hh = mix(1.0, 0.595, uFlat);
  p /= vec2(hw, hh);
  float ex = mix(2.0, 16.0, uFlat);
  float d = uFlat > 0.0 ? pow(pow(abs(p.x), ex) + pow(abs(p.y), ex), 1.0 / ex) : length(p);
  // Everything is computed for every pixel and the sphere/sky choice comes last:
  // texture lookups need their neighbours, so they can't sit behind an early return.
  if (d > 1.0) p /= d;
  float od = min(length(p), 1.0);
  float depth = sqrt(max(1.0 - od * od, 0.0)); // towards the viewer
  float cp = cos(uTurn.y), sp = sin(uTurn.y);
  vec2 o = p / max(length(p), 1.0);
  float x = depth * cp + o.y * sp;
  float z = -depth * sp + o.y * cp;
  float lon = mix(atan(o.x, x), p.x * PI, uFlat) - uTurn.x;
  float lat = mix(asin(clamp(z, -1.0, 1.0)), p.y * PI * 0.5, uFlat);

  // Longitude jumps from +180 to -180 somewhere, and a mipmap reads that jump as "this pixel
  // spans the whole map" and blurs it into a seam. So the lookup position stays as it is, but
  // the footprint handed to the sampler comes from whichever of two wrappings is smooth here.
  float u1 = fract(lon / (2.0 * PI) + 0.5);
  float u2 = fract(u1 + 0.5);
  vec2 uv = vec2(u1, 0.5 - lat / PI);
  bool first = fwidth(u1) <= fwidth(u2);
  vec2 gx = vec2(first ? dFdx(u1) : dFdx(u2), dFdx(uv.y));
  vec2 gy = vec2(first ? dFdy(u1) : dFdy(u2), dFdy(uv.y));

  vec3 n = normalize(mix(vec3(o, depth), vec3(0.0, 0.0, 1.0), uFlat));
  float lit = max(dot(n, SUN), 0.0);
  vec3 ground = uHasDay > 0.5 ? textureGrad(uDay, uv, gx, gy).rgb : vec3(0.10, 0.27, 0.58); // plain sea until the map arrives
  // The whole face stays readable: this is an atlas, not a view from orbit with a night side.
  vec3 c = ground * (0.56 + 0.62 * lit);
  // The clouds drift a little faster than the ground turns, and each casts a soft shadow away from
  // the Sun: the cloud over a point's shadow lies a little towards the Sun from it.
  float drift = uCloudTurn / (2.0 * PI);
  vec2 cloudUv = vec2(uv.x - drift, uv.y);
  if (uHasClouds > 0.5) {
    vec2 s = lonLat(p + SUN.xy * 0.02);
    float shadow = textureGrad(uClouds, vec2(fract(s.x / (2.0 * PI) + 0.5) - drift, 0.5 - s.y / PI), gx, gy).r;
    c *= 1.0 - 0.36 * shadow;
  }
  if (uHasWater > 0.5) {
    vec3 halfway = normalize(SUN + vec3(0.0, 0.0, 1.0));
    c += vec3(1.0, 0.95, 0.85) * textureGrad(uWater, uv, gx, gy).r * pow(max(dot(n, halfway), 0.0), 60.0) * 0.45;
  }
  if (uHasClouds > 0.5) c = mix(c, vec3(0.5 + 0.55 * lit), textureGrad(uClouds, cloudUv, gx, gy).r * 0.62);
  if (uNightOn > 0.5) {
    // where the Sun is down: the night photograph's city lights, and a soft twilight between
    vec3 g = vec3(cos(lat) * cos(lon), cos(lat) * sin(lon), sin(lat));
    float sun = dot(g, uSunGeo);
    float day = smoothstep(-0.12, 0.08, sun);
    vec3 lights = uHasNight > 0.5 ? textureGrad(uNight, uv, gx, gy).rgb * 1.6 : vec3(0.0);
    vec3 dark = ground * 0.07 + lights + vec3(0.004, 0.01, 0.03);
    c = mix(dark, c, day);
  }
  c += AIR * pow(1.0 - depth, 3.0) * 0.55 * (1.0 - uFlat); // air thickens towards the rim
  float edge = clamp((1.0 - d) * uRadius * hh, 0.0, 1.0); // one pixel of antialiasing
  float glow = pow(clamp(1.0 - (d - 1.0) / 0.16, 0.0, 1.0), 3.0) * 0.6 * (1.0 - uFlat); // the atmosphere, fading into the page
  colour = d > 1.0 ? vec4(AIR * glow, glow) : vec4(c * edge, edge);
}`;function ne(e,t,n){let r=e.getContext(`webgl2`,{antialias:!1,premultipliedAlpha:!0});if(!r)return null;let i=(e,t)=>{let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)||console.error(`Globe shader:`,r.getShaderInfoLog(n)),n},a=r.createProgram();if(r.attachShader(a,i(r.VERTEX_SHADER,M)),r.attachShader(a,i(r.FRAGMENT_SHADER,N)),r.linkProgram(a),!r.getProgramParameter(a,r.LINK_STATUS))return null;r.useProgram(a),r.bindBuffer(r.ARRAY_BUFFER,r.createBuffer()),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let o=r.getAttribLocation(a,`corner`);r.enableVertexAttribArray(o),r.vertexAttribPointer(o,2,r.FLOAT,!1,0,0),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA);let s=e=>r.getUniformLocation(a,e);[`uDay`,`uClouds`,`uWater`,`uNight`].forEach((e,t)=>r.uniform1i(s(e),t));let c=(e,t,i,a)=>{let o=new Image;o.onload=()=>{r.activeTexture(r.TEXTURE0+e),r.bindTexture(r.TEXTURE_2D,r.createTexture()),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,o),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.REPEAT),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.uniform1f(s(i),1),a?.(),n()},o.src=w+t},l=`waiting`;c(0,`earth-day-2k.jpg`,`uHasDay`,()=>l=`no`),c(2,`earth-water.jpg`,`uHasWater`),t&&c(1,`earth-clouds.jpg`,`uHasClouds`);let u=!1;return{paint(e,t,n,i=null,a=0,o=0){if(i&&!u&&(u=!0,c(3,`earth-night-4k.jpg`,`uHasNight`)),r.uniform1f(s(`uNightOn`),+!!i),i){let[e,t]=[i[0]*Math.PI/180,i[1]*Math.PI/180];r.uniform3f(s(`uSunGeo`),Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t))}l===`no`&&t*2>1150&&(l=`asked`,c(0,`earth-day-4k.jpg`,`uHasDay`)),r.viewport(0,0,e,e),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.uniform2f(s(`uCentre`),e/2,e/2),r.uniform1f(s(`uRadius`),t),r.uniform2f(s(`uTurn`),n[0]*Math.PI/180,n[1]*Math.PI/180),r.uniform1f(s(`uCloudTurn`),a*Math.PI/180),r.uniform1f(s(`uFlat`),o),r.drawArrays(r.TRIANGLES,0,3)}}}function P(e){let r=n(e).Sun;return[((r.ra-t(e))%360+540)%360-180,r.dec]}function F({label:t,pins:n=[],active:u,focus:d,focusZoom:f,spin:p=!1,zoomable:m=!1,pan:g=`free`,clouds:_=!1,borders:v=!1,mark:y,start:b,peek:w,onOut:T,night:D,onPick:O,onPin:k,onHover:A}){let M=(0,x.useRef)(null),N=(0,x.useRef)(null),F=(0,x.useRef)(null),I=(0,x.useRef)(new Map),L=(0,x.useRef)({pins:n,spin:p,mark:y,onPick:O,onHover:A,onOut:T,night:D});L.current={pins:n,spin:p,mark:y,onPick:O,onHover:A,onOut:T,night:D};let R=(0,x.useRef)(null);(0,x.useEffect)(()=>{let e=F.current,t=e.getContext(`2d`),n=o().clipAngle(90).precision(.4),u=i().precision(.4),f=ee(n,t),p=c(),g=matchMedia(`(prefers-reduced-motion: reduce)`).matches,y=null,x=0,S=1,T=b?j(b.zoom,1,C):1,D=d?[-d[1],-d[0]]:b?[-b.lon,j(-b.lat,-85,85)]:[-15,-24],O=0,k=null,A=null,z={vx:0,vy:0},B=0,V=!0,H=!0,U=performance.now(),W=0,G=0,K=0,q=0,J=!1,Y=ne(N.current,_,()=>V=!0);E().then(e=>{y=e,V=!0});let X=()=>x/2*.84*T;w&&(w.current=()=>{let e=M.current.getBoundingClientRect();return{lat:-D[1],lon:((-D[0]+180)%360+360)%360-180,zoom:T,radiusPx:X(),cx:e.left+e.width/2,cy:e.top+e.height/2}});let Z=()=>{n.rotate(D).scale(X()).translate([x/2,x/2]),u.rotate([D[0],0]).scale(X()/.84/Math.PI).translate([x/2,x/2]);let e=K===1?u:n;return f.projection(e),e};function re(){let e=x/2,n=X(),r=Z();if(Y?.paint(Math.round(x*S),n*S,D,L.current.night?P(Date.now()):null,B,K),t.setTransform(S,0,0,S,0,0),t.clearRect(0,0,x,x),K>0&&K<1){for(let e of I.current.values())e.hidden=!0;return}if(!Y){let r=t.createRadialGradient(e-n*.35,e-n*.4,n*.1,e,e,n);r.addColorStop(0,`#4a94f5`),r.addColorStop(1,`#0e3a94`),t.fillStyle=r,t.beginPath(),f({type:`Sphere`}),t.fill(),y&&(t.beginPath(),f(y.land),t.fillStyle=`#ffc94d`,t.fill())}if((v||!Y)&&(t.beginPath(),f(p),t.strokeStyle=`rgba(255, 255, 255, 0.13)`,t.lineWidth=.6,t.stroke(),y&&(t.beginPath(),f(y.borders),t.strokeStyle=Y?`rgba(255, 255, 255, 0.5)`:`rgba(122, 78, 0, 0.55)`,t.lineWidth=.8,t.stroke())),L.current.night){let[e,n]=P(Date.now());if(!Y){let r=[e>0?e-180:e+180,-n];for(let[e,n]of[[96,.16],[90,.42]])t.beginPath(),f(s().center(r).radius(e)()),t.fillStyle=`rgba(3, 8, 28, ${n})`,t.fill()}let i=r([e,n]);i&&(K===1||l([e,n],[-D[0],-D[1]])<Math.PI/2)&&(t.beginPath(),t.arc(i[0],i[1],7,0,Math.PI*2),t.fillStyle=`#ffd36b`,t.shadowColor=`#ffd36b`,t.shadowBlur=14,t.fill(),t.shadowBlur=0)}let i=L.current.mark&&y?.countries.find(e=>e.properties.name===L.current.mark);i&&(t.beginPath(),f(i),t.fillStyle=`rgba(255, 201, 77, 0.5)`,t.fill(),t.strokeStyle=`#ffc94d`,t.lineWidth=1.6,t.stroke());let a=[-D[0],-D[1]];for(let e of L.current.pins){let t=I.current.get(e.id);if(!t)continue;let n=r([e.lon,e.lat]),i=K===1||l([e.lon,e.lat],a)<Math.PI/2-.04;t.hidden=!n||!i,n&&(t.style.transform=`translate(${n[0]}px, ${n[1]}px)`)}}function ie(e){G=requestAnimationFrame(ie);let t=Math.min(64,e-U);if(U=e,H&&x){if(K!==q&&(K=g?q:j(K+(q?t:-t)/700,0,1),V=!0),k){let t=j((e-k.t0)/1200,0,1),n=t<.5?4*t*t*t:1-(-2*t+2)**3/2,[r,i]=k.at(n);D=[-r,-i],T=k.z0+(k.z1-k.z0)*n,t===1&&(k=null),V=!0}else if(Math.abs(z.vx)+Math.abs(z.vy)>.002){D=[D[0]+z.vx*t,j(D[1]+z.vy*t,-85,85)];let e=.975**(t/16.7);z={vx:z.vx*e,vy:z.vy*e},V=!0}else L.current.spin&&!A&&!g&&(D=[D[0]+t*.004,D[1]],B+=t*.004*.15,V=!0);V&&(V=!1,re())}}R.current={fly(e,t,n=T){let r=j(n,1,C);g||!x?(D=[-t,-e],T=r,k=null):k={at:a([-D[0],-D[1]],[t,e]),t0:performance.now(),z0:T,z1:r},V=!0},zoomBy(e){T=j(T*e,1,C),V=!0},redraw(){V=!0}};let Q=t=>{let n=e.getBoundingClientRect();return[t.clientX-n.left,t.clientY-n.top]},ae=(e,t)=>{if(K>0&&K<1||!K&&Math.hypot(e-x/2,t-x/2)>X())return null;let n=Z().invert([e,t]);return n&&Number.isFinite(n[0])&&Number.isFinite(n[1])?n:null},oe=e=>y?.countries.find(t=>r(t,e))?.properties.name,se=t=>{if(t.button)return;e.setPointerCapture(t.pointerId);let[n,r]=Q(t);A={x:n,y:r,rot:[...D],moved:0,lx:n,ly:r,t:t.timeStamp,vx:0,vy:0},k=null,z={vx:0,vy:0}},ce=e=>{let[t,n]=Q(e);if(A){let r=t-A.x,i=n-A.y;A.moved=Math.max(A.moved,Math.hypot(r,i));let a=75/X();D=[A.rot[0]+r*a,j(A.rot[1]-i*a,-85,85)];let o=e.timeStamp-A.t;o>0&&(A.vx=A.vx*.5+(t-A.lx)*a/o*.5,A.vy=A.vy*.5+-(n-A.ly)*a/o*.5,A.lx=t,A.ly=n,A.t=e.timeStamp),V=!0}else if(L.current.onHover&&e.timeStamp-W>80){W=e.timeStamp;let r=ae(t,n);L.current.onHover(r?{lat:r[1],lon:r[0],country:oe(r)}:null)}},le=e=>{let t=A;if(A=null,t&&t.moved>6&&!g&&e.timeStamp-t.t<80){z={vx:t.vx,vy:t.vy};let e=Math.hypot(t.vx,t.vy);e>.15&&h(`whoosh`),e>.6&&te(`flick`)}if(!t||t.moved>6)return;let n=ae(...Q(e));n&&L.current.onPick?.(n[1],n[0])},ue=()=>{A=null},de=()=>{J=!1,q=0,L.current.onHover?.(null)},fe=e=>{J=!0,e.shiftKey&&(q=1)},$=e=>{e.key===`Shift`&&J&&!e.repeat&&(q=+(e.type===`keydown`),q&&(h(`page`),te(`unroll`)))},pe=e=>{if(m){if(e.preventDefault(),O=T===1&&e.deltaY>0?O+e.deltaY:0,O>500)return O=0,L.current.onOut?.();R.current.zoomBy(Math.exp(-e.deltaY*.0015))}},me=e=>{let t=12/T,n={ArrowLeft:[t,0],ArrowRight:[-t,0],ArrowUp:[0,-t],ArrowDown:[0,t]};if(n[e.key])D=[D[0]+n[e.key][0],j(D[1]+n[e.key][1],-85,85)],k=null,V=!0;else if(m&&(e.key===`+`||e.key===`=`))R.current.zoomBy(1.3);else if(m&&e.key===`-`)R.current.zoomBy(1/1.3);else if(e.key===`Enter`||e.key===` `)L.current.onPick?.(-D[1],-D[0]);else return;e.preventDefault()},he=new ResizeObserver(()=>{x=M.current.clientWidth,S=Math.min(2,devicePixelRatio||1);let t=Math.round(x*S);e.width=e.height=t,N.current.width=N.current.height=t,V=!0});he.observe(M.current);let ge=new IntersectionObserver(([e])=>H=e.isIntersecting);ge.observe(e),e.addEventListener(`pointerdown`,se),e.addEventListener(`pointermove`,ce),e.addEventListener(`pointerup`,le),e.addEventListener(`pointercancel`,ue),e.addEventListener(`pointerleave`,de),e.addEventListener(`pointerenter`,fe),addEventListener(`keydown`,$),addEventListener(`keyup`,$),e.addEventListener(`wheel`,pe,{passive:!1}),e.addEventListener(`keydown`,me);let _e=e=>{g||(z={vx:z.vx+(e.detail??1),vy:z.vy})};return addEventListener(`folio:spin`,_e),G=requestAnimationFrame(ie),()=>{cancelAnimationFrame(G),he.disconnect(),ge.disconnect(),e.removeEventListener(`pointerdown`,se),e.removeEventListener(`pointermove`,ce),e.removeEventListener(`pointerup`,le),e.removeEventListener(`pointercancel`,ue),e.removeEventListener(`pointerleave`,de),e.removeEventListener(`pointerenter`,fe),removeEventListener(`keydown`,$),removeEventListener(`keyup`,$),e.removeEventListener(`wheel`,pe),e.removeEventListener(`keydown`,me),removeEventListener(`folio:spin`,_e)}},[]);let[z,B]=d??[];return(0,x.useEffect)(()=>{z!==void 0&&B!==void 0&&R.current?.fly(z,B,f)},[z,B]),(0,x.useEffect)(()=>R.current?.redraw(),[n,u,y,D]),(0,S.jsxs)(`div`,{className:`globe`,ref:M,"data-pan":g,children:[(0,S.jsx)(`canvas`,{ref:N,"aria-hidden":`true`}),(0,S.jsx)(`canvas`,{ref:F,className:`globe-ink`,tabIndex:0,role:`img`,"aria-label":`${t}. Drag or use the arrow keys to turn it.`}),n.map(e=>(0,S.jsx)(`button`,{ref:t=>{t?I.current.set(e.id,t):I.current.delete(e.id)},className:`pin`,"data-kind":e.kind,"data-active":e.id===u||void 0,"data-label":e.label,"aria-label":e.label,onClick:()=>k?.(e.id),hidden:!0},e.id)),m&&(0,S.jsxs)(`div`,{className:`globe-zoom`,children:[(0,S.jsx)(`button`,{onClick:()=>R.current?.zoomBy(1.4),"aria-label":e(`Zoom in`),children:`+`}),(0,S.jsx)(`button`,{onClick:()=>R.current?.zoomBy(1/1.4),"aria-label":e(`Zoom out`),children:`−`})]})]})}export{A as countryAt,k as countryList,F as default,O as randomPlace,P as subsolar,D as worldShapes};