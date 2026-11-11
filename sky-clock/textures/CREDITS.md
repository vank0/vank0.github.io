# Textures

From Solar System Scope, https://www.solarsystemscope.com/textures/, licensed under Creative
Commons Attribution 4.0 International (CC BY 4.0); based on NASA imagery. The Earth view
(earth.js) loads:

- `2k_earth_daymap.jpg`, `2k_earth_nightmap.jpg`, `2k_earth_clouds.jpg`: the surface by day,
  the city lights by night, and a cloud layer (a fixed picture, not today's weather)
- `2k_earth_specular_map.png`: sunglint on water, converted from the published TIFF
  (`sips -s format png`), which browsers can't load
- `2k_moon.jpg`: the Moon
- `4k_earth_daymap.jpg`, `4k_earth_nightmap.jpg`, `4k_earth_clouds.jpg`, `4k_earth_specular_map.jpg`: the same Earth maps at 4K, scaled down from the 8K originals (`sips -Z 4096`); loaded only when the Earth is drawn large on a high-resolution screen
- `2k_sun.jpg`, `2k_mercury.jpg`, `2k_venus_atmosphere.jpg` (Venus as you'd see it: its cloud deck), `2k_mars.jpg`, `2k_jupiter.jpg`, `2k_saturn.jpg` with `2k_saturn_ring_alpha.png` (the rings, 74,500 to 140,200 km out; the Cassini gap falls where it should), `2k_uranus.jpg`, `2k_neptune.jpg`: the Sun and planets, as globes in the space view once they're more than a few pixels across
- `4k_stars_milky_way.jpg`: the Milky Way, scaled down from the 8K original
  (`sips -Z 4096`); it is in galactic coordinates, centre in the middle, longitude running
  left and the south galactic pole at the top (checked against the Magellanic Clouds)

The originals and unused copies (TIFFs, every 8K map, the 2K Milky Way, the 4K Venus clouds,
the Venus surface) are kept out of git and out of the deploy.
Each layer switches on as its file loads; without them the globe is plain blue.
