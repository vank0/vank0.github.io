var e=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`);function t(t){let n=t.points.map(e=>{let n=new Date(t.startedAt+e.t*1e3).toISOString(),r=e.alt==null?``:`\n        <ele>${e.alt}</ele>`;return`      <trkpt lat="${e.lat}" lon="${e.lon}">${r}\n        <time>${n}</time>\n      </trkpt>`}).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="FORTIVS" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${e(t.name)}</name>
    <trkseg>
${n}
    </trkseg>
  </trk>
</gpx>
`}export{t as toGpx};