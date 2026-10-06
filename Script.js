/* =========================================================
   CONFIGURACIÓN de lo personal
   ========================================================= */
const CONFIG = {
  nombre: "Rosalina",
  mensaje: "Cada estrella de este cielo es un momento contigo ✨",
  mensajeFinal: "Te amo muchisimo 🤍",
  subFinal: "Juntos para toda la vida 💍",

  // Los meses van de 0 a 11 (0 = enero, 1 = febrero...)
  // Desde esta fecha se cuenta "Llevamos X días juntos"
  fechaInicio: new Date(2023, 1, 2),

  // LÍNEA DEL TIEMPO: son las 5 estrellas grandes, unidas en orden.
  // Puedes agregar o quitar hitos y el cielo se acomoda solo.
  // Si no quieres mostrar fecha, pon  fecha: null
  // Si no quieres foto en un hito, pon  foto: ""
  hitos: [
    {
      etiqueta: "El comienzo",
      titulo: "El día que te pedí ser mi novia",
      fecha: new Date(2023, 1, 2),
      foto: "./foto3.jpeg",
      // TEXTO
      texto: "El día que empezó nuestra historia. Ese día no sabía todo lo que íbamos a vivir juntos, pero sí sabía que quería que fueras tú y que quería tenerte a mi lado."
    },
    {
      etiqueta: "1 año",
      titulo: "Cumplimos 1 año",
      fecha: new Date(2024, 1, 2),
      foto: "./foto2.jpeg",
      // TEXTO
      texto: "Nuestro primer año juntos, lleno de momentos que nunca voy a olvidar. Un año en el que fui conociéndote cada vez más y me di cuenta de lo mucho que te amo."
    },
    {
      etiqueta: "2 años",
      titulo: "Cumplimos 2 años",
      fecha: new Date(2025, 1, 2),
      foto: "./foto4.jpeg",
      // TEXTO
      texto: "Dos años juntos y todavía seguíamos creando recuerdos que se quedarían para siempre. Cada momento contigo hacía que me sintiera más seguro de que no quería compartir mi vida con nadie más."
    },
    {
      etiqueta: "3 años",
      titulo: "Cumplimos 3 años",
      fecha: new Date(2026, 1, 2),
      foto: "./foto13.jpeg",
      // TEXTO
      texto: "Tres años de nosotros, de risas, momentos difíciles, aventuras y muchísimos recuerdos. Después de todo lo que habíamos vivido, mi amor por ti solo seguía creciendo."
    },
    {
      etiqueta: "La propuesta",
      titulo: "El día que te pedí matrimonio",
      fecha: new Date(2026, 7, 17), 
      foto: "./foto1.jpeg",
      // TEXTO
      texto: "Ese día te pedí que compartieras tu vida conmigo. Después de tantos momentos juntos no quería que nuestra historia terminara ahí, quería que todo lo que vivimos fuera apenas el comienzo de una vida juntos."
    }
  ],

  // El resto de las fotos: estrellas pequeñas que solo muestran la foto.
  extras: [
    "./foto6.jpeg", "./foto7.jpeg", "./foto8.jpeg", "./foto9.jpeg",
    "./foto10.jpeg", "./foto11.jpeg", "./foto12.jpeg", "./foto13.jpeg",
    "./foto14.jpeg", "./foto15.jpeg", "./foto16.jpeg", "./foto17.jpeg", "./foto18.jpeg", "./foto19.jpeg","./foto20.jpeg"
  ]
};

/* =========================================================
   UTILIDADES
   ========================================================= */
const $ = id => document.getElementById(id);
const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const dobleFrame = fn => requestAnimationFrame(() => requestAnimationFrame(fn));

function formatearFecha(fecha) {
  if (!fecha) return "";
  return fecha.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

// Separa el texto en "letras" sin partir los emojis
function dividirLetras(texto) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter("es", { granularity: "grapheme" });
    return Array.from(seg.segment(texto), s => s.segment);
  }
  return Array.from(texto);
}

/* =========================================================
   INICIO: texto escrito y contador
   ========================================================= */
