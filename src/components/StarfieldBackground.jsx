import { useEffect, useRef } from "react";

const BLUE = "125, 211, 252";

// A starfield you fly through. Stars stream toward you from the middle of the screen; scroll the page and the
// ship accelerates (stars stretch into long streaks), move the pointer and the whole field steers toward it.
// Black, white and light blue only. It stops when the tab is hidden and draws once, still, for reduced motion.
export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let stars = [];
    let frame = 0;
    let last = 0;
    let scrollY = window.scrollY;
    let boost = 0; // how fast the page is being scrolled, smoothed
    const look = { x: 0, y: 0, tx: 0, ty: 0 }; // where the field is steered, -1 to 1

    const spawn = (s, far = false) => {
      s.x = (Math.random() * 2 - 1) * 1.6;
      s.y = (Math.random() * 2 - 1) * 1.6;
      s.z = far ? 1 : Math.random();
      s.blue = Math.random() < 0.18;
      return s;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 110 : 260;
      stars = Array.from({ length: count }, () => spawn({}));
    };

    const draw = (step) => {
      ctx.clearRect(0, 0, w, h);
      const fov = Math.max(w, h) * 0.55;
      const cx = w / 2 + look.x * w * 0.08;
      const cy = h / 2 + look.y * h * 0.08;
      const speed = reduce ? 0 : (0.0016 + boost * 0.0009) * step;
      const trail = 1 + boost * 6; // streak length, in "frames" of travel

      ctx.lineCap = "round";
      for (const s of stars) {
        const z0 = s.z + speed * trail;
        s.z -= speed;
        if (s.z <= 0.03) {
          spawn(s, true);
          continue;
        }
        const x1 = cx + (s.x / s.z) * fov * 0.5;
        const y1 = cy + (s.y / s.z) * fov * 0.5;
        if (x1 < -60 || x1 > w + 60 || y1 < -60 || y1 > h + 60) {
          spawn(s, true);
          continue;
        }
        const near = 1 - s.z;
        const alpha = Math.min(1, 0.15 + near * 1.1);
        const size = 0.4 + near * 2.1;
        ctx.strokeStyle = s.blue ? `rgba(${BLUE}, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        if (reduce || trail < 1.4) {
          // slow: a plain dot
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 + 0.01, y1);
        } else {
          const x0 = cx + (s.x / Math.min(1, z0)) * fov * 0.5;
          const y0 = cy + (s.y / Math.min(1, z0)) * fov * 0.5;
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
        }
        ctx.stroke();
      }
    };

    const loop = (time) => {
      const step = Math.min(3, (time - last) / 16.7 || 1);
      last = time;
      // scroll speed, smoothed and capped
      const dy = Math.abs(window.scrollY - scrollY);
      scrollY = window.scrollY;
      boost += (Math.min(dy / 40, 4) - boost) * 0.12;
      // steer toward the pointer, easing
      look.x += (look.tx - look.x) * 0.05;
      look.y += (look.ty - look.y) * 0.05;
      draw(step);
      frame = window.requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || frame) return;
      last = performance.now();
      scrollY = window.scrollY;
      frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onMove = (e) => {
      look.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      look.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };

    resize();
    if (reduce) draw(0);
    else start();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
