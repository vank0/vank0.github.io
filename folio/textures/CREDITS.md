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
