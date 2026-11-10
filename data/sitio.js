// Información general del sitio.
// Edita los textos entre comillas. Fechas en formato AAAA-MM-DD.
window.SITIO = {
  nombre: "Circuito Nashi-Nispero",
  bienvenida:
    "Este sitio reúne la información importante del fraccionamiento: proyectos en curso, " +
    "guardias, servicios y el estatus de registro de los domicilios. Es informativo; " +
    "no recibe pagos ni datos personales.",
  ultimaActualizacion: "2026-11-10",

  // Cuota de mantenimiento (deja monto en null si aún no está confirmada)
  cuota: {
    monto: null,
    periodicidad: "mensual",
    nota: "Pendiente de confirmar con el comité."
  },

  // Avisos recientes (el primero de la lista se muestra arriba)
  avisos: [
    {
      fecha: "2026-11-10",
      titulo: "Estrenamos sitio informativo",
      texto: "A partir de hoy, aquí publicaremos los avances de los proyectos del fraccionamiento."
    }
  ]
};
