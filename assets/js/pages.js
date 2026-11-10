// Renderiza el contenido de cada página a partir de los archivos en /data.
(function () {
  const $content = document.getElementById("content");

  // Escapa texto para evitar que contenido de los datos rompa el HTML.
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const dinero = (n) =>
    n == null ? "Por definir"
      : Number(n).toLocaleString("es-MX", { style: "currency", currency: "MXN" });

  const fecha = (iso) => {
    if (!iso) return "";
    const [a, m, d] = iso.split("-").map(Number);
    return new Date(a, m - 1, d).toLocaleDateString("es-MX",
      { day: "numeric", month: "long", year: "numeric" });
  };

  // ---------- Inicio ----------
  function inicio() {
    const s = window.SITIO;
    const tarjetas = window.PAGINAS.filter(p => p.id !== "inicio");
    $content.innerHTML = `
      <section class="hero">
        <h1>Bienvenidos a ${esc(s.nombre)}</h1>
        <p>${esc(s.bienvenida)}</p>
      </section>

      <section class="grid-2">
        <div class="card">
          <h2>Cuota de mantenimiento</h2>
          <p class="big">${dinero(s.cuota.monto)} <small>${esc(s.cuota.periodicidad)}</small></p>
          ${s.cuota.nota ? `<p class="muted">${esc(s.cuota.nota)}</p>` : ""}
        </div>
        <div class="card">
          <h2>Avisos</h2>
          ${s.avisos.length ? s.avisos.map(a => `
            <article class="aviso">
              <time>${fecha(a.fecha)}</time>
              <h3>${esc(a.titulo)}</h3>
              <p>${esc(a.texto)}</p>
            </article>`).join("") : "<p class='muted'>Sin avisos por ahora.</p>"}
        </div>
      </section>

      <section>
        <h2>Secciones</h2>
        <div class="grid-cards">
          ${tarjetas.map(p => `<a class="card link-card" href="${p.href}">${esc(p.texto)} →</a>`).join("")}
        </div>
      </section>`;
  }

  // ---------- Domicilios ----------
  function domicilios() {
    const { estatus, lista } = window.DOMICILIOS;
    const conteo = {};
    lista.forEach(d => conteo[d.estatus] = (conteo[d.estatus] || 0) + 1);
    const pct = lista.length ? Math.round(((conteo.registrado || 0) / lista.length) * 100) : 0;

    $content.innerHTML = `
      <h1>Domicilios</h1>
      <p>Estatus de registro de cada domicilio en el grupo del fraccionamiento.
         No se publican datos de contacto.</p>

      <div class="card">
        <p class="big">${pct}% <small>de los domicilios registrados (${conteo.registrado || 0} de ${lista.length})</small></p>
        <div class="progress"><span style="width:${pct}%"></span></div>
        <div class="chips">
          <button class="chip active" data-filtro="">Todos (${lista.length})</button>
          ${Object.entries(estatus).map(([k, e]) =>
            `<button class="chip" data-filtro="${k}"><i class="dot ${e.clase}"></i>${esc(e.etiqueta)} (${conteo[k] || 0})</button>`
          ).join("")}
        </div>
        <input id="buscar" type="search" placeholder="Buscar número de domicilio…" inputmode="numeric">
      </div>

      <div id="lista" class="casas"></div>`;

    let filtro = "", texto = "";
    const $lista = document.getElementById("lista");

    function pintar() {
      const visibles = lista.filter(d =>
        (!filtro || d.estatus === filtro) && String(d.numero).includes(texto));
      $lista.innerHTML = visibles.length ? visibles.map(d => {
        const e = estatus[d.estatus] || { etiqueta: d.estatus, clase: "muted" };
        return `<div class="casa ${e.clase}"><strong>${esc(d.numero)}</strong><span>${esc(e.etiqueta)}</span></div>`;
      }).join("") : "<p class='muted'>Sin resultados.</p>";
    }

    $content.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => {
      $content.querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      filtro = b.dataset.filtro;
      pintar();
    }));
    document.getElementById("buscar").addEventListener("input", e => {
      texto = e.target.value.trim();
      pintar();
    });
    pintar();
  }

  // ---------- Proyectos (portón / malla) ----------
  function proyecto(clave) {
    const p = window.PROYECTOS[clave];
    $content.innerHTML = `
      <h1>${esc(p.titulo)}</h1>
      <p><span class="badge">${esc(p.estado)}</span></p>
      <p>${esc(p.descripcion)}</p>

      <div class="grid-2">
        <div class="card">
          <h2>Costo estimado</h2>
          <p class="big">${dinero(p.costoEstimado)}</p>
        </div>
        <div class="card">
          <h2>Avance</h2>
          <ol class="timeline">
            ${p.avance.map(a => `<li><time>${fecha(a.fecha)}</time> ${esc(a.texto)}</li>`).join("")}
          </ol>
        </div>
      </div>

      <h2>Fotos</h2>
      ${p.fotos.length ? `
        <div class="galeria">
          ${p.fotos.map(f => `
            <figure>
              <a href="${esc(f.src)}" target="_blank" rel="noopener">
                <img src="${esc(f.src)}" alt="${esc(f.pie)}" loading="lazy"
                     onerror="this.closest('figure').classList.add('rota')">
              </a>
              <figcaption>${esc(f.pie)}</figcaption>
            </figure>`).join("")}
        </div>` : "<p class='muted'>Aún no hay fotos de este proyecto.</p>"}`;
  }

  // ---------- Guardias ----------
  function guardias() {
    const g = window.GUARDIAS;
    const tel = String(g.telefonoCaseta).replace(/\D/g, "");
    $content.innerHTML = `
      <h1>Guardias</h1>
      <div class="card destacado">
        <h2>Teléfono de la caseta</h2>
        <p class="big"><a href="tel:${tel}">${esc(g.telefonoCaseta)}</a></p>
      </div>
      <div class="tabla-wrap">
        <table>
          <thead><tr><th>Nombre</th><th>Turno</th><th>Horario</th></tr></thead>
          <tbody>
            ${g.lista.map(x => `<tr><td>${esc(x.nombre)}</td><td>${esc(x.turno)}</td><td>${esc(x.horario)}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  }

  // ---------- Servicios ----------
  function servicios() {
    const lista = window.SERVICIOS;
    const factorMensual = { mensual: 1, quincenal: 2, semanal: 52 / 12 };
    const totalMensual = lista
      .filter(s => s.incluidoEnCuota && factorMensual[s.periodicidad])
      .reduce((t, s) => t + Number(s.costo || 0) * factorMensual[s.periodicidad], 0);

    $content.innerHTML = `
      <h1>Servicios adicionales</h1>
      <p>Servicios contratados para el fraccionamiento y su costo. Los marcados como
         "incluido en cuota" forman parte del costo de mantenimiento.</p>
      <div class="tabla-wrap">
        <table>
          <thead><tr><th>Servicio</th><th>Responsable</th><th>Costo</th><th>Periodicidad</th><th>En cuota</th></tr></thead>
          <tbody>
            ${lista.map(s => `
              <tr>
                <td><strong>${esc(s.nombre)}</strong><br><small class="muted">${esc(s.descripcion)}</small></td>
                <td>${esc(s.responsable)}</td>
                <td>${dinero(s.costo)}</td>
                <td>${esc(s.periodicidad)}</td>
                <td>${s.incluidoEnCuota ? "Sí" : "No"}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="card">
        <h2>Total mensual aproximado incluido en la cuota</h2>
        <p class="big">${dinero(totalMensual)}</p>
        <p class="muted">Los servicios "por evento" no se suman a este total.</p>
      </div>`;
  }

  const rutas = {
    inicio, domicilios, guardias, servicios,
    porton: () => proyecto("porton"),
    malla: () => proyecto("malla")
  };
  (rutas[document.body.dataset.page] || inicio)();
})();
