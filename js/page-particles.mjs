/**
 * Three.js particles + wireframe shapes for portfolio pages.
 *
 * Host anywhere: import with
 *   import { initParticleBackground } from new URL('./js/page-particles.mjs', import.meta.url);
 * so the module URL always matches the page (GitHub Pages /portfolio/, custom domain, etc.).
 * Three.js is loaded from jsDelivr over HTTPS.
 *
 * Note: Browsers often block ES modules on file:// — use any static server for local preview.
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

/**
 * @param {{ canvasId: string; variant?: number; fullPage?: boolean }} opts
 */
export function initParticleBackground({ canvasId, variant = 0, fullPage = false }) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const kp = [
        [8.5, 2.4, 128, 16],
        [7, 3, 120, 14],
        [9, 2.2, 140, 18],
        [6.5, 2.8, 100, 12]
    ];
    const [kP, kQ, kT, kR] = kp[variant % kp.length];

    const knotColors = [0xff4ecd, 0x22d3ee, 0xc084fc, 0xfbbf24];
    const innerColors = [0x22d3ee, 0xff4ecd, 0x34d399, 0xf472b6];

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 2, 0.1, 320);
    camera.position.set(0, 0, 44);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let count = isMobile ? 850 : 2300;
    if (reduceMotion) {
        count = Math.min(420, Math.floor(count * 0.32));
    }
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
        new THREE.Color(0xff2d95),
        new THREE.Color(0x22d3ee),
        new THREE.Color(0xa855f7),
        new THREE.Color(0xfbbf24),
        new THREE.Color(0x34d399)
    ];

    const seed = variant * 17.3;
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2 + seed * 0.01;
        const phi = Math.acos(2 * v - 1);
        const r = 10 + Math.random() * 34;
        const sinPhi = Math.sin(phi);
        positions[i * 3] = r * sinPhi * Math.cos(theta);
        positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: isMobile ? 0.15 : 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(kP, kQ, kT, kR),
        new THREE.MeshBasicMaterial({
            color: knotColors[variant % knotColors.length],
            wireframe: true,
            transparent: true,
            opacity: 0.13
        })
    );
    scene.add(knot);

    const inner = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.2, 1),
        new THREE.MeshBasicMaterial({
            color: innerColors[variant % innerColors.length],
            wireframe: true,
            transparent: true,
            opacity: 0.1
        })
    );
    scene.add(inner);

    const speed = (1 + variant * 0.08) * (reduceMotion ? 0.22 : 1);
    let t = variant * 0.5;
    let mx = 0;
    let my = 0;

    window.addEventListener(
        'pointermove',
        (e) => {
            mx = (e.clientX / window.innerWidth) * 2 - 1;
            my = (e.clientY / window.innerHeight) * 2 - 1;
        },
        { passive: true }
    );

    function resize() {
        const w = fullPage ? window.innerWidth : canvas.clientWidth;
        const h = fullPage ? window.innerHeight : canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', resize);
    }

    let running = true;
    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
    });

    function tick() {
        requestAnimationFrame(tick);
        if (!running) return;

        t += 0.0042 * speed;
        points.rotation.y = t * (0.36 + variant * 0.02);
        points.rotation.x = Math.sin(t * 0.21) * 0.11;
        points.rotation.z = Math.sin(t * 0.08 + variant) * 0.04;

        knot.rotation.x = t * 0.52;
        knot.rotation.y = t * 0.4;
        knot.rotation.z = t * 0.12;
        knot.material.opacity = 0.1 + Math.sin(t * 1.15 + variant) * 0.045;

        inner.rotation.y = -t * 0.46;
        inner.rotation.x = t * 0.26;
        inner.material.opacity = 0.08 + Math.sin(t * 0.85 + variant * 0.5) * 0.035;

        mat.opacity = 0.78 + Math.sin(t * 0.6) * 0.12;

        const parallax = reduceMotion ? 0 : fullPage ? 4.2 : 3.2;
        camera.position.x = mx * parallax;
        camera.position.y = my * (reduceMotion ? 0 : -2.1);
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    resize();
    tick();
}
