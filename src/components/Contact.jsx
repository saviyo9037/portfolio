import React from "react";
import SocialIcons from "./SocialIcons";
import saviyo from "../assets/saviyo.jpeg";

function Contact() {
  return (
    <section className="text-white py-16 px-6">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Reach Out to me!
          </h1>

          <p className="text-gray-400 uppercase tracking-wide text-sm mb-4">
            Discuss a project or just want to say hi? My inbox is open for all.
          </p>

          <p className="text-lg italic mb-4">
            "MERN Stack Developer"
          </p>

          {/* <p className="text-gray-400 mb-2">📍 Remote</p> */}

          <p className="bg-blue-700 inline-block px-4 py-2 rounded mb-6">
            Open for opportunities: <span className="font-semibold">No</span>
          </p>

          {/* Social Icons */}
          <SocialIcons />
        </div>

        {/* RIGHT IMAGE (SMALL & CIRCULAR) */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative">
            <img
              src={saviyo}
              alt="Saviyo"
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-full object-cover
                         border-4 border-purple-600 shadow-lg"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;