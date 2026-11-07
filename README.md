# Tarjeta digital · Abogada

Tarjeta digital de estética *quiet luxury* para abogadas: anverso editorial y reverso de contacto. Está hecha con HTML, CSS y JavaScript, sin dependencias.

## Personalización

1. Edite **`config.js`**: nombre, especialidad, teléfono, WhatsApp, correo, dirección, redes y enlace de agenda. Los campos vacíos aparecen como «Por definir».
2. Coloque el retrato en **`assets/foto.jpg`**. Use una foto vertical (4:5 o 3:4) de al menos 1000 px de alto, con fondo neutro y luz lateral suave. La tarjeta la muestra en blanco y negro.
3. Abra `index.html` o publique la carpeta en cualquier hosting estático, por ejemplo GitHub Pages, Netlify o Vercel.

## Funciones

- Giro anverso/reverso: con un toque, deslizando, con los botones o con las flechas del teclado. El enlace `#contacto` abre directamente el reverso.
- Llamada directa (`tel:`), WhatsApp con mensaje preparado, correo (`mailto:`) y dirección en Google Maps.
- **Guardar contacto**: descarga un archivo `.vcf` con la foto incluida cuando la página se sirve por http/https.
- **Agendar consulta**: abre el enlace de `agenda`. Si no hay enlace, abre WhatsApp o el correo.
- Botón Compartir (menú nativo del sistema o copia del enlace).
- Diseño adaptado a móviles. Respeta la preferencia de movimiento reducido.

Paleta: `#111111` · `#1B1B1B` · `#C5B48B` · `#F5F2EA` · `#858585`
Tipografías: Cormorant Garamond (nombre), Jost (datos) y Pinyon Script (firma).
