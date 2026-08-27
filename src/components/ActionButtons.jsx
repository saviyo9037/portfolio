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
        className="btn-tech-solid px-8 py-3.5 rounded-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        [ VIEW_PROJECTS ]
      </motion.button>

      {/* DOWNLOAD RESUME */}
      <motion.a
        href="/Saviyo_George_Resume.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="btn-tech px-8 py-3.5 rounded-sm text-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        [ DL_RESUME ]
      </motion.a>

    </div>
  );
}

export default ActionButtons;
