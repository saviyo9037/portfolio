import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function SocialIcons() {
  return (
    <motion.div
      className="flex gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Icon href="https://github.com/saviyo9037" label="GitHub" external>
        <FaGithub />
      </Icon>
      <Icon href="https://linkedin.com/in/saviyo-george" label="LinkedIn" external>
        <FaLinkedinIn />
      </Icon>
      <Icon href="mailto:saviyogeorge903734@gmail.com" label="Email">
        <FaEnvelope />
      </Icon>
      <Icon href="tel:+919037348073" label="Call">
        <FaPhone />
      </Icon>
    </motion.div>
  );
}

function Icon({ children, href, label, external }) {
  return (
    <motion.a
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      aria-label={label}
      className="w-12 h-12 border border-white/10 bg-white/5 text-slate-300 shadow-lg
                 flex items-center justify-center text-lg cursor-pointer
                 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                 transition-all duration-300 rounded-xl relative overflow-hidden group"
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="relative z-10"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

export default SocialIcons;
