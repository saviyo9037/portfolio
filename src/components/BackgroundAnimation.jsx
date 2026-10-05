import React, { useEffect, useRef } from "react";

/**
 * 3D Tech Galaxy Background Animation
 * 
 * - 36 labeled tech stack nodes in a 3D box [-1200..1200, -700..700, -800..800]
 * - 150 unlabeled dust points [-1600..1600, -900..900, -900..900]
 * - Manual perspective projection onto 2D canvas:
 *     zz = Z + 1500, s = 950 / zz, screenX = W/2 + X*s, screenY = H/2 + Y*s
 * - Smoothed mouse inertia & scroll-linked tilt:
 *     ay = time * 0.00006 + smoothedMouseX * 0.9 + (scrollY / innerHeight) * 0.45
 *     ax = smoothedMouseY * 0.4
 * - Proximity cursor interaction (<150px) with green tether, glow & halo
 * - Precomputed proximity edges (<600) with dynamic green data packets
 * - Dual drifting ambient glows (top-right & bottom-left)
 * - Theme-aware: renders with crisp contrast in light mode and dark mode
 * - Respects prefers-reduced-motion
 */

const TECH_NAMES = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "MySQL",
  "TypeScript", "Tailwind", "Redux", "TanStack", "JWT", "REST API",
  "WebSocket", "Socket.IO", "ESC/POS", "Docker", "Git", "PHP",
  "Python", "Flutter", "Dart", "Figma", "Vite", "npm",
  "SQL", "Postman", "SQLite", "Mongoose", "Axios", "RBAC",
  "GitHub", "JavaScript", "HTML5", "CSS3", "Barcode", "QR"
];

const DUST_COUNT = 150;
const MAX_PACKETS = 18;
const PACKET_SPAWN_INTERVAL = 26;
const EDGE_MAX_DISTANCE = 600;
const HOVER_MAX_DIST = 150;

function BackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = null;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse coordinates
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseNormX = 0;
    let targetMouseNormY = 0;
    let smoothedMouseX = 0;
    let smoothedMouseY = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Deterministic random generator for consistent layout
    let seed = 42;
    const randomRange = (min, max) => {
      seed = (seed * 9301 + 49297) % 233280;
      const rnd = seed / 233280;
      return min + rnd * (max - min);
    };

    // 1. Initialize 36 labeled nodes
    const nodes = TECH_NAMES.map((name) => ({
      name,
      x: randomRange(-1200, 1200),
      y: randomRange(-700, 700),
      z: randomRange(-800, 800),
      projX: 0,
      projY: 0,
      scale: 0,
      depth: 0,
      visible: false,
      isHovered: false,
    }));

    // 2. Initialize 150 dust points
    const dust = Array.from({ length: DUST_COUNT }, () => ({
      x: randomRange(-1600, 1600),
      y: randomRange(-900, 900),
      z: randomRange(-900, 900),
      size: randomRange(1, 2),
    }));

    // 3. Precompute edges (< 600 distance)
    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < EDGE_MAX_DISTANCE) {
          edges.push({ a: i, b: j, dist });
        }
      }
    }

    // 4. Data Packets
    const packets = [];
    let frameCount = 0;

    const spawnPacket = () => {
      if (edges.length === 0 || packets.length >= MAX_PACKETS) return;
      const edgeIdx = Math.floor(Math.random() * edges.length);
      const forward = Math.random() < 0.5;
      packets.push({ edgeIdx, forward, t: 0, speed: 0.014 });
    };

    // Event listeners
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetMouseNormX = (mouseX / Math.max(1, W) - 0.5) * 2;
      targetMouseNormY = (mouseY / Math.max(1, H) - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      targetMouseNormX = 0;
      targetMouseNormY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const render = (time) => {
      frameCount++;

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";

      // Smooth mouse lerp
      smoothedMouseX += (targetMouseNormX - smoothedMouseX) * 0.05;
      smoothedMouseY += (targetMouseNormY - smoothedMouseY) * 0.05;

      // Scroll-linked rotation
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollFraction = scrollY / Math.max(1, H);
      const ay = time * 0.00006 + smoothedMouseX * 0.9 + scrollFraction * 0.45;
      const ax = smoothedMouseY * 0.4;

      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);

      ctx.fillStyle = isDark ? "#000000" : "#FFFFFF";
      ctx.fillRect(0, 0, W, H);

      // ================= AMBIENT GLOWS =================
      // Top-right drifting emerald glow
      const g1X = W * 0.82 + Math.sin(time * 0.0003) * 90;
      const g1Y = H * 0.22;
      const grad1 = ctx.createRadialGradient(g1X, g1Y, 0, g1X, g1Y, 520);
      grad1.addColorStop(0, "rgba(57, 255, 136, 0.08)");
      grad1.addColorStop(1, "rgba(57, 255, 136, 0)");
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(g1X, g1Y, 520, 0, Math.PI * 2);
      ctx.fill();

      // Bottom-left subtle ambient glow
      const g2X = W * 0.12 + Math.cos(time * 0.0002) * 80;
      const g2Y = H * 0.85;
      const grad2 = ctx.createRadialGradient(g2X, g2Y, 0, g2X, g2Y, 480);
      grad2.addColorStop(0, "rgba(99, 102, 241, 0.06)");
      grad2.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(g2X, g2Y, 480, 0, Math.PI * 2);
      ctx.fill();

      // ================= DUST PARTICLES =================
      for (let i = 0; i < dust.length; i++) {
        const pt = dust[i];
        // Rotate Y
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;
        // Rotate X
        const y1 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        const zz = z2 + 1500;
        if (zz < 200) continue;

        const s = 950 / zz;
        const sx = W / 2 + x1 * s;
        const sy = H / 2 + y1 * s;

        if (sx >= -10 && sx <= W + 10 && sy >= -10 && sy <= H + 10) {
          const d = Math.max(0, Math.min(1, (2300 - zz) / 1500));
          const pSize = Math.max(1, Math.min(2, pt.size * s));
          ctx.fillStyle = isDark
            ? `rgba(240, 240, 240, ${d * 0.32})`
            : `rgba(71, 85, 105, ${d * 0.22})`;
          ctx.fillRect(sx, sy, pSize, pSize);
        }
      }

      // ================= LABELED TECH NODES PROJECTION =================
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // Rotate Y
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        // Rotate X
        const y1 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;

        const zz = z2 + 1500;
        if (zz < 200) {
          n.visible = false;
          continue;
        }

        const s = 950 / zz;
        n.scale = s;
        n.projX = W / 2 + x1 * s;
        n.projY = H / 2 + y1 * s;
        n.depth = Math.max(0, Math.min(1, (2300 - zz) / 1500));
        n.visible = true;

        const dist = Math.hypot(n.projX - mouseX, n.projY - mouseY);
        n.isHovered = dist < HOVER_MAX_DIST;
      }

      // ================= DRAW NETWORK EDGES =================
      ctx.lineWidth = 1;
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const nA = nodes[edge.a];
        const nB = nodes[edge.b];

        if (!nA.visible || !nB.visible) continue;

        const minDepth = Math.min(nA.depth, nB.depth);
        if (nA.isHovered || nB.isHovered) {
          ctx.strokeStyle = `rgba(57, 255, 136, ${Math.max(0.18, minDepth * 0.45)})`;
        } else {
          ctx.strokeStyle = isDark
            ? `rgba(240, 240, 240, ${minDepth * 0.17})`
            : `rgba(15, 23, 42, ${minDepth * 0.13})`;
        }

        ctx.beginPath();
        ctx.moveTo(nA.projX, nA.projY);
        ctx.lineTo(nB.projX, nB.projY);
        ctx.stroke();
      }

      // ================= DATA PACKETS =================
      if (!prefersReducedMotion && frameCount % PACKET_SPAWN_INTERVAL === 0) {
        spawnPacket();
      }

      ctx.shadowBlur = 14;
      ctx.shadowColor = "#39ff88";
      ctx.fillStyle = "#39ff88";

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;

        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const edge = edges[p.edgeIdx];
        const nA = nodes[p.forward ? edge.a : edge.b];
        const nB = nodes[p.forward ? edge.b : edge.a];

        if (!nA.visible || !nB.visible) {
          packets.splice(i, 1);
          continue;
        }

        const px = nA.projX + (nB.projX - nA.projX) * p.t;
        const py = nA.projY + (nB.projY - nA.projY) * p.t;

        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // ================= DRAW NODES & LABELS =================
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n.visible) continue;

        const baseRadius = 1.8 + 2.2 * n.scale;
        const radius = n.isHovered ? baseRadius * 1.5 : baseRadius;
        const fontSize = Math.max(8, 9 + 5 * n.scale);

        // Hover Line to Cursor & Soft Halo
        if (n.isHovered && mouseX > -1000) {
          ctx.strokeStyle = "rgba(57, 255, 136, 0.45)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.projX, n.projY);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();

          const haloGrad = ctx.createRadialGradient(n.projX, n.projY, 0, n.projX, n.projY, radius * 3.5);
          haloGrad.addColorStop(0, "rgba(57, 255, 136, 0.45)");
          haloGrad.addColorStop(1, "rgba(57, 255, 136, 0)");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(n.projX, n.projY, radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node Dot
        ctx.beginPath();
        ctx.arc(n.projX, n.projY, radius, 0, Math.PI * 2);

        if (n.isHovered) {
          ctx.shadowBlur = 16;
          ctx.shadowColor = "#39ff88";
          ctx.fillStyle = "#39ff88";
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          const alpha = Math.max(0.18, n.depth * 0.9);
          ctx.fillStyle = isDark
            ? `rgba(240, 240, 240, ${alpha})`
            : `rgba(15, 23, 42, ${alpha * 0.85})`;
          ctx.fill();
        }

        // Label in 'JetBrains Mono'
        ctx.font = `${Math.round(fontSize)}px 'JetBrains Mono', monospace`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const labelX = n.projX + radius + 5;
        const labelY = n.projY;

        if (n.isHovered) {
          ctx.fillStyle = isDark ? "#FFFFFF" : "#0F172A";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(57, 255, 136, 0.5)";
          ctx.fillText(n.name, labelX, labelY);
          ctx.shadowBlur = 0;
        } else {
          const textAlpha = Math.max(0.12, Math.min(0.85, n.depth * 0.8));
          ctx.fillStyle = isDark
            ? `rgba(240, 240, 240, ${textAlpha})`
            : `rgba(15, 23, 42, ${textAlpha * 0.8})`;
          ctx.fillText(n.name, labelX, labelY);
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(0);
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

export default BackgroundAnimation;
