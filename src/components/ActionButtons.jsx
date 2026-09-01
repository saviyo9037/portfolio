import { motion } from "framer-motion";
import { FiArrowDown, FiDownload } from "react-icons/fi";

function ActionButtons() {
  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
      {/* VIEW PROJECTS */}
      <motion.button
        onClick={handleScrollToProjects}
        className="btn-tech-solid px-8 py-3.5 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>VIEW PROJECTS</span>
        <FiArrowDown className="text-sm" />
      </motion.button>

      {/* DOWNLOAD RESUME */}
      <motion.a
        href="/Saviyo_George_Resume.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="btn-tech px-8 py-3.5 text-center flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>DOWNLOAD CV</span>
        <FiDownload className="text-sm" />
      </motion.a>

    </div>
  );
}

export default ActionButtons;
