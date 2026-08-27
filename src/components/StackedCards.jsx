import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const CARDS_DATA = [
  {
    id: 1,
    title: "Discover Your Vision",
    description:
      "We begin by understanding your core objectives and audience, defining a clear roadmap for your digital presence.",
    features: ["Market Research", "Brand Identity", "Strategic Planning"],
    color: "bg-zinc-900",
    border: "border-zinc-800",
    accent: "text-blue-400",
  },
  {
    id: 2,
    title: "Design with Purpose",
    description:
      "Creating intuitive and stunning interfaces that not only look beautiful but drive meaningful user engagement.",
    features: ["UI/UX Design", "Wireframing", "Interactive Prototypes"],
    color: "bg-zinc-950",
    border: "border-zinc-800",
    accent: "text-emerald-400",
  },
  {
    id: 3,
    title: "Develop for Scale",
    description:
      "Writing clean, performant, and scalable code to ensure your application runs flawlessly across all devices.",
    features: ["Modern Stack", "Performance Tuning", "Robust Architecture"],
    color: "bg-zinc-900",
    border: "border-zinc-800",
    accent: "text-purple-400",
  },
  {
    id: 4,
    title: "Launch & Iterate",
    description:
      "Deploying your project to the world and continuously optimizing it based on real user feedback and analytics.",
    features: ["Seamless Deployment", "A/B Testing", "Continuous Integration"],
    color: "bg-zinc-950",
    border: "border-zinc-800",
    accent: "text-amber-400",
  },
];

const StackedCards = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-[#09090B] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight mb-6">
          Our Proven Process
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
          We follow a structured, iterative approach to turn your ideas into
          successful digital products.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full">
        {CARDS_DATA.map((card, index) => {
          const targetScale = 1 - (CARDS_DATA.length - index) * 0.05;
          return (
            <Card
              key={card.id}
              card={card}
              index={index}
              progress={scrollYProgress}
              totalCards={CARDS_DATA.length}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

const Card = ({ card, index, progress, totalCards, targetScale }) => {
  // The progress goes from 0 to 1 over the whole container.
  // Card `i` starts scaling down when scroll passes its sticky point, which is at `i / (totalCards - 1)`.
  const startProgress = index / (totalCards - 1 || 1);
  const endProgress = 1;

  // We use useTransform to scale and dim the card as it goes to the back
  const scale = useTransform(
    progress,
    [startProgress, endProgress],
    [1, targetScale]
  );
  
  // Opacity fades out slightly to give a sense of depth
  const opacity = useTransform(
    progress,
    [startProgress, endProgress],
    [1, 0.4 + (index * 0.1)]
  );

  return (
    <div
      className="h-screen w-full flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{ scale, opacity, transformOrigin: "top center" }}
        className={`relative w-full max-w-4xl h-[60vh] sm:h-[50vh] md:h-[60vh] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between ${card.color} ${card.border} border shadow-2xl overflow-hidden`}
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

        <div className="flex-1 flex flex-col justify-center h-full z-10 w-full">
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700/50">
            <span className={`text-xl font-bold ${card.accent}`}>{card.id}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {card.title}
          </h3>
          <p className="text-zinc-400 text-lg mb-8 max-w-md">
            {card.description}
          </p>
          
          <ul className="space-y-3 mt-auto">
            {card.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-zinc-300">
                <FiCheckCircle className={`mr-3 ${card.accent}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-center h-full z-10">
           {/* Abstract illustration/placeholder for premium feel */}
           <div className={`w-full h-full rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center shadow-inner relative overflow-hidden group`}>
              <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white to-transparent transition-opacity duration-700 group-hover:opacity-40`} />
              <FiArrowRight className={`w-24 h-24 ${card.accent} opacity-20 -rotate-45 group-hover:rotate-0 transition-transform duration-700`} />
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StackedCards;
