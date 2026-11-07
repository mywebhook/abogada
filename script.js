/* ==========================================================================
   Tarjeta digital — interacción
   ========================================================================== */
(() => {
  'use strict';

  const C = Object.assign({ redes: {} }, window.CARD_CONFIG || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const has = (v) => typeof v === 'string' && v.trim().length > 0;
  const digits = (v) => (v || '').replace(/\D/g, '');

  const fullName = [C.nombre, C.apellidos].filter(has).join(' ').trim() || 'Nombre Apellido';
  const firstSurname = has(C.apellidos) ? C.apellidos.trim().split(/\s+/)[0] : '';
  const i1 = (has(C.nombre) ? C.nombre.trim() : 'N').charAt(0).toUpperCase();
  const i2 = (firstSurname || 'A').charAt(0).toUpperCase();

  const card = $('#card');
  const front = $('#front');
  const back = $('#back');

  /* ---------------------------------------------------------------- Aviso */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 3400);
  }
  const pending = (field) => toast(`Dato pendiente · complete «${field}» en config.js`);

  /* ------------------------------------------------------------- Textos */
  $$('[data-field]').forEach((el) => {
    const val = C[el.dataset.field];
    el.textContent = has(val) ? val : (el.dataset.placeholder || `[${el.dataset.field}]`);
  });
  $$('[data-i1]').forEach((el) => (el.textContent = i1));
  $$('[data-i2]').forEach((el) => (el.textContent = i2));
  $$('[data-initials]').forEach((el) => (el.textContent = i1 + i2));
  $$('[data-fullname]').forEach((el) => (el.textContent = fullName));
  $$('[data-signature]').forEach((el) => {
    el.textContent = [C.nombre, firstSurname].filter(has).join(' ') || fullName;
  });

  const backRole = $('#backRole');
  backRole.textContent = [C.titulo, C.especialidad].filter(has).join(' · ');

  const vLabel = $('#verticalLabel');
  [C.titulo, has(C.matricula) ? `Mat. ${C.matricula}` : '', C.ciudad]
    .filter(has)
    .forEach((txt, i) => {
      if (i) vLabel.appendChild(Object.assign(document.createElement('span'), { className: 'sep' }));
      vLabel.appendChild(document.createTextNode(txt));
    });

  document.title = `${fullName} · ${has(C.titulo) ? C.titulo : 'Abogada'}`;
  const desc = [C.titulo, C.especialidad, C.despacho].filter(has).join(' · ');
  $('meta[name="description"]').setAttribute('content', desc);
  $('meta[property="og:title"]').setAttribute('content', document.title);

  // Favicon con el monograma
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#111111"/><rect x="4.5" y="4.5" width="55" height="55" fill="none" stroke="#C5B48B" stroke-opacity=".5"/><text x="32" y="42" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="26" fill="#C5B48B">${i1}${i2}</text></svg>`;
  document.head.appendChild(Object.assign(document.createElement('link'), {
    rel: 'icon',
    href: 'data:image/svg+xml,' + encodeURIComponent(fav),
  }));

  /* ------------------------------------------------------------ Fotografía */
  const portrait = $('#portrait');
  const photo = $('#photo');
  photo.alt = `Retrato profesional de ${fullName}`;
  if (has(C.foto)) {
    photo.addEventListener('load', () => portrait.classList.add('has-photo'));
    photo.addEventListener('error', () => portrait.classList.add('no-photo'));
    photo.src = C.foto;
  } else {
    portrait.classList.add('no-photo');
  }

  /* ------------------------------------------------------------- Enlaces */
  const waNumber = digits(C.whatsapp) || digits(C.telefono);
  const waLink = (msg) => `https://wa.me/${waNumber}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
  const telLink = has(C.telefono) ? `tel:${C.telefono.replace(/[^\d+]/g, '')}` : '';
  const mailLink = (subject) => `mailto:${C.email.trim()}?subject=${encodeURIComponent(subject)}`;
  const mapsLink = has(C.mapsUrl)
    ? C.mapsUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.direccion || '')}`;

  const ARROW = '<svg class="contact__go" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10 10 2M4 2h6v6"/></svg>';

  const rows = [
    {
      label: 'Teléfono', field: 'telefono', ph: 'Por definir',
      value: C.telefono, href: telLink,
    },
    {
      label: 'WhatsApp', field: 'whatsapp', ph: 'Por definir',
      value: has(C.whatsapp) ? C.whatsapp : C.telefono,
      href: waNumber ? waLink(C.whatsappMensaje) : '', external: true,
    },
    {
      label: 'Correo', field: 'email', ph: 'Por definir',
      value: C.email, href: has(C.email) ? mailLink('Consulta profesional') : '',
    },
    {
      label: 'Despacho', field: 'direccion', ph: 'Dirección por definir',
      value: C.direccion, href: has(C.direccion) ? mapsLink : '', external: true,
    },
  ];
  if (has(C.web)) {
    rows.push({
      label: 'Web', field: 'web',
      value: C.web.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      href: /^https?:\/\//.test(C.web) ? C.web : `https://${C.web}`, external: true,
    });
  }

  const list = $('#contacts');

  function makeRow(row) {
    const li = document.createElement('li');
    const filled = has(row.value) && row.href;
    const el = document.createElement(filled ? 'a' : 'button');
    el.className = 'contact' + (filled ? '' : ' is-empty');

    if (filled) {
      el.href = row.href;
      if (row.external) { el.target = '_blank'; el.rel = 'noopener'; }
      el.setAttribute('aria-label', `${row.label}: ${row.value}`);
    } else {
      el.type = 'button';
      el.addEventListener('click', () => pending(row.field));
    }

    const label = Object.assign(document.createElement('span'), { className: 'contact__label', textContent: row.label });
    const value = Object.assign(document.createElement('span'), {
      className: 'contact__value',
      textContent: filled ? row.value : row.ph,
    });
    el.append(label, value);
    el.insertAdjacentHTML('beforeend', ARROW);
    li.appendChild(el);
    return li;
  }

  rows.forEach((r) => list.appendChild(makeRow(r)));

  // Redes sociales
  const NETWORKS = { linkedin: 'LinkedIn', instagram: 'Instagram', facebook: 'Facebook', x: 'X', tiktok: 'TikTok' };
  const socials = Object.entries(C.redes || {}).filter(([k, v]) => NETWORKS[k] && has(v));
  {
    const li = document.createElement('li');
    const el = document.createElement(socials.length ? 'div' : 'button');
    el.className = 'contact' + (socials.length ? '' : ' is-empty');
    el.appendChild(Object.assign(document.createElement('span'), { className: 'contact__label', textContent: 'Redes' }));

    if (socials.length) {
      const wrap = Object.assign(document.createElement('span'), { className: 'contact__value socials' });
      socials.forEach(([k, url]) => {
        wrap.appendChild(Object.assign(document.createElement('a'), {
          href: /^https?:\/\//.test(url) ? url : `https://${url}`,
          target: '_blank',
          rel: 'noopener',
          textContent: NETWORKS[k],
        }));
      });
      el.appendChild(wrap);
      el.appendChild(document.createElement('span'));
    } else {
      el.type = 'button';
      el.appendChild(Object.assign(document.createElement('span'), { className: 'contact__value', textContent: 'Por definir' }));
      el.insertAdjacentHTML('beforeend', ARROW);
      el.addEventListener('click', () => pending('redes'));
    }
    li.appendChild(el);
    list.appendChild(li);
  }

  /* ------------------------------------------------------ Agendar consulta */
  const schedule = $('#schedule');
  if (has(C.agenda)) {
    schedule.href = C.agenda;
    schedule.target = '_blank';
  } else if (waNumber) {
    schedule.href = waLink(`Hola${has(C.nombre) ? ' ' + C.nombre.trim() : ''}, quisiera agendar una consulta. ¿Qué disponibilidad tiene?`);
    schedule.target = '_blank';
  } else if (has(C.email)) {
    schedule.href = mailLink('Solicitud de consulta');
  } else {
    schedule.addEventListener('click', (e) => { e.preventDefault(); pending('agenda'); });
  }

  /* ------------------------------------------------------- vCard (.vcf) */
  const vEsc = (s) => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');
  const fold = (line) => {
    if (line.length <= 75) return line;
    let out = line.slice(0, 75);
    for (let i = 75; i < line.length; i += 74) out += '\r\n ' + line.slice(i, i + 74);
    return out;
  };

  function photoBase64() {
    if (!portrait.classList.contains('has-photo') || !photo.naturalWidth) return null;
    try {
      const w = Math.min(480, photo.naturalWidth);
      const h = Math.round((photo.naturalHeight / photo.naturalWidth) * w);
      const canvas = Object.assign(document.createElement('canvas'), { width: w, height: h });
      canvas.getContext('2d').drawImage(photo, 0, 0, w, h);
      return canvas.toDataURL('image/jpeg', 0.86).split(',')[1];
    } catch (_) {
      return null; // p. ej. al abrir el archivo localmente (file://)
    }
  }

  function buildVCard() {
    const L = ['BEGIN:VCARD', 'VERSION:3.0'];
    L.push(`N:${vEsc(C.apellidos || '')};${vEsc(C.nombre || '')};;;`);
    L.push(`FN:${vEsc(fullName)}`);
    if (has(C.despacho)) L.push(`ORG:${vEsc(C.despacho)}`);
    L.push(`TITLE:${vEsc([C.titulo, C.especialidad].filter(has).join(' · '))}`);
    if (has(C.telefono)) L.push(`TEL;TYPE=CELL,VOICE:${C.telefono.trim()}`);
    if (has(C.whatsapp) && digits(C.whatsapp) !== digits(C.telefono)) L.push(`TEL;TYPE=CELL:+${digits(C.whatsapp)}`);
    if (has(C.email)) L.push(`EMAIL;TYPE=INTERNET,WORK:${C.email.trim()}`);
    if (has(C.direccion)) L.push(`ADR;TYPE=WORK:;;${vEsc(C.direccion)};;;;`);
    if (has(C.web)) L.push(`URL:${C.web.trim()}`);
    Object.entries(C.redes || {}).forEach(([k, v]) => {
      if (has(v)) L.push(`X-SOCIALPROFILE;TYPE=${k}:${v.trim()}`);
    });
    if (/^https?:/.test(location.protocol)) L.push(`URL;TYPE=Tarjeta:${location.origin}${location.pathname}`);
    const b64 = photoBase64();
    if (b64) L.push(`PHOTO;ENCODING=b;TYPE=JPEG:${b64}`);
    L.push('END:VCARD');
    return L.map(fold).join('\r\n');
  }

  $('#saveContact').addEventListener('click', () => {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: url,
      download: `${fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') || 'contacto'}.vcf`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('Contacto preparado · ábralo para guardarlo');
  });

  /* ------------------------------------------------------------ Compartir */
  $('#share').addEventListener('click', async () => {
    const data = { title: document.title, text: `${fullName} · ${backRole.textContent}`, url: location.href.split('#')[0] };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(data.url);
      toast('Enlace copiado');
    } catch (err) {
      if (err && err.name !== 'AbortError') toast('No fue posible compartir el enlace');
    }
  });

  /* ------------------------------------------------------------- Giro */
  let side = 'front';
  function setSide(next, { focus = false } = {}) {
    if (next === side) return;
    side = next;
    const isBack = side === 'back';
    card.classList.toggle('is-flipped', isBack);
    document.body.classList.toggle('is-back', isBack);
    front.inert = isBack;
    back.inert = !isBack;
    front.setAttribute('aria-hidden', String(isBack));
    back.setAttribute('aria-hidden', String(!isBack));
    $$('[data-side]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.side === side)));
    history.replaceState(null, '', isBack ? '#contacto' : location.pathname + location.search);
    if (focus) {
      setTimeout(() => {
        const target = isBack ? $('.contact', back) : $('[data-go="back"]', front);
        target && target.focus({ preventScroll: true });
      }, 650);
    }
  }
  back.inert = true;
  back.setAttribute('aria-hidden', 'true');

  $$('[data-go]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    setSide(b.dataset.go, { focus: e.detail === 0 });
  }));
  $$('[data-side]').forEach((b) => b.addEventListener('click', () => setSide(b.dataset.side)));

  front.addEventListener('click', (e) => {
    if (!e.target.closest('a, button')) setSide('back');
  });

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') setSide('back');
    else if (e.key === 'ArrowLeft' || e.key === 'Escape') setSide('front');
  });

  // Deslizar en móviles
  let sx = 0, sy = 0;
  card.addEventListener('touchstart', (e) => {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });
  card.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) setSide(dx < 0 ? 'back' : 'front');
  }, { passive: true });

  if (location.hash === '#contacto') setSide('back');

  /* --------------------------------------------- Inclinación (escritorio) */
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (finePointer && !reduced) {
    card.classList.add('has-tilt');
    let raf = 0;
    card.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
        const mx = side === 'back' ? 1 - (x + 0.5) : x + 0.5;
        card.style.setProperty('--mx', `${(mx * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  }

  /* ------------------------------------------------ Altura de la tarjeta
     Las caras son absolutas: si el reverso tiene más contenido del que cabe
     (muchos datos o pantallas estrechas), se alarga la tarjeta para que nada
     quede cortado. */
  function fitCard() {
    card.style.minHeight = '';
    const need = Math.max(front.scrollHeight, back.scrollHeight);
    if (need > card.offsetHeight + 1) card.style.minHeight = `${Math.ceil(need)}px`;
  }
  let fitTimer;
  window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitCard, 120); });

  /* --------------------------------------------------------- Entrada */
  const ready = () => { fitCard(); requestAnimationFrame(() => document.body.classList.add('is-ready')); };
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(ready);
})();
