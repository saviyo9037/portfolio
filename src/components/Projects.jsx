import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Projects() {
  const repos = [
    "saviyo9037/crm_frontend",
    "saviyo9037/Rabbit",
    "saviyo9037/hospital_frontend",
  ];

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Promise.all(
      repos.map((repo) =>
        fetch(`https://api.github.com/repos/${repo}`).then((res) => res.json())
      )
    )
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <motion.section
      className="text-white py-12 sm:py-16 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    >
      <div className="mx-auto">

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          Open Source Projects
        </motion.h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group bg-slate-900 p-5 sm:p-6 rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                delay: index * 0.1,
              }}
            >
              {/* Repo Name */}
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {repo.name || "Unnamed Repository"}
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {repo.description || "No description available"}
              </p>

              {/* Bottom Stats */}
              <div className="flex justify-between text-sm opacity-90">
                <div className="flex gap-4">
                  <span>● {repo.language || "N/A"}</span>
                  <span>🍴 {repo.forks_count ?? 0}</span>
                  <span>⭐ {repo.stargazers_count ?? 0}</span>
                </div>

                <span>
                  {repo.size
                    ? `${(repo.size / 1024).toFixed(1)} MB`
                    : "—"}
                </span>
              </div>

              {/* Purple Hover Overlay */}
              <div
                className="absolute inset-0 bg-purple-700 opacity-0
                           group-hover:opacity-40 transition duration-300"
              />
            </motion.a>
          ))}
        </div>

      </div>
    </motion.section>
  );
}

export default Projects;
