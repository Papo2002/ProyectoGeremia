document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 🌊 OLAS (OPTIMIZADAS + VISIBILIDAD)
    // =========================
    const waves = [];
    let animandoOlas = false;

    function crearOla(path) {
        const puntos = 8;
        const ancho = 2099;
        const baseY = 100;

        let offsets = Array.from({ length: puntos }, () => Math.random() * 100);
        let velocidades = Array.from({ length: puntos }, () => 0.01 + Math.random() * 0.02);

        waves.push({ path, offsets, velocidades, puntos, ancho, baseY });
    }

    document.querySelectorAll(".wavePath").forEach(path => {
        crearOla(path);
    });

    function animarOlas() {
        if (!animandoOlas) return;

        waves.forEach(wave => {
            let { path, offsets, velocidades, puntos, ancho, baseY } = wave;

            let d = `M-${ancho},${baseY} `;
            let puntosArray = [];

            for (let i = 0; i < puntos; i++) {
                let x = (ancho / (puntos - 1)) * i;

                offsets[i] += velocidades[i];
                let y = baseY + Math.sin(offsets[i]) * 30;

                puntosArray.push({ x, y });
            }

            for (let i = 0; i < puntosArray.length - 1; i++) {
                let { x: x1, y: y1 } = puntosArray[i];
                let { x: x2, y: y2 } = puntosArray[i + 1];

                let cx = (x1 + x2) / 2;
                let cy = (y1 + y2) / 2;

                d += `Q ${x1},${y1} ${cx},${cy} `;
            }

            d += `L${ancho},200 L-${ancho},200 Z`;
            path.setAttribute("d", d);
        });

        requestAnimationFrame(animarOlas);
    }

    // activar solo cuando visible
    const observerOlas = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animandoOlas) {
                    animandoOlas = true;
                    animarOlas();
                }
            } else {
                animandoOlas = false;
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".wavePath").forEach(path => {
        observerOlas.observe(path);
    });


    // =========================
    // 💧 GOTAS (LIMITADAS)
    // =========================
    const contenedor = document.querySelector('.gotas');

    if (contenedor) {
        function crearGota() {
            if (contenedor.childElementCount > 25) return;

            const gota = document.createElement('div');
            gota.classList.add('gota');

            gota.style.left = Math.random() * 100 + "%";
            gota.style.height = (10 + Math.random() * 15) + "px";
            gota.style.animationDuration = (1 + Math.random()) + "s";

            contenedor.appendChild(gota);

            setTimeout(() => gota.remove(), 2000);
        }

        setInterval(crearGota, 500);
    }


    // =========================
    // 🎞 SLIDER (SUAVE)
    // =========================
    let index = 0;
    const slides = document.getElementById("slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    if (slides && totalSlides > 0) {
        setInterval(() => {
            index = (index + 1) % totalSlides;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }, 4000);
    }


    // =========================
    // 🎬 VIDEO (OPTIMIZADO PRO)
    // =========================
    const video = document.getElementById("videoFondo");

    if (video) {
        video.preload = "none";
        video.playbackRate = 0.9;

        let scrollTimeout;

        // pausa durante scroll
        window.addEventListener("scroll", () => {
            video.pause();

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                video.play();
            }, 150);
        });

        // reproducir solo si visible
        const observerVideo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.3 });

        observerVideo.observe(video);
    }


    // =========================
    // 🫧 BURBUJAS (LIGERAS)
    // =========================
    function crearBurbujas() {
        const contenedores = document.querySelectorAll(".divFondo, .contactos");

        contenedores.forEach(contenedor => {
            const capa = document.createElement("div");
            capa.classList.add("burbujas");
            contenedor.appendChild(capa);

            for (let i = 0; i < 8; i++) {
                const burbuja = document.createElement("div");
                burbuja.classList.add("burbuja");

                const size = Math.random() * 12 + 6;
                burbuja.style.width = size + "px";
                burbuja.style.height = size + "px";

                burbuja.style.left = Math.random() * 100 + "%";
                burbuja.style.animationDuration = (Math.random() * 6 + 5) + "s";
                burbuja.style.animationDelay = Math.random() * 5 + "s";

                capa.appendChild(burbuja);
            }
        });
    }

    crearBurbujas();

});