import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

function SocialIcons() {
  return (
    <div className="flex gap-4">
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
      className="w-12 h-12 border border-[var(--border-subtle)] text-[var(--text-dim)]
                 flex items-center justify-center text-lg cursor-pointer
                 hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] hover:border-[var(--text-main)]
                 transition-all duration-300"
    >
      {children}
    </a>
  );
}

export default SocialIcons;