function escribirTexto() {
  const el = $("mensaje");
  const letras = dividirLetras(CONFIG.mensaje);
  let i = 0;

  el.textContent = "";
  el.classList.add("escribiendo");

  (function paso() {
    if (i < letras.length) {
      el.textContent += letras[i];
      i++;
      setTimeout(paso, 50);
    } else {
      el.classList.remove("escribiendo");
    }
  })();
}

function actualizarContador() {
  const inicio = CONFIG.fechaInicio;
  const hoy = new Date();

  // Diferencia de calendario: años, meses y días (sin horas, para evitar desfases)
  let anios = hoy.getFullYear() - inicio.getFullYear();
  let meses = hoy.getMonth() - inicio.getMonth();
  let dias = hoy.getDate() - inicio.getDate();

  if (dias < 0) {
    meses--;
    // Días que tiene el mes anterior al actual
    dias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
  }
  if (meses < 0) {
    anios--;
    meses += 12;
  }
  dias = Math.max(dias, 0);

  const partes = [];
  if (anios > 0) partes.push(anios + (anios === 1 ? " año" : " años"));
  if (meses > 0) partes.push(meses + (meses === 1 ? " mes" : " meses"));
  if (dias > 0 || partes.length === 0) partes.push(dias + (dias === 1 ? " día" : " días"));

  // "3 años, 8 meses y 3 días"
  const texto = partes.length > 1
    ? partes.slice(0, -1).join(", ") + " y " + partes[partes.length - 1]
    : partes[0];

  $("contador").textContent = "Llevamos " + texto + " juntos ✨";
}

/* =========================================================
   MÚSICA
   ========================================================= */
function iniciarMusica() {
  const musica = $("musica");
  musica.volume = 0;

  const intento = musica.play();
  if (intento !== undefined) {
    intento
      .then(() => {
        // Sube el volumen poco a poco
        const sube = setInterval(() => {
          musica.volume = Math.min(musica.volume + 0.05, 0.8);
          if (musica.volume >= 0.8) clearInterval(sube);
        }, 200);
      })
      .catch(() => {
        // El navegador bloqueó el audio o falta musica.mp3
      });
  }
}

function alternarMusica() {
  const musica = $("musica");
  const boton = $("btnMusica");
  musica.muted = !musica.muted;
  boton.textContent = musica.muted ? "🔇" : "🔊";
  boton.setAttribute("aria-pressed", String(musica.muted));
  boton.setAttribute("aria-label", musica.muted ? "Activar música" : "Silenciar música");
}

/* =========================================================
   ESTRELLAS DE FONDO Y ESTRELLAS FUGACES
   ========================================================= */
function crearEstrellasFondo() {
  const cont = $("fondo");
  const cantidad = window.innerWidth < 600 ? 70 : 120;
  const colores = ["#ffffff", "#ffffff", "#ffe8a3", "#cfe0ff"];
  const frag = document.createDocumentFragment();

  for (let i = 0; i < cantidad; i++) {
    const e = document.createElement("span");
    const tam = Math.random() * 2.2 + 1;
    const color = colores[Math.floor(Math.random() * colores.length)];
    e.className = "estrella";
    e.style.cssText =
      "left:" + Math.random() * 100 + "%;" +
      "top:" + Math.random() * 100 + "%;" +
      "width:" + tam + "px;height:" + tam + "px;" +
      "background:" + color + ";" +
      "box-shadow:0 0 " + tam * 2 + "px " + color + ";" +
      "animation-duration:" + (2 + Math.random() * 4) + "s;" +
      "animation-delay:" + Math.random() * 4 + "s;";
    frag.appendChild(e);
  }
  cont.appendChild(frag);
}

function crearFugaz() {
  if (prefiereMenosMovimiento || document.hidden) return;
  const f = document.createElement("span");
  f.className = "fugaz";
  f.style.left = (30 + Math.random() * 65) + "%";
  f.style.top = (Math.random() * 35) + "%";
  f.addEventListener("animationend", () => f.remove());
  document.body.appendChild(f);
}

function lluviaFugaces(ms) {
  if (prefiereMenosMovimiento) return;
  const t = setInterval(crearFugaz, 450);
  setTimeout(() => clearInterval(t), ms);
}

// Una estrella fugaz de vez en cuando (más seguido al terminar)
function cicloFugaces() {
  crearFugaz();
  const espera = (finalMostrado ? 3000 : 8000) + Math.random() * 4000;
  setTimeout(cicloFugaces, espera);
}

