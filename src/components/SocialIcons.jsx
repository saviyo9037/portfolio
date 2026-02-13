import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaInstagram,
  FaPhone,
} from "react-icons/fa";

function SocialIcons() {
  return (
    <div className="flex gap-4 mb-9 justify-center md:justify-start">

      <Icon
        href="https://github.com/saviyo9037"
        bg="bg-gray-800"
        label="GitHub"
        external
      >
        <FaGithub />
      </Icon>

      <Icon
        href="https://www.linkedin.com/in/saviyo-george-323470359/"
        bg="bg-blue-600"
        label="LinkedIn"
        external
      >
        <FaLinkedinIn />
      </Icon>

      {/* FIXED EMAIL */}
      <Icon
        href="mailto:saviyogeorge903734@gmail.com"
        bg="bg-red-500"
        label="Email"
      >
        <FaEnvelope />
      </Icon>

      <Icon
        href="https://www.instagram.com/__s_avio____"
        bg="bg-pink-500"
        label="Instagram"
        external
      >
        <FaInstagram />
      </Icon>

      {/* FIXED PHONE */}
      <Icon
        href="tel:+919037348073"
        bg="bg-green-600"
        label="Call"
      >
        <FaPhone />
      </Icon>

    </div>
  );
}

function Icon({ children, bg, href, label, external }) {
  return (
    <a
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
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
