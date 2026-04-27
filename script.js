
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 🌊 OLAS (MULTIPLES)
    // =========================
    function crearOla(path) {
        const puntos = 8;
        const ancho = 2440;
        const baseY = 80;

        let offsets = [];
        let velocidades = [];

        for (let i = 0; i < puntos; i++) {
            offsets.push(Math.random() * 100);
            velocidades.push(0.01 + Math.random() * 0.02);
        }

        function animar() {
let d = `M-90000,${baseY} `;           
 let puntosArray = [];

            for (let i = 0; i < puntos; i++) {
                let x = (ancho / (puntos - 1)) * i;

                offsets[i] += velocidades[i];
                let y = baseY + Math.sin(offsets[i]) * 40;

                puntosArray.push({ x, y });
            }

            for (let i = 0; i < puntosArray.length - 1; i++) {
                let x1 = puntosArray[i].x;
                let y1 = puntosArray[i].y;
                let x2 = puntosArray[i + 1].x;
                let y2 = puntosArray[i + 1].y;

                let cx = (x1 + x2) / 2;
                let cy = (y1 + y2) / 2;

                d += `Q ${x1},${y1} ${cx},${cy} `;
            }

d += `L${ancho},200 L0,200 Z`;
            path.setAttribute("d", d);

            requestAnimationFrame(animar);
        }

        animar();
    }

    // aplicar a TODAS las olas
    document.querySelectorAll(".wavePath").forEach(path => {
        crearOla(path);
    });


    // =========================
    // 💧 GOTAS (PROTEGIDO)
    // =========================
    const contenedor = document.querySelector('.gotas');

    if (contenedor) {
        function crearGota() {
            const gota = document.createElement('div');
            gota.classList.add('gota');

            gota.style.left = Math.random() * 100 + "%";
            gota.style.height = (10 + Math.random() * 20) + "px";
            gota.style.animationDuration = (1 + Math.random() * 2) + "s";

            contenedor.appendChild(gota);

            setTimeout(() => {
                gota.remove();
            }, 3000);
        }

        setInterval(crearGota, 150);
    }


    // =========================
    // 🎞 SLIDER
    // =========================
    let index = 0;
    const slides = document.getElementById("slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    if (slides) {
        function moverSlider() {
            index++;
            slides.style.transition = "transform 1s ease-in-out";
            slides.style.transform = `translateX(-${index * 100}%)`;

            if (index === totalSlides - 1) {
                setTimeout(() => {
                    slides.style.transition = "none";
                    slides.style.transform = "translateX(0%)";
                    index = 0;
                }, 1000);
            }
        }

        setInterval(moverSlider, 4000);
    }


    // =========================
    // 🎬 VIDEO
    // =========================
    const video = document.getElementById("videoFondo");

    if (video) {
        video.addEventListener("loadeddata", () => {
            video.playbackRate = 0.4;
        });
    }

});
