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
        fetch(`https://api.github.com/repos/${repo}`).then((res) =>
          res.json()
        )
      )
    )
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="relative bg-[#0b0b14] text-white py-24 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-purple-500">Projects</span>
        </motion.h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {projects.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="relative group bg-white/5 
                         backdrop-blur-xl 
                         border border-white/10 
                         rounded-3xl p-8 
                         shadow-2xl 
                         hover:shadow-purple-500/20 
                         transition duration-500"
            >

              {/* Glow Hover Effect */}
              <div className="absolute inset-0 bg-purple-600 
                              opacity-0 group-hover:opacity-10 
                              transition duration-500 rounded-3xl"></div>

              {/* Repo Name */}
              <h2 className="relative text-xl font-semibold mb-4">
                {repo.name || "Unnamed Repository"}
              </h2>

              {/* Description */}
              <p className="relative text-gray-300 mb-8 leading-relaxed text-sm">
                {repo.description || "No description available"}
              </p>

              {/* Stats */}
              <div className="relative flex justify-between items-center text-sm text-gray-400">

                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    ● {repo.language || "N/A"}
                  </span>

                  <span>🍴 {repo.forks_count ?? 0}</span>
                  <span>⭐ {repo.stargazers_count ?? 0}</span>
                </div>

                <span className="text-purple-400 font-medium">
                  {repo.size
                    ? `${(repo.size / 1024).toFixed(1)} MB`
                    : "—"}
                </span>
              </div>

            </motion.a>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Projects;
