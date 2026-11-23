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

The Space view credits them under the picture.
