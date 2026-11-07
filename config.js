/* ==========================================================================
   DATOS DE LA TARJETA — edita solo este archivo.
   Los campos vacíos ("") se muestran como "dato pendiente" en la tarjeta
   y sus botones avisan de que falta completarlos. No se inventa nada.
   ========================================================================== */

window.CARD_CONFIG = {
  /* Identidad ------------------------------------------------------------ */
  nombre: "Nombre",                  // Ej.: nombre de pila
  apellidos: "Apellido",             // Ej.: apellidos (el primero forma el monograma)
  titulo: "Abogada",
  especialidad: "Especialidad jurídica",
  despacho: "",                      // Nombre del despacho / firma (opcional)
  ciudad: "",                        // Ciudad o país (opcional)
  matricula: "",                     // Nº de colegiatura / matrícula (opcional)

  /* Fotografía -------------------------------------------------------------
     Retrato vertical (proporción 4:5 o 3:4), mínimo 1000 px de alto,
     fondo neutro y luz lateral suave. La tarjeta lo presenta en blanco y negro. */
  foto: "assets/foto.jpg",

  /* Contacto -------------------------------------------------------------- */
  telefono: "",                      // Formato internacional, ej.: "+00 000 000 000"
  whatsapp: "",                      // Con código de país; si se deja vacío usa el teléfono
  whatsappMensaje: "Hola, me gustaría realizar una consulta.",
  email: "",
  direccion: "",                     // Dirección profesional completa
  mapsUrl: "",                       // Enlace de Google Maps (opcional; si no, se busca la dirección)
  web: "",                           // Sitio web (opcional)

  /* Agenda -----------------------------------------------------------------
     Enlace de Calendly, Google Calendar, etc. Si se deja vacío, el botón
     "Agendar consulta" abre WhatsApp (o el correo) con un mensaje preparado. */
  agenda: "",

  /* Redes sociales (deja vacías las que no uses) -------------------------- */
  redes: {
    linkedin: "",
    instagram: "",
    facebook: "",
    x: "",
    tiktok: ""
  }
};
