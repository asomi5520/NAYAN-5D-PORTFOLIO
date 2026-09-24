/* =========================================================
   NAYAN 5D PORTFOLIO
   THREE.JS 3D SPACE
========================================================= */

(() => {

    const canvas =
        document.getElementById("space");

    if (!canvas) {
        return;
    }


    /* -----------------------------------------------------
       CHECK THREE.JS
    ----------------------------------------------------- */

    if (
        typeof THREE === "undefined"
    ) {

        console.warn(
            "Three.js was not loaded."
        );

        return;
    }


    /* -----------------------------------------------------
       SCENE
    ----------------------------------------------------- */

    const scene =
        new THREE.Scene();


    /* -----------------------------------------------------
       CAMERA
    ----------------------------------------------------- */

    const camera =
        new THREE.PerspectiveCamera(
            65,
            window.innerWidth /
                window.innerHeight,
            0.1,
            2000
        );

    camera.position.z =
        650;


    /* -----------------------------------------------------
       RENDERER
    ----------------------------------------------------- */

    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    /* -----------------------------------------------------
       STAR FIELD
    ----------------------------------------------------- */

    const starCount =
        window.innerWidth < 600
            ? 1200
            : 2800;


    const starGeometry =
        new THREE.BufferGeometry();


    const starPositions =
        new Float32Array(
            starCount * 3
        );


    for (
        let i = 0;
        i < starCount;
        i++
    ) {

        const i3 =
            i * 3;

        const radius =
            300 +
            Math.random() * 1000;

        const theta =
            Math.random() *
            Math.PI * 2;

        const phi =
            Math.acos(
                Math.random() * 2 - 1
            );


        starPositions[i3] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);

        starPositions[i3 + 1] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);

        starPositions[i3 + 2] =
            radius *
            Math.cos(phi);
    }


    starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            starPositions,
            3
        )
    );


    const starMaterial =
        new THREE.PointsMaterial({

            color: 0x6fefff,

            size:
                window.innerWidth < 600
                    ? 1.3
                    : 1.8,

            transparent: true,

            opacity: 0.7,

            sizeAttenuation: true
        });


    const stars =
        new THREE.Points(
            starGeometry,
            starMaterial
        );


    scene.add(stars);


    /* -----------------------------------------------------
       SECOND PARTICLE CLOUD
    ----------------------------------------------------- */

    const particleCount =
        window.innerWidth < 600
            ? 500
            : 1000;


    const particleGeometry =
        new THREE.BufferGeometry();


    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const i3 =
            i * 3;

        particlePositions[i3] =
            (Math.random() - 0.5) *
            1200;

        particlePositions[i3 + 1] =
            (Math.random() - 0.5) *
            700;

        particlePositions[i3 + 2] =
            (Math.random() - 0.5) *
            900;
    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x9d7cff,

            size: 2.2,

            transparent: true,

            opacity: 0.35,

            sizeAttenuation: true
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* -----------------------------------------------------
       DIGITAL GRID
    ----------------------------------------------------- */

    const gridSize =
        1800;

    const gridDivisions =
        30;


    const grid =
        new THREE.GridHelper(
            gridSize,
            gridDivisions,
            0x00f0ff,
            0x111827
        );


    grid.material.transparent =
        true;

    grid.material.opacity =
        0.08;

    grid.position.y =
        -350;


    scene.add(grid);


    /* -----------------------------------------------------
       FLOATING WIREFRAME OBJECT
    ----------------------------------------------------- */

    const geometry =
        new THREE.IcosahedronGeometry(
            85,
            1
        );


    const material =
        new THREE.MeshBasicMaterial({

            color: 0x00f0ff,

            wireframe: true,

            transparent: true,

            opacity: 0.09
        });


    const wireObject =
        new THREE.Mesh(
            geometry,
            material
        );


    wireObject.position.set(
        280,
        80,
        -100
    );


    scene.add(wireObject);


    /* -----------------------------------------------------
       SECOND WIREFRAME
    ----------------------------------------------------- */

    const geometryTwo =
        new THREE.TorusKnotGeometry(
            65,
            3,
            100,
            12
        );


    const materialTwo =
        new THREE.MeshBasicMaterial({

            color: 0x8b5cff,

            wireframe: true,

            transparent: true,

            opacity: 0.08
        });


    const wireObjectTwo =
        new THREE.Mesh(
            geometryTwo,
            materialTwo
        );


    wireObjectTwo.position.set(
        -330,
        -100,
        -180
    );


    scene.add(wireObjectTwo);


    /* -----------------------------------------------------
       MOUSE
    ----------------------------------------------------- */

    let mouseX = 0;
    let mouseY = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            targetMouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5);

            targetMouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5);
        }
    );


    /* -----------------------------------------------------
       TOUCH
    ----------------------------------------------------- */

    window.addEventListener(
        "touchmove",
        (event) => {

            if (
                !event.touches ||
                !event.touches[0]
            ) {
                return;
            }

            targetMouseX =
                (event.touches[0].clientX /
                    window.innerWidth -
                    0.5);

            targetMouseY =
                (event.touches[0].clientY /
                    window.innerHeight -
                    0.5);
        },
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       ANIMATION
    ----------------------------------------------------- */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        /* Smooth mouse */

        mouseX +=
            (targetMouseX - mouseX) *
            0.025;

        mouseY +=
            (targetMouseY - mouseY) *
            0.025;


        /* Star movement */

        stars.rotation.y =
            elapsed * 0.006;

        stars.rotation.x =
            elapsed * 0.002;


        /* Particle movement */

        particles.rotation.y =
            -elapsed * 0.003;

        particles.rotation.x =
            mouseY * 0.04;


        /* Grid */

        grid.rotation.y =
            mouseX * 0.02;


        /* Wireframe objects */

        wireObject.rotation.x =
            elapsed * 0.15;

        wireObject.rotation.y =
            elapsed * 0.22;

        wireObject.position.y =
            80 +
            Math.sin(elapsed * 0.7) *
            25;


        wireObjectTwo.rotation.x =
            elapsed * 0.2;

        wireObjectTwo.rotation.y =
            -elapsed * 0.17;

        wireObjectTwo.position.y =
            -100 +
            Math.cos(elapsed * 0.8) *
            30;


        /* Camera mouse parallax */

        camera.position.x +=
            (
                mouseX * 45 -
                camera.position.x
            ) * 0.02;


        camera.position.y +=
            (
                -mouseY * 35 -
                camera.position.y
            ) * 0.02;


        camera.lookAt(
            0,
            0,
            0
        );


        renderer.render(
            scene,
            camera
        );
    }


    animate();


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    function resize() {

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


        renderer.setSize(
            width,
            height
        );
    }


    window.addEventListener(
        "resize",
        resize
    );


    /* -----------------------------------------------------
       TAB VISIBILITY
    ----------------------------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                renderer.setAnimationLoop(
                    null
                );

            } else {

                renderer.setAnimationLoop(
                    animate
                );
            }
        }
    );


    /* -----------------------------------------------------
       CLEANUP
    ----------------------------------------------------- */

    window.addEventListener(
        "beforeunload",
        () => {

            starGeometry.dispose();
            starMaterial.dispose();

            particleGeometry.dispose();
            particleMaterial.dispose();

            geometry.dispose();
            material.dispose();

            geometryTwo.dispose();
            materialTwo.dispose();

            renderer.dispose();
        }
    );

})();
