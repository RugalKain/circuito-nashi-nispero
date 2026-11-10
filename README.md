# Circuito Nashi-Nispero — Sitio informativo

Sitio estático (HTML, CSS y JavaScript, sin servidor) con la información importante del
fraccionamiento. Se publica gratis con GitHub Pages.

Desarrollado por **Vortix Tecnologías**.

## Estructura

```
index.html          Inicio / bienvenida, cuota y avisos
domicilios.html     Estatus de registro de cada domicilio
porton.html         Proyecto del nuevo portón (fotos y avance)
malla.html          Proyecto de malla del campo de fútbol infantil
guardias.html       Guardias, turnos y teléfono de la caseta
servicios.html      Servicios adicionales y su costo
data/               ← AQUÍ SE ACTUALIZA LA INFORMACIÓN
img/porton/         Fotos del portón
img/malla/          Fotos de la malla
assets/             Estilos y lógica (normalmente no hace falta tocarlos)
```

## Cómo actualizar la información

Todo el contenido está en `data/*.js`. Edita el texto entre comillas y guarda.

- **Agregar una foto:** súbela a `img/porton/` (o `img/malla/`) y agrégala en
  `data/proyectos.js` → `fotos: [{ src: "img/porton/foto.jpg", pie: "Descripción" }]`.
  Recomendado: JPG de menos de 500 KB.
- **Cambiar estatus de un domicilio:** en `data/domicilios.js`, cambia `estatus`.
- **Agregar un aviso:** en `data/sitio.js`, agrega un elemento al inicio de `avisos`.
- Actualiza `ultimaActualizacion` en `data/sitio.js` cada vez que publiques cambios.

## Ver el sitio en tu computadora

Abre `index.html` con doble clic. Funciona sin servidor porque los datos se cargan como
archivos `.js`.

## Publicar en GitHub Pages

1. Crea un repositorio **público** en GitHub (ej. `circuito-nashi-nispero`).
2. Sube los archivos:
   ```bash
   git init
   git add .
   git commit -m "Primera versión del sitio"
   git branch -M main
   git remote add origin https://github.com/USUARIO/circuito-nashi-nispero.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   rama `main`, carpeta `/ (root)`.
4. En uno o dos minutos el sitio queda en `https://USUARIO.github.io/circuito-nashi-nispero/`.

## Transferir al fraccionamiento

Cuando exista una cuenta de GitHub del fraccionamiento:
**Settings → General → Danger Zone → Transfer ownership**. GitHub redirige la URL anterior
del repositorio, pero la URL de Pages cambia a `https://CUENTA-NUEVA.github.io/...`.

## Privacidad

- No publicar nombres de residentes, teléfonos personales ni correos.
- El teléfono de guardias es el de la caseta.
- Publicar nombres de guardias solo con su autorización.
- Revisar que las fotos no muestren placas de autos, caras de niños o interiores de casas.
