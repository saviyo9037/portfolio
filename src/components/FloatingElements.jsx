import React from "react";
import { motion } from "framer-motion";

const orbs = [
  {
    size: "w-[600px] h-[600px]",
    position: "top-[10%] -left-[200px]",
    gradient: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
  },
  {
    size: "w-[500px] h-[500px]",
    position: "top-[45%] -right-[150px]",
    gradient: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
  },
  {
    size: "w-[450px] h-[450px]",
    position: "bottom-[15%] left-[20%]",
    gradient: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
  },
];

function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient orbs using lightweight radial gradients */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${orb.size} ${orb.position}`}
          style={{
            background: orb.gradient,
            transform: "translateZ(0)",
          }}
        />
      ))}

      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Horizontal scan line — very subtle */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Ambient diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            rgba(255,255,255,0.5) 80px,
            rgba(255,255,255,0.5) 81px
          )`,
        }}
      />
    </div>
  );
}

export default FloatingElements;
