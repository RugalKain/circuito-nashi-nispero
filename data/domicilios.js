// Estatus de los domicilios. NO incluir nombres ni datos de contacto.
// "estatus" debe ser una de las claves definidas en ESTATUS.
window.DOMICILIOS = {
  estatus: {
    registrado:    { etiqueta: "Registrado en el grupo", clase: "ok" },
    no_registrado: { etiqueta: "No registrado",          clase: "warn" },
    deshabitado:   { etiqueta: "Deshabitado / en venta", clase: "muted" },
    sin_confirmar: { etiqueta: "Sin confirmar",          clase: "info" }
  },

  // DATOS DE EJEMPLO: reemplazar por los reales
  lista: [
    { numero: "101", estatus: "registrado" },
    { numero: "102", estatus: "registrado" },
    { numero: "103", estatus: "no_registrado" },
    { numero: "104", estatus: "sin_confirmar" },
    { numero: "105", estatus: "deshabitado" },
    { numero: "106", estatus: "registrado" }
  ]
};
