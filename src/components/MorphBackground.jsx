import { useEffect, useRef } from "react";

const BLUE = "125, 211, 252";
const GOLD = Math.PI * (3 - Math.sqrt(5));

// ---- the shapes: each is a list of points (index order follows a continuous thread) in a unit cube ----
const sphere = (i, n) => {
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const th = i * 0.42;
  return [Math.cos(th) * r, y, Math.sin(th) * r];
};
const knot = (i, n) => {
  const t = (i / n) * Math.PI * 2;
  const r = Math.cos(3 * t) + 2;
  return [(r * Math.cos(2 * t)) / 3.2, (r * Math.sin(2 * t)) / 3.2, -Math.sin(3 * t) * 0.55];
};
const cube = (i, n) => {
  const [x, y, z] = sphere(i, n);
  const m = Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) || 1;
  return [(x / m) * 0.78, (y / m) * 0.78, (z / m) * 0.78];
};
const helix = (i, n) => {
  const t = (i / n) * Math.PI * 7;
  const phase = i % 2 === 0 ? 0 : Math.PI;
  return [Math.cos(t + phase) * 0.5, (i / n) * 2.1 - 1.05, Math.sin(t + phase) * 0.5];
};
const SHAPES = [sphere, knot, cube, helix, sphere]; // ends where it began, so the page loops

const smooth = (v) => v * v * (3 - 2 * v);

// A cloud of dots that changes shape as you move down the page: a sphere, a knot, a cube, a double helix, and back to the
// sphere. Where you are on the page decides the shape, on every page, whatever its height, and it runs backwards when
// you scroll up. The shape turns slowly, drifts across the screen, and bursts apart a little while it changes. A thin thread
// runs through the dots in order. Moving the pointer tilts it; a click gives it a push. Black, white and light blue only.
// It stops when the tab is hidden; for reduced motion it only follows the scroll position.
export default function MorphBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let baseR = 220;
    let n = 400;
    let shapes = [];
    let scatter = [];
    let frame = 0;
    let redraw = 0;
    const view = { ay: 0.4, ax: 0.35, spin: 0, base: 0, tx: 0, ty: 0, sp: 0 };

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 1 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const build = () => {
      n = w < 768 ? 220 : 440;
      shapes = SHAPES.map((fn) => Array.from({ length: n }, (_, i) => fn(i, n)));
      // a fixed random direction for each dot, used to scatter them while the shape changes
      scatter = Array.from({ length: n }, (_, i) => {
        const a = i * GOLD;
        const b = Math.sin(i * 12.9898) * 43758.5453;
        const z = (b - Math.floor(b)) * 2 - 1;
        const r = Math.sqrt(1 - z * z);
        return [Math.cos(a) * r, z, Math.sin(a) * r];
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      baseR = w < 768 ? Math.min(w * 0.44, h * 0.28) : Math.min(w, h) * 0.34;
      build();
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const phone = w < 768;
      const sp = view.sp;
      const cx = phone ? w / 2 + view.ty * 10 : w * (0.5 + 0.26 * Math.sin(sp * Math.PI * 3)) + view.ty * 18;
      const cy = phone ? h * (0.42 + 0.1 * Math.sin(sp * Math.PI * 3)) + view.tx * 8 : h * 0.5 + view.tx * 12;
      const R = baseR * (0.92 + 0.16 * Math.cos(sp * Math.PI * 5));

      // which two shapes we are between, and how far along the change is (it holds each shape for a while first)
      const seg = sp * (SHAPES.length - 1);
      const k = Math.min(SHAPES.length - 2, Math.floor(seg));
      const f = smooth(Math.min(1, Math.max(0, ((seg - k) - 0.35) / 0.65)));
      const burst = Math.sin(f * Math.PI) * 0.35; // how far the dots fly apart mid-change
      const A = shapes[k];
      const B = shapes[k + 1];

      const ca = Math.cos(view.ay);
      const sa = Math.sin(view.ay);
      const cb = Math.cos(view.ax);
      const sb = Math.sin(view.ax);
      const sweep = Math.sin(t * 0.0005 + sp * Math.PI * 4) * 0.9;

      const proj = new Array(n);
      for (let i = 0; i < n; i += 1) {
        const a = A[i];
        const b = B[i];
        const x = a[0] + (b[0] - a[0]) * f + scatter[i][0] * burst;
        const y = a[1] + (b[1] - a[1]) * f + scatter[i][1] * burst;
        const z = a[2] + (b[2] - a[2]) * f + scatter[i][2] * burst;
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        const y2 = y * cb - z1 * sb;
        const z2 = y * sb + z1 * cb;
        const persp = 1 / (1.9 - z2 * 0.5);
        proj[i] = { x: cx + x1 * R * persp * 1.9, y: cy + y2 * R * persp * 1.9, z: z2, lit: Math.abs(y2 - sweep) < 0.1 };
      }

      // the thread through the dots, in order (skipped where two neighbours are far apart)
      ctx.lineWidth = 0.7;
      const thread = new Path2D();
      const limit = R * 0.5;
      for (let i = 1; i < n; i += 1) {
        const a = proj[i - 1];
        const b = proj[i];
        if (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) < limit) {
          thread.moveTo(a.x, a.y);
          thread.lineTo(b.x, b.y);
        }
      }
      ctx.strokeStyle = `rgba(${BLUE}, 0.2)`;
      ctx.stroke(thread);

      for (const p of proj) {
        const depth = Math.min(1, Math.max(0, (p.z + 1.1) / 2.2));
        if (p.lit && !reduce) {
          ctx.fillStyle = `rgba(${BLUE}, ${0.6 + depth * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8 + depth * 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.14 + depth * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.6 + depth * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t) => {
      view.sp += (progress() - view.sp) * 0.09;
      view.spin *= 0.96;
      view.base += 0.0012 + view.spin;
      view.ay = view.base + view.sp * Math.PI * 4;
      view.ax += (0.3 + Math.sin(view.sp * Math.PI * 2) * 0.25 + view.ty * 0.3 - view.ax) * 0.05;
      draw(t);
      frame = window.requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || frame) return;
      frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const still = () => {
      view.sp = progress();
      view.ay = view.base + view.sp * Math.PI * 4;
      view.ax = 0.3 + Math.sin(view.sp * Math.PI * 2) * 0.25;
      draw(0);
    };
    const onScrollStill = () => {
      if (redraw) return;
      redraw = window.requestAnimationFrame(() => {
        redraw = 0;
        still();
      });
    };
    const onMove = (e) => {
      view.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      view.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onDown = () => {
      view.spin += 0.05;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      if (reduce) still();
    };

    resize();
    if (reduce) {
      still();
      window.addEventListener("scroll", onScrollStill, { passive: true });
    } else start();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.cancelAnimationFrame(redraw);
      window.removeEventListener("scroll", onScrollStill);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
