import{d as e}from"./i18n-8nXnYN52.js";import{n as t,s as n}from"./sky-eAl3Flpb.js";import{c as r,d as i,f as a,l as o,m as s,n as c,o as l,p as u,r as d,s as ee,t as f}from"./countries-110m-BYrHn7Xh.js";import{n as p}from"./preload-helper-c_moLTUX.js";import{X as te}from"./index-BfHwxWCU.js";import{a as ne}from"./sound-BpYiZV8j.js";import{t as m}from"./jsx-runtime-Dw_NFuYc.js";function h(e,t){var n={},r={},i={},a=[],o=-1;t.forEach(function(n,r){var i=e.arcs[n<0?~n:n],a;i.length<3&&!i[1][0]&&!i[1][1]&&(a=t[++o],t[o]=n,t[r]=a)}),t.forEach(function(e){var t=s(e),n=t[0],a=t[1],o,c;if(o=i[n]){if(delete i[o.end],o.push(e),o.end=a,c=r[a]){delete r[c.start];var l=c===o?o:o.concat(c);r[l.start=o.start]=i[l.end=c.end]=l}else r[o.start]=i[o.end]=o}else if(o=r[a]){if(delete r[o.start],o.unshift(e),o.start=n,c=i[n]){delete i[c.end];var u=c===o?o:c.concat(o);r[u.start=c.start]=i[u.end=o.end]=u}else r[o.start]=i[o.end]=o}else o=[e],r[o.start=n]=i[o.end=a]=o});function s(t){var n=e.arcs[t<0?~t:t],r=n[0],i;return e.transform?(i=[0,0],n.forEach(function(e){i[0]+=e[0],i[1]+=e[1]})):i=n[n.length-1],t<0?[i,r]:[r,i]}function c(e,t){for(var r in e){var i=e[r];delete t[i.start],delete i.start,delete i.end,i.forEach(function(e){n[e<0?~e:e]=1}),a.push(i)}}return c(i,r),c(r,i),t.forEach(function(e){n[e<0?~e:e]||a.push([e])}),a}function g(e){return d(e,_.apply(this,arguments))}function _(e,t,n){var r,i,a;if(arguments.length>1)r=v(e,t,n);else for(i=0,r=Array(a=e.arcs.length);i<a;++i)r[i]=i;return{type:`MultiLineString`,arcs:h(e,r)}}function v(e,t,n){var r=[],i=[],a;function o(e){var t=e<0?~e:e;(i[t]||(i[t]=[])).push({i:e,g:a})}function s(e){e.forEach(o)}function c(e){e.forEach(s)}function l(e){e.forEach(c)}function u(e){switch(a=e,e.type){case`GeometryCollection`:e.geometries.forEach(u);break;case`LineString`:s(e.arcs);break;case`MultiLineString`:case`Polygon`:c(e.arcs);break;case`MultiPolygon`:l(e.arcs)}}return u(t),i.forEach(n==null?function(e){r.push(e[0].i)}:function(e){n(e[0].g,e[e.length-1].g)&&r.push(e[0].i)}),r}var y=p(),b=m(),x=4,S=`./textures/`,C,w=()=>C??=fetch(f).then(e=>e.json()).then(e=>({land:c(e,e.objects.land),borders:g(e,e.objects.countries,(e,t)=>e!==t),countries:c(e,e.objects.countries).features})),T=()=>w().then(e=>e.countries);async function E(){let{countries:e}=await w(),[t,n]=l(e[Math.floor(Math.random()*e.length)]);return[n+(Math.random()-.5)*3,t+(Math.random()-.5)*3]}async function D(){let{countries:e}=await w();return e.map(e=>{let[t,n]=l(e);return{name:e.properties.name,lat:n,lon:t}})}async function O(e,t){let{countries:n}=await w();return n.find(n=>r(n,[t,e]))?.properties.name}var k=(e,t,n)=>Math.max(t,Math.min(n,e)),A=`#version 300 es
in vec2 corner;
void main() { gl_Position = vec4(corner, 0.0, 1.0); }`,j=`#version 300 es
precision highp float;
uniform vec2 uCentre;      // px, origin bottom-left
uniform float uRadius;     // px
uniform vec2 uTurn;        // d3 rotate() angles in radians: longitude, latitude
uniform sampler2D uDay, uClouds, uWater, uNight;
uniform float uHasDay, uHasClouds, uHasWater, uHasNight;
uniform float uNightOn;    // 1: show the real night side, city lights and all
uniform vec3 uSunGeo;      // the point under the Sun, as a direction from the Earth's centre
uniform float uCloudTurn;  // radians the clouds have drifted ahead of the ground
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
  float d = length(p);
  // Everything is computed for every pixel and the sphere/sky choice comes last:
  // texture lookups need their neighbours, so they can't sit behind an early return.
  if (d > 1.0) p /= d;
  float depth = sqrt(max(1.0 - min(d, 1.0) * min(d, 1.0), 0.0)); // towards the viewer
  float cp = cos(uTurn.y), sp = sin(uTurn.y);
  float x = depth * cp + p.y * sp;
  float z = -depth * sp + p.y * cp;
  float lon = atan(p.x, x) - uTurn.x;
  float lat = asin(clamp(z, -1.0, 1.0));

  // Longitude jumps from +180 to -180 somewhere, and a mipmap reads that jump as "this pixel
  // spans the whole map" and blurs it into a seam. So the lookup position stays as it is, but
  // the footprint handed to the sampler comes from whichever of two wrappings is smooth here.
  float u1 = fract(lon / (2.0 * PI) + 0.5);
  float u2 = fract(u1 + 0.5);
  vec2 uv = vec2(u1, 0.5 - lat / PI);
  bool first = fwidth(u1) <= fwidth(u2);
  vec2 gx = vec2(first ? dFdx(u1) : dFdx(u2), dFdx(uv.y));
  vec2 gy = vec2(first ? dFdy(u1) : dFdy(u2), dFdy(uv.y));

  vec3 n = vec3(p, depth);
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
  c += AIR * pow(1.0 - depth, 3.0) * 0.55; // air thickens towards the rim
  float edge = clamp((1.0 - d) * uRadius, 0.0, 1.0); // one pixel of antialiasing
  float glow = pow(clamp(1.0 - (d - 1.0) / 0.16, 0.0, 1.0), 3.0) * 0.6; // the atmosphere, fading into the page
  colour = d > 1.0 ? vec4(AIR * glow, glow) : vec4(c * edge, edge);
}`;function re(e,t,n){let r=e.getContext(`webgl2`,{antialias:!1,premultipliedAlpha:!0});if(!r)return null;let i=(e,t)=>{let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)||console.error(`Globe shader:`,r.getShaderInfoLog(n)),n},a=r.createProgram();if(r.attachShader(a,i(r.VERTEX_SHADER,A)),r.attachShader(a,i(r.FRAGMENT_SHADER,j)),r.linkProgram(a),!r.getProgramParameter(a,r.LINK_STATUS))return null;r.useProgram(a),r.bindBuffer(r.ARRAY_BUFFER,r.createBuffer()),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let o=r.getAttribLocation(a,`corner`);r.enableVertexAttribArray(o),r.vertexAttribPointer(o,2,r.FLOAT,!1,0,0),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA);let s=e=>r.getUniformLocation(a,e);[`uDay`,`uClouds`,`uWater`,`uNight`].forEach((e,t)=>r.uniform1i(s(e),t));let c=(e,t,i,a)=>{let o=new Image;o.onload=()=>{r.activeTexture(r.TEXTURE0+e),r.bindTexture(r.TEXTURE_2D,r.createTexture()),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,o),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.REPEAT),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.uniform1f(s(i),1),a?.(),n()},o.src=S+t},l=`waiting`;c(0,`earth-day-2k.jpg`,`uHasDay`,()=>l=`no`),c(2,`earth-water.jpg`,`uHasWater`),t&&c(1,`earth-clouds.jpg`,`uHasClouds`);let u=!1;return{paint(e,t,n,i=null,a=0){if(i&&!u&&(u=!0,c(3,`earth-night-4k.jpg`,`uHasNight`)),r.uniform1f(s(`uNightOn`),+!!i),i){let[e,t]=[i[0]*Math.PI/180,i[1]*Math.PI/180];r.uniform3f(s(`uSunGeo`),Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t))}l===`no`&&t*2>1150&&(l=`asked`,c(0,`earth-day-4k.jpg`,`uHasDay`)),r.viewport(0,0,e,e),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.uniform2f(s(`uCentre`),e/2,e/2),r.uniform1f(s(`uRadius`),t),r.uniform2f(s(`uTurn`),n[0]*Math.PI/180,n[1]*Math.PI/180),r.uniform1f(s(`uCloudTurn`),a*Math.PI/180),r.drawArrays(r.TRIANGLES,0,3)}}}function M(e){let r=n(e).Sun;return[((r.ra-t(e))%360+540)%360-180,r.dec]}function N({label:t,pins:n=[],active:c,focus:l,focusZoom:d,spin:f=!1,zoomable:p=!1,pan:m=`free`,clouds:h=!1,borders:g=!1,mark:_,start:v,peek:S,onOut:C,night:T,onPick:E,onPin:D,onHover:O}){let A=(0,y.useRef)(null),j=(0,y.useRef)(null),N=(0,y.useRef)(null),P=(0,y.useRef)(new Map),F=(0,y.useRef)({pins:n,spin:f,mark:_,onPick:E,onHover:O,onOut:C,night:T});F.current={pins:n,spin:f,mark:_,onPick:E,onHover:O,onOut:C,night:T};let I=(0,y.useRef)(null);(0,y.useEffect)(()=>{let e=N.current,t=e.getContext(`2d`),n=s().clipAngle(90).precision(.4),c=a(n,t),d=i(),f=matchMedia(`(prefers-reduced-motion: reduce)`).matches,m=null,_=0,y=1,b=v?k(v.zoom,1,x):1,C=l?[-l[1],-l[0]]:v?[-v.lon,k(-v.lat,-85,85)]:[-15,-24],T=0,E=null,D=null,O={vx:0,vy:0},L=0,R=!0,z=!0,B=performance.now(),V=0,H=0,U=re(j.current,h,()=>R=!0);w().then(e=>{m=e,R=!0});let W=()=>_/2*.84*b;S&&(S.current=()=>{let e=A.current.getBoundingClientRect();return{lat:-C[1],lon:((-C[0]+180)%360+360)%360-180,zoom:b,radiusPx:W(),cx:e.left+e.width/2,cy:e.top+e.height/2}});let G=()=>n.rotate(C).scale(W()).translate([_/2,_/2]);function ie(){let e=_/2,r=W();if(G(),U?.paint(Math.round(_*y),r*y,C,F.current.night?M(Date.now()):null,L),t.setTransform(y,0,0,y,0,0),t.clearRect(0,0,_,_),!U){let n=t.createRadialGradient(e-r*.35,e-r*.4,r*.1,e,e,r);n.addColorStop(0,`#4a94f5`),n.addColorStop(1,`#0e3a94`),t.fillStyle=n,t.beginPath(),c({type:`Sphere`}),t.fill(),m&&(t.beginPath(),c(m.land),t.fillStyle=`#ffc94d`,t.fill())}if((g||!U)&&(t.beginPath(),c(d),t.strokeStyle=`rgba(255, 255, 255, 0.13)`,t.lineWidth=.6,t.stroke(),m&&(t.beginPath(),c(m.borders),t.strokeStyle=U?`rgba(255, 255, 255, 0.5)`:`rgba(122, 78, 0, 0.55)`,t.lineWidth=.8,t.stroke())),F.current.night){let[e,r]=M(Date.now());if(!U){let n=[e>0?e-180:e+180,-r];for(let[e,r]of[[96,.16],[90,.42]])t.beginPath(),c(ee().center(n).radius(e)()),t.fillStyle=`rgba(3, 8, 28, ${r})`,t.fill()}let i=n([e,r]);i&&o([e,r],[-C[0],-C[1]])<Math.PI/2&&(t.beginPath(),t.arc(i[0],i[1],7,0,Math.PI*2),t.fillStyle=`#ffd36b`,t.shadowColor=`#ffd36b`,t.shadowBlur=14,t.fill(),t.shadowBlur=0)}let i=F.current.mark&&m?.countries.find(e=>e.properties.name===F.current.mark);i&&(t.beginPath(),c(i),t.fillStyle=`rgba(255, 201, 77, 0.5)`,t.fill(),t.strokeStyle=`#ffc94d`,t.lineWidth=1.6,t.stroke());let a=[-C[0],-C[1]];for(let e of F.current.pins){let t=P.current.get(e.id);if(!t)continue;let r=n([e.lon,e.lat]),i=o([e.lon,e.lat],a)<Math.PI/2-.04;t.hidden=!r||!i,r&&(t.style.transform=`translate(${r[0]}px, ${r[1]}px)`)}}function K(e){H=requestAnimationFrame(K);let t=Math.min(64,e-B);if(B=e,z&&_){if(E){let t=k((e-E.t0)/1200,0,1),n=t<.5?4*t*t*t:1-(-2*t+2)**3/2,[r,i]=E.at(n);C=[-r,-i],b=E.z0+(E.z1-E.z0)*n,t===1&&(E=null),R=!0}else if(Math.abs(O.vx)+Math.abs(O.vy)>.002){C=[C[0]+O.vx*t,k(C[1]+O.vy*t,-85,85)];let e=.975**(t/16.7);O={vx:O.vx*e,vy:O.vy*e},R=!0}else F.current.spin&&!D&&!f&&(C=[C[0]+t*.004,C[1]],L+=t*.004*.15,R=!0);R&&(R=!1,ie())}}I.current={fly(e,t,n=b){let r=k(n,1,x);f||!_?(C=[-t,-e],b=r,E=null):E={at:u([-C[0],-C[1]],[t,e]),t0:performance.now(),z0:b,z1:r},R=!0},zoomBy(e){b=k(b*e,1,x),R=!0},redraw(){R=!0}};let q=t=>{let n=e.getBoundingClientRect();return[t.clientX-n.left,t.clientY-n.top]},J=(e,t)=>{if(Math.hypot(e-_/2,t-_/2)>W())return null;let n=G().invert([e,t]);return n&&Number.isFinite(n[0])&&Number.isFinite(n[1])?n:null},ae=e=>m?.countries.find(t=>r(t,e))?.properties.name,Y=t=>{if(t.button)return;e.setPointerCapture(t.pointerId);let[n,r]=q(t);D={x:n,y:r,rot:[...C],moved:0,lx:n,ly:r,t:t.timeStamp,vx:0,vy:0},E=null,O={vx:0,vy:0}},X=e=>{let[t,n]=q(e);if(D){let r=t-D.x,i=n-D.y;D.moved=Math.max(D.moved,Math.hypot(r,i));let a=75/W();C=[D.rot[0]+r*a,k(D.rot[1]-i*a,-85,85)];let o=e.timeStamp-D.t;o>0&&(D.vx=D.vx*.5+(t-D.lx)*a/o*.5,D.vy=D.vy*.5+-(n-D.ly)*a/o*.5,D.lx=t,D.ly=n,D.t=e.timeStamp),R=!0}else if(F.current.onHover&&e.timeStamp-V>80){V=e.timeStamp;let r=J(t,n);F.current.onHover(r?{lat:r[1],lon:r[0],country:ae(r)}:null)}},Z=e=>{let t=D;if(D=null,t&&t.moved>6&&!f&&e.timeStamp-t.t<80){O={vx:t.vx,vy:t.vy};let e=Math.hypot(t.vx,t.vy);e>.15&&ne(`whoosh`),e>.6&&te(`flick`)}if(!t||t.moved>6)return;let n=J(...q(e));n&&F.current.onPick?.(n[1],n[0])},Q=()=>{D=null},$=()=>F.current.onHover?.(null),oe=e=>{if(p){if(e.preventDefault(),T=b===1&&e.deltaY>0?T+e.deltaY:0,T>500)return T=0,F.current.onOut?.();I.current.zoomBy(Math.exp(-e.deltaY*.0015))}},se=e=>{let t=12/b,n={ArrowLeft:[t,0],ArrowRight:[-t,0],ArrowUp:[0,-t],ArrowDown:[0,t]};if(n[e.key])C=[C[0]+n[e.key][0],k(C[1]+n[e.key][1],-85,85)],E=null,R=!0;else if(p&&(e.key===`+`||e.key===`=`))I.current.zoomBy(1.3);else if(p&&e.key===`-`)I.current.zoomBy(1/1.3);else if(e.key===`Enter`||e.key===` `)F.current.onPick?.(-C[1],-C[0]);else return;e.preventDefault()},ce=new ResizeObserver(()=>{_=A.current.clientWidth,y=Math.min(2,devicePixelRatio||1);let t=Math.round(_*y);e.width=e.height=t,j.current.width=j.current.height=t,R=!0});ce.observe(A.current);let le=new IntersectionObserver(([e])=>z=e.isIntersecting);le.observe(e),e.addEventListener(`pointerdown`,Y),e.addEventListener(`pointermove`,X),e.addEventListener(`pointerup`,Z),e.addEventListener(`pointercancel`,Q),e.addEventListener(`pointerleave`,$),e.addEventListener(`wheel`,oe,{passive:!1}),e.addEventListener(`keydown`,se);let ue=e=>{f||(O={vx:O.vx+(e.detail??1),vy:O.vy})};return addEventListener(`folio:spin`,ue),H=requestAnimationFrame(K),()=>{cancelAnimationFrame(H),ce.disconnect(),le.disconnect(),e.removeEventListener(`pointerdown`,Y),e.removeEventListener(`pointermove`,X),e.removeEventListener(`pointerup`,Z),e.removeEventListener(`pointercancel`,Q),e.removeEventListener(`pointerleave`,$),e.removeEventListener(`wheel`,oe),e.removeEventListener(`keydown`,se),removeEventListener(`folio:spin`,ue)}},[]);let[L,R]=l??[];return(0,y.useEffect)(()=>{L!==void 0&&R!==void 0&&I.current?.fly(L,R,d)},[L,R]),(0,y.useEffect)(()=>I.current?.redraw(),[n,c,_,T]),(0,b.jsxs)(`div`,{className:`globe`,ref:A,"data-pan":m,children:[(0,b.jsx)(`canvas`,{ref:j,"aria-hidden":`true`}),(0,b.jsx)(`canvas`,{ref:N,className:`globe-ink`,tabIndex:0,role:`img`,"aria-label":`${t}. Drag or use the arrow keys to turn it.`}),n.map(e=>(0,b.jsx)(`button`,{ref:t=>{t?P.current.set(e.id,t):P.current.delete(e.id)},className:`pin`,"data-kind":e.kind,"data-active":e.id===c||void 0,"data-label":e.label,"aria-label":e.label,onClick:()=>D?.(e.id),hidden:!0},e.id)),p&&(0,b.jsxs)(`div`,{className:`globe-zoom`,children:[(0,b.jsx)(`button`,{onClick:()=>I.current?.zoomBy(1.4),"aria-label":e(`Zoom in`),children:`+`}),(0,b.jsx)(`button`,{onClick:()=>I.current?.zoomBy(1/1.4),"aria-label":e(`Zoom out`),children:`−`})]})]})}export{O as countryAt,D as countryList,N as default,E as randomPlace,M as subsolar,T as worldShapes};