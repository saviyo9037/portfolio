import { motion } from "framer-motion";

function ActionButtons() {
  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      
      {/* VIEW PROJECTS */}
      <motion.button
        onClick={handleScrollToProjects}
        className="btn-gradient px-8 py-3.5 text-white font-semibold rounded-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Projects
      </motion.button>

      {/* DOWNLOAD RESUME */}
      <motion.a
        href="/Saviyo_George_Resume.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="border-2 border-indigo-500/50 px-8 py-3.5 text-white font-semibold rounded-xl
                   hover:bg-indigo-500/20 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download Resume
      </motion.a>

    </div>
  );
}

export default ActionButtons;
