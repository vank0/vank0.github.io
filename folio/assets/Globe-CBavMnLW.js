import{d as e,h as t}from"./i18n-DQ_Dan4i.js";import{n,s as r}from"./sky-CdJMLuKy.js";import{c as i,d as a,f as o,l as s,m as c,n as l,o as u,p as ee,r as d,s as te,t as f}from"./countries-110m-BYrHn7Xh.js";import{lt as ne}from"./index-BJjkkzDW.js";import{a as re}from"./sound-DC1Ld_xc.js";import{t as p}from"./jsx-runtime-Dw_NFuYc.js";function m(e,t){var n={},r={},i={},a=[],o=-1;t.forEach(function(n,r){var i=e.arcs[n<0?~n:n],a;i.length<3&&!i[1][0]&&!i[1][1]&&(a=t[++o],t[o]=n,t[r]=a)}),t.forEach(function(e){var t=s(e),n=t[0],a=t[1],o,c;if(o=i[n]){if(delete i[o.end],o.push(e),o.end=a,c=r[a]){delete r[c.start];var l=c===o?o:o.concat(c);r[l.start=o.start]=i[l.end=c.end]=l}else r[o.start]=i[o.end]=o}else if(o=r[a]){if(delete r[o.start],o.unshift(e),o.start=n,c=i[n]){delete i[c.end];var u=c===o?o:c.concat(o);r[u.start=c.start]=i[u.end=o.end]=u}else r[o.start]=i[o.end]=o}else o=[e],r[o.start=n]=i[o.end=a]=o});function s(t){var n=e.arcs[t<0?~t:t],r=n[0],i;return e.transform?(i=[0,0],n.forEach(function(e){i[0]+=e[0],i[1]+=e[1]})):i=n[n.length-1],t<0?[i,r]:[r,i]}function c(e,t){for(var r in e){var i=e[r];delete t[i.start],delete i.start,delete i.end,i.forEach(function(e){n[e<0?~e:e]=1}),a.push(i)}}return c(i,r),c(r,i),t.forEach(function(e){n[e<0?~e:e]||a.push([e])}),a}function h(e){return d(e,g.apply(this,arguments))}function g(e,t,n){var r,i,a;if(arguments.length>1)r=_(e,t,n);else for(i=0,r=Array(a=e.arcs.length);i<a;++i)r[i]=i;return{type:`MultiLineString`,arcs:m(e,r)}}function _(e,t,n){var r=[],i=[],a;function o(e){var t=e<0?~e:e;(i[t]||(i[t]=[])).push({i:e,g:a})}function s(e){e.forEach(o)}function c(e){e.forEach(s)}function l(e){e.forEach(c)}function u(e){switch(a=e,e.type){case`GeometryCollection`:e.geometries.forEach(u);break;case`LineString`:s(e.arcs);break;case`MultiLineString`:case`Polygon`:c(e.arcs);break;case`MultiPolygon`:l(e.arcs)}}return u(t),i.forEach(n==null?function(e){r.push(e[0].i)}:function(e){n(e[0].g,e[e.length-1].g)&&r.push(e[0].i)}),r}var v=t(),y=p(),b=4,x=`./textures/`,S,C=()=>S??=fetch(f).then(e=>e.json()).then(e=>({land:l(e,e.objects.land),borders:h(e,e.objects.countries,(e,t)=>e!==t),countries:l(e,e.objects.countries).features})),w=()=>C().then(e=>e.countries);async function T(){let{countries:e}=await C(),[t,n]=u(e[Math.floor(Math.random()*e.length)]);return[n+(Math.random()-.5)*3,t+(Math.random()-.5)*3]}async function E(){let{countries:e}=await C();return e.map(e=>{let[t,n]=u(e);return{name:e.properties.name,lat:n,lon:t}})}async function D(e,t){let{countries:n}=await C();return n.find(n=>i(n,[t,e]))?.properties.name}var O=(e,t,n)=>Math.max(t,Math.min(n,e)),k=`#version 300 es
in vec2 corner;
void main() { gl_Position = vec4(corner, 0.0, 1.0); }`,A=`#version 300 es
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
}`;function ie(e,t,n){let r=e.getContext(`webgl2`,{antialias:!1,premultipliedAlpha:!0});if(!r)return null;let i=(e,t)=>{let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)||console.error(`Globe shader:`,r.getShaderInfoLog(n)),n},a=r.createProgram();if(r.attachShader(a,i(r.VERTEX_SHADER,k)),r.attachShader(a,i(r.FRAGMENT_SHADER,A)),r.linkProgram(a),!r.getProgramParameter(a,r.LINK_STATUS))return null;r.useProgram(a),r.bindBuffer(r.ARRAY_BUFFER,r.createBuffer()),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let o=r.getAttribLocation(a,`corner`);r.enableVertexAttribArray(o),r.vertexAttribPointer(o,2,r.FLOAT,!1,0,0),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA);let s=e=>r.getUniformLocation(a,e);[`uDay`,`uClouds`,`uWater`,`uNight`].forEach((e,t)=>r.uniform1i(s(e),t));let c=(e,t,i,a)=>{let o=new Image;o.onload=()=>{r.activeTexture(r.TEXTURE0+e),r.bindTexture(r.TEXTURE_2D,r.createTexture()),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,o),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.REPEAT),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.uniform1f(s(i),1),a?.(),n()},o.src=x+t},l=`waiting`;c(0,`earth-day-2k.jpg`,`uHasDay`,()=>l=`no`),c(2,`earth-water.jpg`,`uHasWater`),t&&c(1,`earth-clouds.jpg`,`uHasClouds`);let u=!1;return{paint(e,t,n,i=null,a=0){if(i&&!u&&(u=!0,c(3,`earth-night-4k.jpg`,`uHasNight`)),r.uniform1f(s(`uNightOn`),+!!i),i){let[e,t]=[i[0]*Math.PI/180,i[1]*Math.PI/180];r.uniform3f(s(`uSunGeo`),Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t))}l===`no`&&t*2>1150&&(l=`asked`,c(0,`earth-day-4k.jpg`,`uHasDay`)),r.viewport(0,0,e,e),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.uniform2f(s(`uCentre`),e/2,e/2),r.uniform1f(s(`uRadius`),t),r.uniform2f(s(`uTurn`),n[0]*Math.PI/180,n[1]*Math.PI/180),r.uniform1f(s(`uCloudTurn`),a*Math.PI/180),r.drawArrays(r.TRIANGLES,0,3)}}}function j(e){let t=r(e).Sun;return[((t.ra-n(e))%360+540)%360-180,t.dec]}function M({label:t,pins:n=[],active:r,focus:l,focusZoom:u,spin:d=!1,zoomable:f=!1,pan:p=`free`,clouds:m=!1,borders:h=!1,mark:g,start:_,peek:x,onOut:S,night:w,onPick:T,onPin:E,onHover:D}){let k=(0,v.useRef)(null),A=(0,v.useRef)(null),M=(0,v.useRef)(null),N=(0,v.useRef)(new Map),P=(0,v.useRef)({pins:n,spin:d,mark:g,onPick:T,onHover:D,onOut:S,night:w});P.current={pins:n,spin:d,mark:g,onPick:T,onHover:D,onOut:S,night:w};let F=(0,v.useRef)(null);(0,v.useEffect)(()=>{let e=M.current,t=e.getContext(`2d`),n=c().clipAngle(90).precision(.4),r=o(n,t),u=a(),d=matchMedia(`(prefers-reduced-motion: reduce)`).matches,p=null,g=0,v=1,y=_?O(_.zoom,1,b):1,S=l?[-l[1],-l[0]]:_?[-_.lon,O(-_.lat,-85,85)]:[-15,-24],w=0,T=null,E=null,D={vx:0,vy:0},I=0,L=!0,R=!0,z=performance.now(),B=0,V=0,H=ie(A.current,m,()=>L=!0);C().then(e=>{p=e,L=!0});let U=()=>g/2*.84*y;x&&(x.current=()=>{let e=k.current.getBoundingClientRect();return{lat:-S[1],lon:((-S[0]+180)%360+360)%360-180,zoom:y,radiusPx:U(),cx:e.left+e.width/2,cy:e.top+e.height/2}});let W=()=>n.rotate(S).scale(U()).translate([g/2,g/2]);function ae(){let e=g/2,i=U();if(W(),H?.paint(Math.round(g*v),i*v,S,P.current.night?j(Date.now()):null,I),t.setTransform(v,0,0,v,0,0),t.clearRect(0,0,g,g),!H){let n=t.createRadialGradient(e-i*.35,e-i*.4,i*.1,e,e,i);n.addColorStop(0,`#4a94f5`),n.addColorStop(1,`#0e3a94`),t.fillStyle=n,t.beginPath(),r({type:`Sphere`}),t.fill(),p&&(t.beginPath(),r(p.land),t.fillStyle=`#ffc94d`,t.fill())}if((h||!H)&&(t.beginPath(),r(u),t.strokeStyle=`rgba(255, 255, 255, 0.13)`,t.lineWidth=.6,t.stroke(),p&&(t.beginPath(),r(p.borders),t.strokeStyle=H?`rgba(255, 255, 255, 0.5)`:`rgba(122, 78, 0, 0.55)`,t.lineWidth=.8,t.stroke())),P.current.night){let[e,i]=j(Date.now());if(!H){let n=[e>0?e-180:e+180,-i];for(let[e,i]of[[96,.16],[90,.42]])t.beginPath(),r(te().center(n).radius(e)()),t.fillStyle=`rgba(3, 8, 28, ${i})`,t.fill()}let a=n([e,i]);a&&s([e,i],[-S[0],-S[1]])<Math.PI/2&&(t.beginPath(),t.arc(a[0],a[1],7,0,Math.PI*2),t.fillStyle=`#ffd36b`,t.shadowColor=`#ffd36b`,t.shadowBlur=14,t.fill(),t.shadowBlur=0)}let a=P.current.mark&&p?.countries.find(e=>e.properties.name===P.current.mark);a&&(t.beginPath(),r(a),t.fillStyle=`rgba(255, 201, 77, 0.5)`,t.fill(),t.strokeStyle=`#ffc94d`,t.lineWidth=1.6,t.stroke());let o=[-S[0],-S[1]];for(let e of P.current.pins){let t=N.current.get(e.id);if(!t)continue;let r=n([e.lon,e.lat]),i=s([e.lon,e.lat],o)<Math.PI/2-.04;t.hidden=!r||!i,r&&(t.style.transform=`translate(${r[0]}px, ${r[1]}px)`)}}function G(e){V=requestAnimationFrame(G);let t=Math.min(64,e-z);if(z=e,R&&g){if(T){let t=O((e-T.t0)/1200,0,1),n=t<.5?4*t*t*t:1-(-2*t+2)**3/2,[r,i]=T.at(n);S=[-r,-i],y=T.z0+(T.z1-T.z0)*n,t===1&&(T=null),L=!0}else if(Math.abs(D.vx)+Math.abs(D.vy)>.002){S=[S[0]+D.vx*t,O(S[1]+D.vy*t,-85,85)];let e=.975**(t/16.7);D={vx:D.vx*e,vy:D.vy*e},L=!0}else P.current.spin&&!E&&!d&&(S=[S[0]+t*.004,S[1]],I+=t*.004*.15,L=!0);L&&(L=!1,ae())}}F.current={fly(e,t,n=y){let r=O(n,1,b);d||!g?(S=[-t,-e],y=r,T=null):T={at:ee([-S[0],-S[1]],[t,e]),t0:performance.now(),z0:y,z1:r},L=!0},zoomBy(e){y=O(y*e,1,b),L=!0},redraw(){L=!0}};let K=t=>{let n=e.getBoundingClientRect();return[t.clientX-n.left,t.clientY-n.top]},q=(e,t)=>{if(Math.hypot(e-g/2,t-g/2)>U())return null;let n=W().invert([e,t]);return n&&Number.isFinite(n[0])&&Number.isFinite(n[1])?n:null},oe=e=>p?.countries.find(t=>i(t,e))?.properties.name,J=t=>{if(t.button)return;e.setPointerCapture(t.pointerId);let[n,r]=K(t);E={x:n,y:r,rot:[...S],moved:0,lx:n,ly:r,t:t.timeStamp,vx:0,vy:0},T=null,D={vx:0,vy:0}},Y=e=>{let[t,n]=K(e);if(E){let r=t-E.x,i=n-E.y;E.moved=Math.max(E.moved,Math.hypot(r,i));let a=75/U();S=[E.rot[0]+r*a,O(E.rot[1]-i*a,-85,85)];let o=e.timeStamp-E.t;o>0&&(E.vx=E.vx*.5+(t-E.lx)*a/o*.5,E.vy=E.vy*.5+-(n-E.ly)*a/o*.5,E.lx=t,E.ly=n,E.t=e.timeStamp),L=!0}else if(P.current.onHover&&e.timeStamp-B>80){B=e.timeStamp;let r=q(t,n);P.current.onHover(r?{lat:r[1],lon:r[0],country:oe(r)}:null)}},X=e=>{let t=E;if(E=null,t&&t.moved>6&&!d&&e.timeStamp-t.t<80){D={vx:t.vx,vy:t.vy};let e=Math.hypot(t.vx,t.vy);e>.15&&re(`whoosh`),e>.6&&ne(`flick`)}if(!t||t.moved>6)return;let n=q(...K(e));n&&P.current.onPick?.(n[1],n[0])},Z=()=>{E=null},Q=()=>P.current.onHover?.(null),$=e=>{if(f){if(e.preventDefault(),w=y===1&&e.deltaY>0?w+e.deltaY:0,w>500)return w=0,P.current.onOut?.();F.current.zoomBy(Math.exp(-e.deltaY*.0015))}},se=e=>{let t=12/y,n={ArrowLeft:[t,0],ArrowRight:[-t,0],ArrowUp:[0,-t],ArrowDown:[0,t]};if(n[e.key])S=[S[0]+n[e.key][0],O(S[1]+n[e.key][1],-85,85)],T=null,L=!0;else if(f&&(e.key===`+`||e.key===`=`))F.current.zoomBy(1.3);else if(f&&e.key===`-`)F.current.zoomBy(1/1.3);else if(e.key===`Enter`||e.key===` `)P.current.onPick?.(-S[1],-S[0]);else return;e.preventDefault()},ce=new ResizeObserver(()=>{g=k.current.clientWidth,v=Math.min(2,devicePixelRatio||1);let t=Math.round(g*v);e.width=e.height=t,A.current.width=A.current.height=t,L=!0});ce.observe(k.current);let le=new IntersectionObserver(([e])=>R=e.isIntersecting);le.observe(e),e.addEventListener(`pointerdown`,J),e.addEventListener(`pointermove`,Y),e.addEventListener(`pointerup`,X),e.addEventListener(`pointercancel`,Z),e.addEventListener(`pointerleave`,Q),e.addEventListener(`wheel`,$,{passive:!1}),e.addEventListener(`keydown`,se);let ue=e=>{d||(D={vx:D.vx+(e.detail??1),vy:D.vy})};return addEventListener(`folio:spin`,ue),V=requestAnimationFrame(G),()=>{cancelAnimationFrame(V),ce.disconnect(),le.disconnect(),e.removeEventListener(`pointerdown`,J),e.removeEventListener(`pointermove`,Y),e.removeEventListener(`pointerup`,X),e.removeEventListener(`pointercancel`,Z),e.removeEventListener(`pointerleave`,Q),e.removeEventListener(`wheel`,$),e.removeEventListener(`keydown`,se),removeEventListener(`folio:spin`,ue)}},[]);let[I,L]=l??[];return(0,v.useEffect)(()=>{I!==void 0&&L!==void 0&&F.current?.fly(I,L,u)},[I,L]),(0,v.useEffect)(()=>F.current?.redraw(),[n,r,g,w]),(0,y.jsxs)(`div`,{className:`globe`,ref:k,"data-pan":p,children:[(0,y.jsx)(`canvas`,{ref:A,"aria-hidden":`true`}),(0,y.jsx)(`canvas`,{ref:M,className:`globe-ink`,tabIndex:0,role:`img`,"aria-label":`${t}. Drag or use the arrow keys to turn it.`}),n.map(e=>(0,y.jsx)(`button`,{ref:t=>{t?N.current.set(e.id,t):N.current.delete(e.id)},className:`pin`,"data-kind":e.kind,"data-active":e.id===r||void 0,"data-label":e.label,"aria-label":e.label,onClick:()=>E?.(e.id),hidden:!0},e.id)),f&&(0,y.jsxs)(`div`,{className:`globe-zoom`,children:[(0,y.jsx)(`button`,{onClick:()=>F.current?.zoomBy(1.4),"aria-label":e(`Zoom in`),children:`+`}),(0,y.jsx)(`button`,{onClick:()=>F.current?.zoomBy(1/1.4),"aria-label":e(`Zoom out`),children:`−`})]})]})}export{D as countryAt,E as countryList,M as default,T as randomPlace,j as subsolar,w as worldShapes};