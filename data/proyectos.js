// Proyectos de mejora. Coloca las fotos en img/porton/ e img/malla/
// y agrégalas a la lista "fotos" con su pie de foto.
window.PROYECTOS = {
  porton: {
    titulo: "Nuevo portón de acceso",
    estado: "En planeación", // En planeación | Cotizando | Aprobado | En obra | Terminado
    descripcion:
      "Plan para instalar un nuevo portón en la entrada principal del fraccionamiento.",
    costoEstimado: null, // ej. 85000
    avance: [
      { fecha: "2026-11-10", texto: "Se comienza a documentar el proyecto." }
    ],
    fotos: [
      // { src: "img/porton/propuesta-1.jpg", pie: "Propuesta de diseño" }
    ]
  },

  malla: {
    titulo: "Malla para el campo de fútbol infantil",
    estado: "En planeación",
    descripcion:
      "Plan para colocar una malla perimetral en el campo de fútbol para niños.",
    costoEstimado: null,
    avance: [
      { fecha: "2026-11-10", texto: "Se comienza a documentar el proyecto." }
    ],
    fotos: [
      // { src: "img/malla/campo-actual.jpg", pie: "Estado actual del campo" }
    ]
  }
};
