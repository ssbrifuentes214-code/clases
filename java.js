/* java.js — Lógica propia de index.html (curso + buscador) */

function mostrarCurso(){

    document.querySelector(".inicio-card").style.display = "none";

    document.getElementById("curso").classList.remove("oculto");

    document.getElementById("curso").scrollIntoView({
        behavior:"smooth"
    });

}

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Íconos y nivel por tarjeta ---------- */
    const ICONOS = ["🔍","🧰","👥","⚙️","🖥️","🧠","🔌","💡","🩺","🧩","📊","📘","🪑","🌐","🔥","🧪","⚠️","📋"];

    const nivelPorIndice = (i) => {
        if (i < 6) return "Básico";
        if (i < 12) return "Intermedio";
        return "Avanzado";
    };

    document.querySelectorAll(".carrusel .card").forEach((card, i) => {
        const titulo = card.querySelector("h2");
        if (titulo && !card.querySelector(".card-icono")) {
            const icono = document.createElement("span");
            icono.className = "card-icono";
            icono.textContent = ICONOS[i] || "🔧";
            titulo.insertAdjacentElement("beforebegin", icono);
        }
        if (!card.querySelector(".card-nivel")) {
            const nivel = document.createElement("span");
            nivel.className = "card-nivel";
            nivel.textContent = nivelPorIndice(i);
            card.appendChild(nivel);
        }
    });

    const buscador = document.getElementById("buscador");
    const carrusel = document.querySelector(".carrusel");

    if(buscador){

        buscador.addEventListener("input", () => {

            let texto = buscador.value.toLowerCase().trim();

            let tarjetas = document.querySelectorAll(".card");
            let hayResultados = false;

            tarjetas.forEach(card => {

                let contenido = card.innerText.toLowerCase();
                let coincide = contenido.includes(texto);

                card.style.display = coincide ? "block" : "none";

                if(coincide) hayResultados = true;

            });

            if(carrusel){
                carrusel.classList.toggle("sin-resultados", texto !== "" && !hayResultados);
            }

        });

    }

});
