import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedux,
  SiReactquery,
  SiFlutter,
  SiDart,
  SiPython,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbApi, TbBrain, TbBrandReactNative } from "react-icons/tb";
import { FiMic, FiVolume2, FiCpu, FiCode } from "react-icons/fi";

// Official brand icons (Simple Icons) in their official colours. They sit on a
// light tile (see TechCard), so black/white brands are drawn near-black.
export const MONO_COLOR = "#15181d";
export const TECH_ICONS = {
  html5: { Icon: SiHtml5, color: "#E34F26" },
  css3: { Icon: SiCss3, color: "#1572B6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  react: { Icon: SiReact, color: "#61DAFB" },
  nextjs: { Icon: SiNextdotjs },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  bootstrap: { Icon: SiBootstrap, color: "#7952B3" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E" },
  express: { Icon: SiExpress },
  php: { Icon: SiPhp, color: "#777BB4" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  mysql: { Icon: SiMysql, color: "#4479A1" },
  postgresql: { Icon: SiPostgresql, color: "#4169E1" },
  redux: { Icon: SiRedux, color: "#764ABC" },
  tanstack: { Icon: SiReactquery, color: "#FF4154" },
  flutter: { Icon: SiFlutter, color: "#02569B" },
  dart: { Icon: SiDart, color: "#0175C2" },
  python: { Icon: SiPython, color: "#3776AB" },
  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub },
  postman: { Icon: SiPostman, color: "#FF6C37" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  vercel: { Icon: SiVercel },
  render: { Icon: SiRender },
  vscode: { Icon: VscVscode, color: "#007ACC" },
  // No brand exists for these, so they use neutral line icons.
  reactnative: { Icon: TbBrandReactNative, color: "#61DAFB" },
  api: { Icon: TbApi },
  ai: { Icon: FiCpu },
  stt: { Icon: FiMic },
  tts: { Icon: FiVolume2 },
  llm: { Icon: TbBrain },
};

export const FALLBACK_ICON = { Icon: FiCode };
