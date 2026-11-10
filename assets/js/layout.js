// Encabezado, navegación y pie de página compartidos por todas las páginas.
(function () {
  const PAGINAS = [
    { id: "inicio",     href: "index.html",      texto: "Inicio" },
    { id: "domicilios", href: "domicilios.html", texto: "Domicilios" },
    { id: "porton",     href: "porton.html",     texto: "Portón" },
    { id: "malla",      href: "malla.html",      texto: "Campo de fútbol" },
    { id: "guardias",   href: "guardias.html",   texto: "Guardias" },
    { id: "servicios",  href: "servicios.html",  texto: "Servicios" }
  ];
  window.PAGINAS = PAGINAS;

  const actual = document.body.dataset.page;
  const nombre = (window.SITIO && window.SITIO.nombre) || "Fraccionamiento";

  document.getElementById("header").innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="index.html">${nombre}</a>
      <button class="menu-btn" aria-label="Abrir menú" aria-expanded="false">☰</button>
      <nav>
        ${PAGINAS.map(p =>
          `<a href="${p.href}"${p.id === actual ? ' class="active" aria-current="page"' : ""}>${p.texto}</a>`
        ).join("")}
      </nav>
    </div>`;

  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector("#header nav");
  btn.addEventListener("click", () => {
    const abierto = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", abierto);
  });

  const act = window.SITIO && window.SITIO.ultimaActualizacion;
  document.getElementById("footer").innerHTML = `
    <div class="container footer-inner">
      <span>Sitio informativo del fraccionamiento ${nombre}.${act ? " Última actualización: " + act + "." : ""}</span>
      <span>Desarrollado por <strong>Vortix Tecnologías</strong></span>
    </div>`;
})();
