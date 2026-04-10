/**
 * Professional neon-tunnel style 3D canvas animation.
 * No external dependencies; works reliably on all pages.
 *
 * @param {{ canvasId: string; variant?: number; fullPage?: boolean }} opts
 */
export function initParticleBackground({ canvasId, variant = 0, fullPage = false }) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = reduceMotion ? 0.12 : 0.34;
    const starCount = reduceMotion ? 140 : isMobile ? 380 : 760;
    const tunnelCount = reduceMotion ? 16 : isMobile ? 24 : 34;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let running = true;
    let t = variant * 0.7;
    let mx = 0;
    let my = 0;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: (Math.random() * 2 - 1) * 1.2,
            y: (Math.random() * 2 - 1) * 1.2,
            z: Math.random(),
            c: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#ff4ecd' : '#a78bfa'
        });
    }

    function resize() {
        w = fullPage ? window.innerWidth : canvas.clientWidth;
        h = fullPage ? window.innerHeight : canvas.clientHeight;
        if (!w || !h) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = w * 0.5;
        cy = h * 0.5;
    }

    function drawStars() {
        for (const s of stars) {
            s.z -= 0.0026 * (1 + speed);
            if (s.z <= 0.02) s.z = 1;
            const p = 1 / s.z;
            const x = cx + (s.x + mx * 0.08) * w * 0.42 * p;
            const y = cy + (s.y + my * 0.08) * h * 0.38 * p;
            if (x < -20 || x > w + 20 || y < -20 || y > h + 20) {
                s.z = 1;
                continue;
            }
            const r = Math.max(0.4, Math.min(3.6, p * (isMobile ? 1.1 : 1.35)));
            ctx.globalAlpha = Math.min(0.85, 0.18 + p * 0.42);
            ctx.fillStyle = s.c;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    function drawTunnel() {
        const leftBias = -w * 0.11;
        for (let i = 0; i < tunnelCount; i++) {
            const z = ((i / tunnelCount) + (t * 0.045)) % 1;
            const p = 1.0 - z;
            const radius = (isMobile ? 58 : 82) + p * (isMobile ? 240 : 360);
            const x = cx + leftBias + mx * 24 * p;
            const y = cy + my * 16 * p;
            const alpha = (0.04 + p * 0.2) * (reduceMotion ? 0.7 : 1);
            const hueA = 285 + (variant * 11 + i * 3) % 36;
            const hueB = 198 + (variant * 7 + i * 4) % 26;

            ctx.lineWidth = 1 + p * 1.5;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = `hsla(${hueA}, 95%, 65%, 1)`;
            ctx.beginPath();
            ctx.ellipse(x, y, radius, radius * 0.62, t * 0.36 + i * 0.08, 0, Math.PI * 2);
            ctx.stroke();

            ctx.globalAlpha = alpha * 0.85;
            ctx.strokeStyle = `hsla(${hueB}, 92%, 65%, 1)`;
            ctx.beginPath();
            ctx.ellipse(x, y, radius * 0.72, radius * 0.45, -t * 0.28 - i * 0.06, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    function drawOrbitCore() {
        const baseX = cx - w * 0.18 + Math.sin(t * 0.42) * 14;
        const baseY = cy - h * 0.02 + Math.cos(t * 0.36) * 10;

        // Glowing center
        const g = ctx.createRadialGradient(baseX, baseY, 6, baseX, baseY, isMobile ? 80 : 110);
        g.addColorStop(0, 'rgba(255, 78, 205, 0.5)');
        g.addColorStop(0.45, 'rgba(80, 35, 150, 0.24)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(baseX, baseY, isMobile ? 86 : 116, 0, Math.PI * 2);
        ctx.fill();

        // Orbit rings
        for (let i = 0; i < 3; i++) {
            const r = (isMobile ? 62 : 94) + i * (isMobile ? 20 : 28);
            ctx.lineWidth = 1.1 + i * 0.2;
            ctx.globalAlpha = 0.22 - i * 0.04;
            ctx.strokeStyle = i % 2 === 0 ? '#ff4ecd' : '#22d3ee';
            ctx.beginPath();
            ctx.ellipse(baseX, baseY, r, r * (0.56 + i * 0.06), t * (0.5 - i * 0.12), 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    window.addEventListener(
        'pointermove',
        (e) => {
            mx = (e.clientX / window.innerWidth) * 2 - 1;
            my = (e.clientY / window.innerHeight) * 2 - 1;
        },
        { passive: true }
    );

    window.addEventListener('resize', resize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
    });

    function tick() {
        requestAnimationFrame(tick);
        if (!running || !w || !h) return;
        t += 0.016 * speed;
        ctx.clearRect(0, 0, w, h);
        drawStars();
        drawTunnel();
        drawOrbitCore();
    }

    resize();
    tick();
}
