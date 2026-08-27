import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

function SocialIcons() {
  return (
    <div className="flex gap-4 justify-center md:justify-start">

      <Icon
        href="https://github.com/saviyo9037"
        label="GitHub"
        external
      >
        <FaGithub />
      </Icon>

      <Icon
        href="https://linkedin.com/in/saviyo-george"
        label="LinkedIn"
        external
      >
        <FaLinkedinIn />
      </Icon>

      <Icon
        href="mailto:saviyogeorge903734@gmail.com"
        label="Email"
      >
        <FaEnvelope />
      </Icon>

      <Icon
        href="tel:+919037348073"
        label="Call"
      >
        <FaPhone />
      </Icon>

    </div>
  );
}

function Icon({ children, href, label, external }) {
  return (
    <a
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      aria-label={label}
      className="w-12 h-12 border border-[#00F0FF] text-[#00F0FF] rounded-sm flex items-center justify-center 
                  text-xl cursor-pointer hover:bg-[#00F0FF]/10 transition-colors duration-300"
    >
      {children}
    </a>
  );
}

export default SocialIcons;
