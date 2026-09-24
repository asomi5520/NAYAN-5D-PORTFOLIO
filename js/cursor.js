javascript
export function initCursor() {

    const cursor =
        document.querySelector(
            ".cursor"
        );


    const ring =
        document.querySelector(
            ".cursor-ring"
        );


    if (!cursor || !ring) {
        return;
    }


    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            gsap.to(
                cursor,
                {
                    x: mouseX,
                    y: mouseY,
                    duration: .08
                }
            );

        }
    );


    function follow() {

        ringX +=
            (
                mouseX -
                ringX
            ) * .12;


        ringY +=
            (
                mouseY -
                ringY
            ) * .12;


        gsap.set(
            ring,
            {
                x: ringX,
                y: ringY
            }
        );


        requestAnimationFrame(
            follow
        );

    }


    follow();


    /* =====================================================
       HOVER EFFECT
    ====================================================== */

    const interactive =
        document.querySelectorAll(
            "a, button, .project-card, .skill-item"
        );


    interactive.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        ring,
                        {
                            scale: 1.7,
                            duration: .3
                        }
                    );


                    gsap.to(
                        cursor,
                        {
                            scale: .5,
                            duration: .3
                        }
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        ring,
                        {
                            scale: 1,
                            duration: .3
                        }
                    );


                    gsap.to(
                        cursor,
                        {
                            scale: 1,
                            duration: .3
                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       MAGNETIC ELEMENTS
    ====================================================== */

    document
        .querySelectorAll(".magnetic")
        .forEach(element => {

            element.addEventListener(
                "mousemove",
                event => {

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


                    gsap.to(
                        element,
                        {

                            x: x * .2,

                            y: y * .2,

                            duration: .4,

                            ease: "power3.out"

                        }
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        element,
                        {

                            x: 0,

                            y: 0,

                            duration: .7,

                            ease:
                                "elastic.out(1,.4)"

                        }
                    );

                }
            );

        });

}