/* =========================================================
   CONSTRUCCIÓN DEL CIELO
   ========================================================= */
let cieloAbierto = false;
let finalMostrado = false;
let elementosHitos = [];
let elementosLineas = [];
const visitados = new Set();
const extrasVistos = new Set();
let ultimoLayout = { w: 0, vertical: true };

// Reparte las estrellas grandes en zigzag (vertical en celular, horizontal en pantalla ancha)
function posicionesHitos(n, W, H) {
  const vertical = H > W;
  const variacion = [0, 0.035, -0.04, 0.03, -0.025, 0.04];
  const lista = [];

  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const v = variacion[i % variacion.length];
    let x, y;

    if (vertical) {
      y = 0.17 + t * 0.65;
      x = (i % 2 === 0 ? 0.30 : 0.70) + v;
      if (i === n - 1 && n > 1 && i % 2 === 0) x = 0.5;
    } else {
      x = 0.10 + t * 0.80;
      y = (i % 2 === 0 ? 0.62 : 0.30) + v;
    }

    x = Math.min(Math.max(x, 0.12), 0.88);
    y = Math.min(Math.max(y, 0.15), 0.86);
    lista.push({ x: x * W, y: y * H });
  }
  return lista;
}

// Busca un lugar libre para una estrella pequeña
function lugarLibre(W, H, ocupadas, r) {
  const margenX = 30, margenSup = 80, margenInf = 70;
  let x, y, intento = 0, valido;

  do {
    x = margenX + Math.random() * (W - margenX * 2);
    y = margenSup + Math.random() * (H - margenSup - margenInf);
    intento++;
    valido = ocupadas.every(p => Math.hypot(p.x - x, p.y - y) > p.r + r + 8);
  } while (!valido && intento < 80);

  ocupadas.push({ x, y, r });
  return { x, y };
}

function construirCielo(animado) {
  const cont = $("constelacion");
  const W = cont.clientWidth;
  const H = cont.clientHeight;
  const svg = $("lineas");
  const contHitos = $("hitos");
  const contExtras = $("extras");
  const n = CONFIG.hitos.length;

  ultimoLayout = { w: W, vertical: H > W };

  cont.classList.toggle("sin-anim", !animado);
  contHitos.innerHTML = "";
  contExtras.innerHTML = "";
  svg.innerHTML = "";
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);

  const base = animado ? 500 : 0;
  const paso = animado ? 700 : 0;
  const pos = posicionesHitos(n, W, H);
  const aMostrar = [];

  elementosHitos = [];
  elementosLineas = [];

  // Líneas entre estrellas (se acortan para no tocar la estrella)
  for (let i = 0; i < n - 1; i++) {
    const a = pos[i], b = pos[i + 1];
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.hypot(dx, dy);
    const ux = dx / d, uy = dy / d;
    const corte = 22;

    const linea = document.createElementNS("http://www.w3.org/2000/svg", "path");
    linea.setAttribute(
      "d",
      "M" + (a.x + ux * corte) + " " + (a.y + uy * corte) +
      " L" + (b.x - ux * corte) + " " + (b.y - uy * corte)
    );
    linea.setAttribute("class", "linea");
    linea.style.setProperty("--largo", String(Math.max(d - corte * 2, 1)));
    linea.style.setProperty("--retraso", (base + i * paso + 450) + "ms");
    svg.appendChild(linea);
    elementosLineas.push(linea);
    aMostrar.push(linea);
  }

  // Estrellas grandes
  const ocupadas = [];
  CONFIG.hitos.forEach((h, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "hito";
    b.style.left = pos[i].x + "px";
    b.style.top = pos[i].y + "px";
    b.style.transitionDelay = (base + i * paso) + "ms";
    b.setAttribute("aria-label", "Recuerdo " + (i + 1) + ": " + h.titulo);
    b.innerHTML =
      '<span class="hito-brillo"></span>' +
      '<span class="hito-estrella"></span>' +
      '<span class="hito-etiqueta"></span>';
    b.querySelector(".hito-etiqueta").textContent = h.etiqueta;
    b.addEventListener("click", () => abrirHito(i, b));

    contHitos.appendChild(b);
    elementosHitos.push(b);
    aMostrar.push(b);

    ocupadas.push({ x: pos[i].x, y: pos[i].y, r: 46 });
    ocupadas.push({ x: pos[i].x, y: pos[i].y + 46, r: 34 }); // espacio de la etiqueta
  });

  // Estrellas pequeñas (resto de las fotos)
  CONFIG.extras.forEach((src, k) => {
    const lugar = lugarLibre(W, H, ocupadas, 26);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "extra" + (extrasVistos.has(src) ? " vista" : "");
    b.style.left = lugar.x + "px";
    b.style.top = lugar.y + "px";
    b.style.setProperty("--retraso", (base + n * paso + 400 + k * 160) + "ms");
    b.style.setProperty("--parpadeo", (Math.random() * 2) + "s");
    b.setAttribute("aria-label", "Una foto de nosotros");
    b.innerHTML = '<span class="extra-estrella"></span>';
    b.addEventListener("click", () => abrirExtra(src, b));

    contExtras.appendChild(b);
    aMostrar.push(b);
  });

  actualizarEstado();

  // Dispara las animaciones de entrada
  dobleFrame(() => {
    aMostrar.forEach(el => {
      el.classList.add(el.classList.contains("linea") ? "dibujada" : "listo");
    });
    if (!animado) dobleFrame(() => cont.classList.remove("sin-anim"));
  });
}

