# Earth textures

From Solar System Scope, https://www.solarsystemscope.com/textures/, licensed under Creative
Commons Attribution 4.0 International (CC BY 4.0); based on NASA imagery. Copied from the
sky clock project (`~/web-clock/public/textures`), which keeps the originals.

- `earth-day-2k.jpg` (2048 × 1024): the surface. Loaded first.
- `earth-day-4k.jpg` (4096 × 2048): the same, loaded only when the globe is drawn large.
- `earth-clouds.jpg` (1024 × 512): cloud layer, scaled down and recompressed from the 2K map
  (`sips -Z 1024 -s formatOptions 62`). A fixed picture, not today's weather.
- `earth-water.jpg` (1024 × 512): where the sea is, for sun glint. From the 2K specular map.

The licence asks for credit: the app shows it under the atlas and at the foot of the home page.

# Planets, the Moon, the Sun and the Milky Way (the Space view)

From the same source and under the same licence (Solar System Scope, CC BY 4.0, based on NASA
imagery), copied from `~/web-clock/public/textures`. Each is fetched only when its body is drawn
large enough to need it.

- `2k_sun.jpg`, `2k_mercury.jpg`, `2k_venus_atmosphere.jpg` (Venus as you'd see it: its clouds),
  `2k_mars.jpg`, `2k_jupiter.jpg`, `2k_saturn.jpg`, `2k_uranus.jpg`, `2k_neptune.jpg`, `2k_moon.jpg`:
  equirectangular, longitude 0 in the middle, east to the right, north at the top.
- `2k_saturn_ring_alpha.png`: Saturn's rings from 1.236 to 2.327 planet radii, inner edge on the left.
- `4k_stars_milky_way.jpg`: the Milky Way in galactic coordinates (centre in the middle, longitude
  running left), scaled down from the 8K original.
- `moon-512.jpg` (512 × 256): `2k_moon.jpg` scaled down (`sips -Z 512 -s formatOptions 72`), for the
  small Moon pictures of tonight's phase (`src/MoonPhoto.tsx`), drawn on cards across the app.

The Space view credits them under the picture.

## Living sources (fetched while reading, credited beside each)

- The Sun this hour: NASA Solar Dynamics Observatory (public domain).
- The Earth from space: NASA EPIC camera, DSCOVR (public domain).
- Pictures from space: NASA Image and Video Library (public domain).
- Space weather: NOAA Space Weather Prediction Center (public domain).
- Earthquakes: US Geological Survey (public domain). Natural events: NASA EONET (public domain).
- Space Station position: wheretheiss.at. People in space: corquaid's ISS APIs.
- Weather at a point: Open-Meteo (CC BY 4.0).
- Creatures near a point: iNaturalist observers, photos CC0 / CC BY / CC BY-SA, credited on each.
- Themed places on the Atlas: Wikidata (CC0).
- `earth-night-2k.jpg`: the Earth's city lights, Solar System Scope (CC BY 4.0), based on NASA's Black Marble.
- `earth-night-4k.jpg`: the Earth's city lights at 4K, Solar System Scope (CC BY 4.0), based on NASA's Black Marble; the same map the web clock uses.
