/* ==========================================================================
   DATOS DE LA TARJETA — edita solo este archivo.
   Los campos vacíos ("") se muestran como "Por definir" en la tarjeta
   y sus botones avisan de que falta completarlos.

   ⚠ PERFIL FICTICIO DE DEMOSTRACIÓN (ver peril_abogada.md).
     Sustituir por datos reales y verificables antes de publicar.
   ========================================================================== */

window.CARD_CONFIG = {
  /* Identidad ------------------------------------------------------------ */
  nombre: "Valeria",                 // Nombre de pila
  apellidos: "Mendoza Rojas",        // Apellidos (el primero forma el monograma)
  titulo: "Abogada",
  especialidad: "Derecho civil, familiar y comercial",
  despacho: "Mendoza Consultora Legal",
  ciudad: "Santa Cruz",
  matricula: "",                     // Nº de matrícula profesional (dato real pendiente)

  /* Fotografía -------------------------------------------------------------
     Retrato vertical (proporción 4:5 o 3:4), mínimo 1000 px de alto,
     fondo neutro y luz lateral suave. La tarjeta lo presenta en blanco y negro. */
  foto: "assets/foto.jpg",

  /* Contacto -------------------------------------------------------------- */
  telefono: "+591 710 45678",
  whatsapp: "+591 710 45678",
  whatsappMensaje: "Hola, Dra. Mendoza. Me gustaría realizar una consulta jurídica.",
  email: "contacto@mendozaconsultoralegal.example",
  direccion: "Av. San Martín, Edif. Empresarial, Of. 304",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+San+Mart%C3%ADn+Santa+Cruz+de+la+Sierra+Bolivia",
  web: "www.mendozaconsultoralegal.example",

  /* Agenda -----------------------------------------------------------------
     Enlace de Calendly, Google Calendar, etc. Si se deja vacío, el botón
     "Agendar consulta" abre WhatsApp (o el correo) con un mensaje preparado. */
  agenda: "",

  /* Redes sociales (deja vacías las que no uses) -------------------------- */
  redes: {
    linkedin: "https://www.linkedin.com/in/valeria-mendoza-abogada",
    instagram: "https://www.instagram.com/abg.valeriamendoza",
    facebook: "https://www.facebook.com/mendozaconsultoralegal",
    x: "",
    tiktok: ""
  }
};