// Sincroniza colores, anillo guía, líneas encendidas y contador de progreso
function actualizarEstado() {
  const total = CONFIG.hitos.length;
  const primero = CONFIG.hitos.findIndex((_, i) => !visitados.has(i));

  elementosHitos.forEach((el, i) => {
    el.classList.toggle("visto", visitados.has(i));
    el.classList.toggle("siguiente", i === primero);
  });

  elementosLineas.forEach((l, i) => {
    l.classList.toggle("activa", visitados.has(i) && visitados.has(i + 1));
  });

  $("progreso").textContent = "✨ " + visitados.size + " / " + total + " recuerdos";
}

/* =========================================================
   VENTANA DE RECUERDO
   ========================================================= */
let indiceActual = null; // null cuando se muestra una foto suelta
let abridor = null;
let temporizadorModal = null;

function mostrarModal(d, opener) {
  const modal = $("modal");
  const poli = $("polaroid");
  const img = $("modalFoto");

  if (opener) abridor = opener;

  // Foto
  const sinFoto = !d.foto;
  poli.classList.toggle("sin-foto", sinFoto);
  poli.classList.toggle("solo", !d.etiqueta);
  img.onerror = () => poli.classList.add("sin-foto");
  img.alt = d.titulo ? "Foto: " + d.titulo : "Una foto de nosotros";
  if (!sinFoto) img.src = d.foto;
  $("modalEtiqueta").textContent = d.etiqueta || "";

  // Texto y navegación (solo para los hitos de la línea del tiempo)
  $("recuerdoTexto").hidden = !d.esHito;
  $("modalNav").hidden = !d.esHito;

  if (d.esHito) {
    $("modalFecha").textContent = d.fecha || "";
    $("modalFecha").hidden = !d.fecha;
    $("modalTitulo").textContent = d.titulo;
    $("modalTexto").textContent = d.texto;

    const ultimo = indiceActual === CONFIG.hitos.length - 1;
    $("btnPrev").disabled = indiceActual === 0;
    $("btnNext").textContent = ultimo ? "Terminar ✨" : "Siguiente ›";
  } else {
    $("modalTitulo").textContent = "";
  }

  $("recuerdo").scrollTop = 0;

  if (modal.hidden) {
    clearTimeout(temporizadorModal);
    modal.hidden = false;
    $("constelacion").inert = true;
    $("hud").inert = true;
    dobleFrame(() => modal.classList.add("abierto"));
    $("btnCerrar").focus({ preventScroll: true });
  }
}

function abrirHito(i, opener) {
  const h = CONFIG.hitos[i];
  visitados.add(i);
  indiceActual = i;

  mostrarModal({
    esHito: true,
    foto: h.foto,
    etiqueta: h.etiqueta,
    fecha: formatearFecha(h.fecha),
    titulo: h.titulo,
    texto: h.texto
  }, opener);

  actualizarEstado();
}

