/* =========================================================
   NAYAN 5D PORTFOLIO
   MAIN.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       LOADER
    ----------------------------------------------------- */

    const loader = document.getElementById("loader");

    const hideLoader = () => {
        if (!loader) return;

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    };

    if (document.readyState === "complete") {
        setTimeout(hideLoader, 700);
    } else {
        window.addEventListener("load", () => {
            setTimeout(hideLoader, 700);
        });
    }


    /* -----------------------------------------------------
       CURRENT YEAR
    ----------------------------------------------------- */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* -----------------------------------------------------
       TYPING EFFECT
    ----------------------------------------------------- */

    const typingElement = document.getElementById("typing");

    if (typingElement) {

        const phrases = [
            "create something amazing...",
            "build futuristic websites...",
            "design 3D experiences...",
            "enter the next level...",
            "turn ideas into reality..."
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typeSpeed = 75;
        const deleteSpeed = 40;
        const pauseAfterTyping = 1500;
        const pauseAfterDeleting = 500;

        function typeWriter() {

            const currentPhrase =
                phrases[phraseIndex];

            if (!deleting) {

                characterIndex++;

                typingElement.textContent =
                    currentPhrase.substring(
                        0,
                        characterIndex
                    );

                if (
                    characterIndex >=
                    currentPhrase.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeWriter,
                        pauseAfterTyping
                    );

                    return;
                }

                setTimeout(
                    typeWriter,
                    typeSpeed
                );

            } else {

                characterIndex--;

                typingElement.textContent =
                    currentPhrase.substring(
                        0,
                        characterIndex
                    );

                if (characterIndex <= 0) {

                    deleting = false;

                    phraseIndex =
                        (phraseIndex + 1) %
                        phrases.length;

                    setTimeout(
                        typeWriter,
                        pauseAfterDeleting
                    );

                    return;
                }

                setTimeout(
                    typeWriter,
                    deleteSpeed
                );
            }
        }

        typeWriter();
    }


    /* -----------------------------------------------------
       CONTACT FORM
    ----------------------------------------------------- */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMsg");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                if (formMessage) {

                    formMessage.textContent =
                        "TRANSMISSION READY — CONNECT YOUR EMAIL SERVICE TO RECEIVE MESSAGES.";

                    formMessage.style.color =
                        "#64ff9c";
                }

                contactForm.reset();

            }
        );
    }


    /* -----------------------------------------------------
       MAGNETIC BUTTONS
    ----------------------------------------------------- */

    const magneticElements =
        document.querySelectorAll(".magnetic");

    magneticElements.forEach((element) => {

        element.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900) {
                    return;
                }

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.15}px, ${y * 0.15}px)`;
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "translate(0, 0)";
            }
        );
    });


    /* -----------------------------------------------------
       PROJECT CARD TILT
    ----------------------------------------------------- */

    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card, .video-card"
        );

    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -5;

                const rotateY =
                    ((x / rect.width) - 0.5) * 5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });


    /* -----------------------------------------------------
       PARALLAX
    ----------------------------------------------------- */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        window.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900) {
                    return;
                }

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);

                heroVisual.style.transform =
                    `translate(${x * 10}px, ${y * 10}px)`;
            }
        );
    }


    /* -----------------------------------------------------
       SMOOTH ANCHOR SCROLL
    ----------------------------------------------------- */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });

});
