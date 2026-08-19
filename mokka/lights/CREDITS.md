# Пиктограмите на лампите от таблото

Свалени от [Wikimedia Commons, категория „Dashboard SVG icons“](https://commons.wikimedia.org/wiki/Category:Dashboard_SVG_icons)
и изчистени само от metadata — формите и стиловете са както в оригинала.

| файл | оригинал | автор | лиценз |
|---|---|---|---|
| oil.svg | Kontrollleuchte Oeldruck.svg | Chris828 | Public domain |
| charge.svg | Kontrollleuchte Generator.svg | Chris828 | Public domain |
| brake.svg | Kontrollleuchte Parkbremse.svg | Chris828 | Public domain |
| airbag.svg | Kontrollleuchte Airbag.svg | Chris828 | Copyrighted free use |
| mil.svg | Motorkontrollleuchte.svg | Chris828 | Public domain |
| tpms.svg | Warnlampe Druckverlust.svg | Chris828 | Copyrighted free use |
| abs.svg | Antilock Braking System.svg | Chris828 | Public domain |
| steering.svg | Kontrollleuchte Lenkhilfe.svg | Chris828 | CC0 |
| esp.svg | Kontrollleuchte ESP.svg | Chris828 | Public domain |

Нула CC BY-SA файлове: ISO серията на Commons (B01 Brake failure, B05 ABS…) е
CC BY-SA 3.0, тоест копилефт — не влиза в това repo.

`steering.svg` носи два варианта един до друг в един файл; viewBox-ът в
`src/components/lightPaths.ts` е свит до левия.

Гаечният ключ („Уговорете обслужване“) НЕ идва оттам — в категорията няма такъв
символ; той е начертан в `src/components/LightIcon.tsx`.

Рисунките от самия ISO 2575 не са ползвани — стандартът е платен.
