/* ============================================================
   BASE.JS — Comportamiento compartido para todo el sitio
   No modifica el contenido del HTML: agrega efectos por encima.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const prefiereMenosMovimiento =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Barra de progreso de lectura ---------- */
    const barra = document.createElement("div");
    barra.id = "barra-progreso";
    document.body.prepend(barra);

    const actualizarProgreso = () => {
        const alto = document.documentElement.scrollHeight - window.innerHeight;
        const progreso = alto > 0 ? (window.scrollY / alto) * 100 : 0;
        barra.style.width = progreso + "%";
    };

    /* ---------- Botón volver arriba ---------- */
    const boton = document.createElement("button");
    boton.id = "volver-arriba";
    boton.setAttribute("aria-label", "Volver arriba");
    boton.innerHTML = "↑";
    boton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(boton);

    const actualizarBoton = () => {
        boton.classList.toggle("visible", window.scrollY > 400);
    };

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                actualizarProgreso();
                actualizarBoton();
                ticking = false;
            });
            ticking = true;
        }
    });
    actualizarProgreso();
    actualizarBoton();

    /* ---------- Animación al aparecer (scroll reveal) ---------- */
    const selectorRevelar = [
        ".panel", ".card", ".tarjeta", ".tip", ".concepto", ".paso",
        ".item", ".caso", ".componentes-card", ".hero-contenido",
        ".hero-box", ".inicio-card", ".objetivo", ".actividad",
        ".respuesta", ".consigna"
    ].join(", ");

    const elementos = document.querySelectorAll(selectorRevelar);

    if (elementos.length && "IntersectionObserver" in window) {
        elementos.forEach(el => el.setAttribute("data-revelar", ""));

        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("en-vista");
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15 });

        elementos.forEach(el => observador.observe(el));
    }

    /* ---------- Resaltar el link activo en la navegación ---------- */
    const paginaActual = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-btn").forEach(link => {
        const href = link.getAttribute("href");
        if (href === paginaActual) {
            link.classList.add("activo");
        }
    });

    /* ---------- Etiqueta "eyebrow" automática arriba del título del hero ---------- */
    const heroWrap = document.querySelector(".hero-contenido, .hero-box, .hero");
    const heroTitulo = heroWrap ? heroWrap.querySelector("h1") : null;

    if (heroTitulo && !heroTitulo.previousElementSibling?.classList?.contains("eyebrow-auto")) {
        const eyebrow = document.createElement("span");
        eyebrow.className = "eyebrow-auto";
        eyebrow.textContent = document.title.split("-")[0].trim() || "Mantenimiento";
        heroTitulo.parentNode.insertBefore(eyebrow, heroTitulo);
    }

    if (!prefiereMenosMovimiento) {

        /* ---------- Spotlight que sigue el mouse en tarjetas/paneles ---------- */
        const selectorSpotlight = [
            ".card", ".panel", ".tarjeta", ".tip", ".concepto", ".paso",
            ".item", ".caso", ".componentes-card", ".actividad",
            ".respuesta", ".consigna"
        ].join(", ");

        document.querySelectorAll(selectorSpotlight).forEach(el => {
            el.addEventListener("mousemove", (e) => {
                const r = el.getBoundingClientRect();
                el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                el.style.setProperty("--my", `${e.clientY - r.top}px`);
            });
        });

        /* ---------- Inclinación suave 3D en tarjetas ---------- */
        document.querySelectorAll(".card, .tarjeta").forEach(el => {
            el.addEventListener("mousemove", (e) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                el.style.transform =
                    `perspective(700px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
            });
            el.addEventListener("mouseleave", () => {
                el.style.transform = "";
            });
        });
    }

    /* ---------- Efecto ripple en botones y links de navegación ---------- */
    document.querySelectorAll("button, .nav-btn").forEach(el => {
        el.addEventListener("click", function (e) {
            const r = this.getBoundingClientRect();
            const ripple = document.createElement("span");
            const tam = Math.max(r.width, r.height);
            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = tam + "px";
            ripple.style.left = (e.clientX - r.left - tam / 2) + "px";
            ripple.style.top = (e.clientY - r.top - tam / 2) + "px";
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });

});

/* ============================================================
   NAVEGACIÓN GLOBAL, MODO OSCURO Y PROGRESO DEL CURSO
   ============================================================ */

const CLASES = [
    { n: 1,  archivo: "clase1.html",  titulo: "Etapa de Diagnóstico" },
    { n: 2,  archivo: "clase2.html",  titulo: "Instalación y Mantenimiento" },
    { n: 3,  archivo: "clase3.html",  titulo: "Instalación y Mantenimiento" },
    { n: 4,  archivo: "clase4.html",  titulo: "Funcionamiento del Ordenador" },
    { n: 5,  archivo: "clase5.html",  titulo: "Interfaz Gráfica de Windows" },
    { n: 6,  archivo: "clase6.html",  titulo: "Ciclo del Microprocesador" },
    { n: 7,  archivo: "clase7.html",  titulo: "Componentes de la Placa Madre" },
    { n: 8,  archivo: "clase8.html",  titulo: "Panel Frontal" },
    { n: 9,  archivo: "clase9.html",  titulo: "Diagnóstico por Código POST" },
    { n: 10, archivo: "clase10.html", titulo: "Compatibilidad e Investigación" },
    { n: 11, archivo: "clase11.html", titulo: "Análisis de Rendimiento" },
    { n: 12, archivo: "clase12.html", titulo: "Clase 12" },
    { n: 13, archivo: "clase13.html", titulo: "Ergonomía" },
    { n: 14, archivo: "clase14.html", titulo: "Redes y Direccionamiento IP" },
    { n: 15, archivo: "clase15.html", titulo: "Estresamiento de Hardware" },
    { n: 16, archivo: "clase16.html", titulo: "Pruebas de Estrés" },
    { n: 17, archivo: "clase17.html", titulo: "Riesgos y Medidas de Seguridad" },
    { n: 18, archivo: "clase18.html", titulo: "Planilla de Registro de Datos" },
];

document.addEventListener("DOMContentLoaded", () => {

    const paginaActual = location.pathname.split("/").pop() || "index.html";
    const matchClase = paginaActual.match(/^clase(\d+)\.html$/);
    const numClaseActual = matchClase ? parseInt(matchClase[1], 10) : null;

    /* ---------- Favicon (sin tocar cada HTML) ---------- */
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%231A3D63'/%3E%3Ctext x='50' y='68' font-size='58' font-family='Georgia,serif' font-weight='700' fill='%23B3CFE5' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E";
    document.head.appendChild(favicon);

    /* ---------- Progreso: clases visitadas (localStorage) ---------- */
    const CLAVE_VISITADAS = "mantenimiento_visitadas";

    const leerVisitadas = () => {
        try {
            return JSON.parse(localStorage.getItem(CLAVE_VISITADAS)) || [];
        } catch { return []; }
    };

    const guardarVisitada = (n) => {
        const visitadas = new Set(leerVisitadas());
        visitadas.add(n);
        try {
            localStorage.setItem(CLAVE_VISITADAS, JSON.stringify([...visitadas]));
        } catch { /* localStorage no disponible, seguimos sin progreso */ }
    };

    if (numClaseActual) guardarVisitada(numClaseActual);
    const visitadas = new Set(leerVisitadas());

    /* ---------- Barra de navegación fija con menú de clases ---------- */
    const nav = document.createElement("nav");
    nav.id = "nav-global";
    nav.innerHTML = `
        <a href="index.html" class="nav-global-logo">🛠️ <span>Mantenimiento</span></a>

        <div class="nav-global-derecha">
            <div class="nav-global-menu">
                <button type="button" class="nav-global-toggle" aria-expanded="false">
                    <span class="nav-global-texto-larga">${numClaseActual ? `Clase ${numClaseActual} de 18` : "Todas las clases"}</span>
                    <span class="nav-global-texto-corta">Clases</span> ▾
                </button>
                <div class="nav-global-lista" role="menu">
                    ${CLASES.map(c => `
                        <a href="${c.archivo}" role="menuitem"
                           class="${c.archivo === paginaActual ? "activo" : ""}">
                            <span class="nav-global-check">${visitadas.has(c.n) ? "✓" : ""}</span>
                            Clase ${c.n} — ${c.titulo}
                        </a>
                    `).join("")}
                </div>
            </div>

            <button type="button" id="modo-toggle" aria-label="Cambiar modo claro/oscuro">🌙</button>
        </div>
    `;
    document.body.prepend(nav);

    const botonMenu = nav.querySelector(".nav-global-toggle");
    const listaMenu = nav.querySelector(".nav-global-lista");

    botonMenu.addEventListener("click", () => {
        const abierto = listaMenu.classList.toggle("visible");
        botonMenu.setAttribute("aria-expanded", abierto);
    });

    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target)) listaMenu.classList.remove("visible");
    });

    /* ---------- Migas de pan ---------- */
    if (numClaseActual) {
        const clase = CLASES.find(c => c.n === numClaseActual);
        const migas = document.createElement("div");
        migas.id = "migas-pan";
        migas.innerHTML = `
            <a href="index.html">Inicio</a>
            <span aria-hidden="true">›</span>
            <span>Clase ${numClaseActual}${clase && clase.titulo !== `Clase ${numClaseActual}` ? " — " + clase.titulo : ""}</span>
        `;
        nav.insertAdjacentElement("afterend", migas);
    }

    /* ---------- Modo oscuro (con preferencia guardada) ---------- */
    const botonModo = document.getElementById("modo-toggle");
    const CLAVE_MODO = "mantenimiento_modo_oscuro";

    const aplicarModo = (activo) => {
        document.documentElement.classList.toggle("modo-oscuro", activo);
        botonModo.textContent = activo ? "☀️" : "🌙";
    };

    let modoGuardado = null;
    try { modoGuardado = localStorage.getItem(CLAVE_MODO); } catch { /* sin storage */ }
    aplicarModo(modoGuardado === "on");

    botonModo.addEventListener("click", () => {
        const activo = !document.documentElement.classList.contains("modo-oscuro");
        aplicarModo(activo);
        try { localStorage.setItem(CLAVE_MODO, activo ? "on" : "off"); } catch { /* sin storage */ }
    });

    /* ---------- Navegación Anterior / Siguiente al final de cada clase ---------- */
    if (numClaseActual) {
        const anterior = CLASES.find(c => c.n === numClaseActual - 1);
        const siguiente = CLASES.find(c => c.n === numClaseActual + 1);

        const nav2 = document.createElement("div");
        nav2.id = "nav-curso";
        nav2.innerHTML = `
            ${anterior
                ? `<a href="${anterior.archivo}" class="nav-curso-link nav-curso-prev">
                       <span>← Clase anterior</span>
                       <strong>Clase ${anterior.n} — ${anterior.titulo}</strong>
                   </a>`
                : `<span></span>`}
            <a href="index.html" class="nav-curso-inicio">Ver todas las clases</a>
            ${siguiente
                ? `<a href="${siguiente.archivo}" class="nav-curso-link nav-curso-next">
                       <span>Clase siguiente →</span>
                       <strong>Clase ${siguiente.n} — ${siguiente.titulo}</strong>
                   </a>`
                : `<span></span>`}
        `;

        const footer = document.querySelector("footer");
        if (footer) {
            footer.parentNode.insertBefore(nav2, footer);
        } else {
            document.body.appendChild(nav2);
        }
    }

});
