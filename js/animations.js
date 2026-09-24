javascript
export function initAnimations() {


    /* =====================================================
       LOADER
    ====================================================== */

    const loader =
        document.querySelector(".loader");

    const progress =
        document.querySelector(
            ".loader-progress"
        );

    const percent =
        document.querySelector(
            ".loader-percent"
        );


    const loaderObject = {
        value: 0
    };


    gsap.to(
        loaderObject,
        {

            value: 100,

            duration: 1.8,

            ease: "power2.inOut",

            onUpdate: () => {

                const value =
                    Math.round(
                        loaderObject.value
                    );


                progress.style.width =
                    `${value}%`;


                percent.textContent =
                    `${String(value).padStart(2, "0")}%`;

            },

            onComplete: () => {

                const tl =
                    gsap.timeline();


                tl.to(
                    ".loader-name",
                    {
                        y: -30,
                        opacity: 0,
                        duration: .5
                    }
                );


                tl.to(
                    ".loader-status",
                    {
                        opacity: 0,
                        duration: .3
                    },
                    "<"
                );


                tl.to(
                    loader,
                    {
                        yPercent: -100,
                        duration: 1,
                        ease: "power4.inOut"
                    }
                );

            }

        }
    );


    /* =====================================================
       HERO
    ====================================================== */

    const hero =
        gsap.timeline({
            delay: 2.1
        });


    hero
        .from(
            ".hero-eyebrow",
            {
                y: 30,
                opacity: 0,
                duration: .8,
                ease: "power3.out"
            }
        )

        .from(
            ".title-line > span",
            {
                yPercent: 120,
                duration: 1.1,
                stagger: .12,
                ease: "power4.out"
            },
            "-=.4"
        )

        .from(
            ".hero-description",
            {
                y: 30,
                opacity: 0,
                duration: .8
            },
            "-=.6"
        );


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    gsap.to(
        ".hero-container",
        {

            yPercent: -30,

            opacity: .15,

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom top",

                scrub: true

            }

        }
    );


    /* =====================================================
       MANIFESTO
    ====================================================== */

    gsap.from(
        ".manifesto-text",
        {

            y: 100,

            opacity: 0,

            duration: 1.4,

            ease: "power4.out",

            scrollTrigger: {

                trigger:
                    ".manifesto-text",

                start: "top 75%",

                toggleActions:
                    "play none none reverse"

            }

        }
    );


    /* =====================================================
       HORIZONTAL PROJECTS
    ====================================================== */

    const track =
        document.querySelector(
            ".projects-track"
        );


    if (track) {

        function getDistance() {

            return -(
                track.scrollWidth -
                window.innerWidth +
                window.innerWidth * .1
            );

        }


        gsap.to(
            track,
            {

                x: getDistance,

                ease: "none",

                scrollTrigger: {

                    trigger:
                        ".projects-section",

                    start: "top top",

                    end: "bottom bottom",

                    scrub: 1,

                    invalidateOnRefresh:
                        true

                }

            }
        );

    }


    /* =====================================================
       PROJECT CARDS
    ====================================================== */

    gsap.utils
        .toArray(".project-card")
        .forEach(card => {

            gsap.from(
                card,
                {

                    scale: .8,

                    opacity: .35,

                    scrollTrigger: {

                        trigger:
                            card,

                        start: "top 95%",

                        end: "top 45%",

                        scrub: true

                    }

                }
            );

        });


    /* =====================================================
       SKILLS
    ====================================================== */

    gsap.utils
        .toArray(".skill-item")
        .forEach(item => {

            gsap.from(
                item,
                {

                    x: -100,

                    opacity: 0,

                    duration: .9,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger:
                            item,

                        start: "top 90%",

                        toggleActions:
                            "play none none reverse"

                    }

                }
            );

        });


    /* =====================================================
       ABOUT
    ====================================================== */

    gsap.from(
        ".about-title",
        {

            x: -100,

            opacity: 0,

            duration: 1.2,

            ease: "power4.out",

            scrollTrigger: {

                trigger: ".about",

                start: "top 70%"

            }

        }
    );


    gsap.from(
        ".about-copy",
        {

            x: 100,

            opacity: 0,

            duration: 1.2,

            ease: "power4.out",

            scrollTrigger: {

                trigger: ".about",

                start: "top 70%"

            }

        }
    );


    /* =====================================================
       CONTACT
    ====================================================== */

    gsap.from(
        ".contact-title",
        {

            scale: .7,

            opacity: 0,

            duration: 1.3,

            ease: "power4.out",

            scrollTrigger: {

                trigger: ".contact",

                start: "top 75%"

            }

        }
    );

}

