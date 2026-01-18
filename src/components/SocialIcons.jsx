import { FaGithub, FaLinkedinIn, FaEnvelope, FaFacebookF, FaInstagram, FaPhone } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function SocialIcons() {
  return (
    <div className="flex gap-4 mb-9 justify-center md:justify-start">
      
      <Icon
        href="https://github.com/saviyo9037"
        bg="bg-gray-800"
        label="GitHub"
      >
        <FaGithub />
      </Icon>

      <Icon
        href="https://www.linkedin.com/in/saviyo-george-323470359/"
        bg="bg-blue-600"
        label="LinkedIn"
      >
        <FaLinkedinIn />
      </Icon>

      <Icon
        href="saviyogeorge903734@gmail.com"
        bg="bg-red-500"
        label="Email"
      >
        <FaEnvelope />
      </Icon>

      <Icon
        href="https://www.instagram.com/__s_avio____?igsh=MW80a21yYjlsOGNxbQ=="
        bg="bg-yellow-500"
        label="LeetCode"
      >
        <FaInstagram />
      </Icon>

      <Icon
        href="9037348073"
        bg="bg-blue-700"
        label="Facebook"
      >
        <FaPhone />
      </Icon>

    </div>
  );
}

function Icon({ children, bg, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center 
                  text-white text-xl cursor-pointer
                  hover:scale-110 transition-transform duration-300`}
    >
      {children}
    </a>
  );
}

export default SocialIcons;
