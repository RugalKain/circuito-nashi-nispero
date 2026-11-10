# Instrucciones para Claude Code

Proyecto: sitio informativo estático del fraccionamiento Circuito Nashi-Nispero,
bajo la marca Vortix Tecnologías. Se publica con GitHub Pages.

## Reglas
- Solo HTML, CSS y JavaScript sin dependencias ni build (sin npm, sin frameworks).
- El sitio debe funcionar abriendo `index.html` directo (file://): los datos van en
  `data/*.js` como `window.X = {...}`, no en JSON con fetch.
- El contenido vive en `data/`; la lógica de render en `assets/js/pages.js`;
  encabezado y menú en `assets/js/layout.js`.
- Para una página nueva: crear el `.html` copiando uno existente con su `data-page`,
  registrarla en `PAGINAS` (layout.js) y agregar su renderer en `rutas` (pages.js).
- Todo texto que venga de `data/` se pasa por `esc()` antes de insertarlo en HTML.
- El sitio no realiza operaciones: sin formularios que envíen datos, sin pagos.
- Nunca agregar datos de contacto personales de residentes.
- Textos de la interfaz en español de México.
