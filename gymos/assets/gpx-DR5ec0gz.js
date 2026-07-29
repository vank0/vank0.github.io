const o=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function a(t){const n=t.points.map(e=>{const r=new Date(t.startedAt+e.t*1e3).toISOString(),l=e.alt!=null?`
        <ele>${e.alt}</ele>`:"";return`      <trkpt lat="${e.lat}" lon="${e.lon}">${l}
        <time>${r}</time>
      </trkpt>`}).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="GymOS" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${o(t.name)}</name>
    <trkseg>
${n}
    </trkseg>
  </trk>
</gpx>
`}export{a as toGpx};
