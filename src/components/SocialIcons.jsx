import { FaGithub, FaLinkedinIn, FaEnvelope, FaFacebookF } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function SocialIcons() {
  return (
    <div className="flex gap-4 mb-9 justify-center md:justify-start">
      <Icon bg="bg-gray-800"><FaGithub /></Icon>
      <Icon bg="bg-blue-600"><FaLinkedinIn /></Icon>
      <Icon bg="bg-red-500"><FaEnvelope /></Icon>
      <Icon bg="bg-yellow-500"><SiLeetcode /></Icon>
      <Icon bg="bg-blue-700"><FaFacebookF /></Icon>
    </div>
  );
}

function Icon({ children, bg }) {
  return (
    <div
      className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center 
                  text-white text-xl cursor-pointer
                  hover:scale-110 transition-transform duration-300`}
    >
      {children}
    </div>
  );
}

export default SocialIcons;