function abrirExtra(src, opener) {
  extrasVistos.add(src);
  if (opener) opener.classList.add("vista");
  indiceActual = null;
  mostrarModal({ esHito: false, foto: src, etiqueta: "" }, opener);
}

function cerrarModal() {
  const modal = $("modal");
  if (modal.hidden) return;

  modal.classList.remove("abierto");
  $("constelacion").inert = false;
  $("hud").inert = false;

  temporizadorModal = setTimeout(() => { modal.hidden = true; }, 350);

  if (abridor && abridor.isConnected) abridor.focus({ preventScroll: true });
  setTimeout(revisarFinal, 500);
}

/* =========================================================
   FINAL
   ========================================================= */
function revisarFinal() {
  if (finalMostrado || visitados.size < CONFIG.hitos.length) return;
  if (!$("modal").hidden) return;

  finalMostrado = true;
  $("constelacion").classList.add("completa");
  $("final").classList.add("visible");
  lluviaFugaces(7000);
}

/* =========================================================
   ENTRAR AL CIELO
   ========================================================= */
function entrarAlCielo() {
  if (cieloAbierto) return; // evita que se active dos veces
  cieloAbierto = true;

  iniciarMusica();

  const intro = $("intro");
  intro.classList.add("saliendo");
  setTimeout(() => { intro.hidden = true; }, 1300);

  $("constelacion").classList.add("visible");
  $("hud").classList.add("visible");
  construirCielo(true);

  // Pista para tocar las estrellas, que se va sola
  const tardanza = 1500 + CONFIG.hitos.length * 700;
  setTimeout(() => $("pista").classList.add("visible"), tardanza);
  setTimeout(() => $("pista").classList.remove("visible"), tardanza + 7000);

  setTimeout(cicloFugaces, 4000);
}

// Descarga las fotos en segundo plano para que no "salten" al abrirse
function precargarFotos() {
  const fotos = CONFIG.hitos.map(h => h.foto).filter(Boolean).concat(CONFIG.extras);
  fotos.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

/* =========================================================
   INICIO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  $("nombre").textContent = CONFIG.nombre;
  $("finalTitulo").textContent = CONFIG.mensajeFinal;
  $("finalSub").textContent = CONFIG.subFinal;
  $("progreso").textContent = "✨ 0 / " + CONFIG.hitos.length + " recuerdos";

  $("btnEntrar").addEventListener("click", entrarAlCielo);
  $("btnMusica").addEventListener("click", alternarMusica);
  $("btnSeguir").addEventListener("click", () => $("final").classList.remove("visible"));

  $("btnCerrar").addEventListener("click", cerrarModal);
  $("modalFondo").addEventListener("click", cerrarModal);
  $("btnPrev").addEventListener("click", () => {
    if (indiceActual > 0) abrirHito(indiceActual - 1, elementosHitos[indiceActual - 1]);
  });
  $("btnNext").addEventListener("click", () => {
    if (indiceActual !== null && indiceActual < CONFIG.hitos.length - 1) {
      abrirHito(indiceActual + 1, elementosHitos[indiceActual + 1]);
    } else {
      cerrarModal();
    }
  });

  document.addEventListener("keydown", e => {
    if ($("modal").hidden) return;
    if (e.key === "Escape") {
      cerrarModal();
    } else if (e.key === "ArrowLeft" && indiceActual !== null && indiceActual > 0) {
      abrirHito(indiceActual - 1, elementosHitos[indiceActual - 1]);
    } else if (e.key === "ArrowRight" && indiceActual !== null && indiceActual < CONFIG.hitos.length - 1) {
      abrirHito(indiceActual + 1, elementosHitos[indiceActual + 1]);
    }
  });

  // Si giran el celular o cambian el tamaño, se vuelve a acomodar el cielo
  let temporizadorResize;
  window.addEventListener("resize", () => {
    if (!cieloAbierto) return;
    clearTimeout(temporizadorResize);
    temporizadorResize = setTimeout(() => {
      const cont = $("constelacion");
      const w = cont.clientWidth;
      const vertical = cont.clientHeight > w;
      if (Math.abs(w - ultimoLayout.w) > 40 || vertical !== ultimoLayout.vertical) {
        construirCielo(false);
      }
    }, 250);
  });

  crearEstrellasFondo();
  escribirTexto();
  actualizarContador();
  precargarFotos();
});