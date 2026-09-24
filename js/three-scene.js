javascript
export function initThreeScene() {

    const canvas =
        document.querySelector("#webgl");


    if (!canvas || !window.THREE) {
        return;
    }


    /* =====================================================
       SCENE
    ====================================================== */

    const scene =
        new THREE.Scene();


    /* =====================================================
       CAMERA
    ====================================================== */

    const camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth /
            window.innerHeight,
            .1,
            100
        );


    camera.position.z = 7;


    /* =====================================================
       RENDERER
    ====================================================== */

    const renderer =
        new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
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


    /* =====================================================
       CORE
    ====================================================== */

    const core =
        new THREE.Group();


    scene.add(core);


    /* =====================================================
       MAIN WIREFRAME
    ====================================================== */

    const coreGeometry =
        new THREE.IcosahedronGeometry(
            1.5,
            4
        );


    const coreMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: .18
        });


    const coreMesh =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    core.add(coreMesh);


    /* =====================================================
       INNER CORE
    ====================================================== */

    const innerGeometry =
        new THREE.IcosahedronGeometry(
            .95,
            3
        );


    const innerMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: .25
        });


    const innerMesh =
        new THREE.Mesh(
            innerGeometry,
            innerMaterial
        );


    core.add(innerMesh);


    /* =====================================================
       ORBITAL RINGS
    ====================================================== */

    const rings = [];


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const geometry =
            new THREE.TorusGeometry(
                2 + i * .35,
                .008,
                16,
                160
            );


        const material =
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: .1
            });


        const ring =
            new THREE.Mesh(
                geometry,
                material
            );


        ring.rotation.x =
            Math.random() * Math.PI;

        ring.rotation.y =
            Math.random() * Math.PI;

        ring.rotation.z =
            Math.random() * Math.PI;


        core.add(ring);

        rings.push(ring);

    }


    /* =====================================================
       PARTICLES
    ====================================================== */

    const count = 3500;


    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const radius =
            3 +
            Math.random() * 5;


        const theta =
            Math.random() *
            Math.PI *
            2;


        const phi =
            Math.acos(
                2 *
                Math.random() -
                1
            );


        positions[i * 3] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);


        positions[i * 3 + 1] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);


        positions[i * 3 + 2] =
            radius *
            Math.cos(phi);

    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xffffff,

            size: .025,

            transparent: true,

            opacity: .6

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* =====================================================
       MOUSE
    ====================================================== */

    let mouseX = 0;
    let mouseY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX /
                window.innerWidth -
                .5;


            mouseY =
                event.clientY /
                window.innerHeight -
                .5;

        }
    );


    /* =====================================================
       SCROLL
    ====================================================== */

    let scrollProgress = 0;


    ScrollTrigger.create({

        start: 0,

        end: "max",

        onUpdate: self => {

            scrollProgress =
                self.progress;

        }

    });


    /* =====================================================
       ANIMATION
    ====================================================== */

    const clock =
        new THREE.Clock();


    function render() {

        requestAnimationFrame(render);


        const time =
            clock.getElapsedTime();


        /* Core */

        coreMesh.rotation.x =
            time * .08;

        coreMesh.rotation.y =
            time * .12;


        /* Inner */

        innerMesh.rotation.x =
            -time * .1;

        innerMesh.rotation.y =
            -time * .15;


        /* Rings */

        rings.forEach(
            (ring, index) => {

                ring.rotation.x +=
                    .0005 *
                    (index + 1);

                ring.rotation.y +=
                    .0008 *
                    (index + 1);

            }
        );


        /* Particles */

        particles.rotation.y =
            time * .012;


        particles.rotation.x =
            Math.sin(time * .2) *
            .08;


        /* Mouse */

        core.rotation.y +=
            (
                mouseX * .5 -
                core.rotation.y
            ) * .025;


        core.rotation.x +=
            (
                -mouseY * .35 -
                core.rotation.x
            ) * .025;


        /* Scroll */

        core.rotation.z =
            scrollProgress *
            Math.PI *
            2;


        core.position.y =
            Math.sin(time * .5) *
            .1;


        /* Camera */

        camera.position.x +=
            (
                mouseX * .4 -
                camera.position.x
            ) * .02;


        camera.position.y +=
            (
                -mouseY * .3 -
                camera.position.y
            ) * .02;


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


    render();


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );


            ScrollTrigger.refresh();

        }
    );

}

