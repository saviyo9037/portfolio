import React from "react";
import { motion } from "framer-motion";

const orbs = [
  {
    size: "w-[600px] h-[600px]",
    color: "bg-white/[0.02]",
    position: "top-[10%] -left-[200px]",
    animation: "float-orb-1",
    duration: "25s",
    blur: "blur-[120px]",
  },
  {
    size: "w-[500px] h-[500px]",
    color: "bg-white/[0.015]",
    position: "top-[40%] -right-[150px]",
    animation: "float-orb-2",
    duration: "30s",
    blur: "blur-[100px]",
  },
  {
    size: "w-[400px] h-[400px]",
    color: "bg-white/[0.025]",
    position: "bottom-[15%] left-[20%]",
    animation: "float-orb-3",
    duration: "35s",
    blur: "blur-[80px]",
  },
  {
    size: "w-[350px] h-[350px]",
    color: "bg-white/[0.01]",
    position: "top-[60%] right-[30%]",
    animation: "float-orb-1",
    duration: "28s",
    blur: "blur-[110px]",
  },
];

function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${orb.size} ${orb.color} ${orb.position} ${orb.blur}`}
          style={{
            animation: `${orb.animation} ${orb.duration} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

export default FloatingElements;
