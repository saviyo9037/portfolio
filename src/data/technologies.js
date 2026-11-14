// Technologies & Skills page data. This is the only file to edit when your
// stack changes.
//
//  - To ADD a technology: add an entry to TECHNOLOGIES, then add its id to a
//    category in TECH_CATEGORIES. Add an icon in src/components/tech/techIcons.js
//    (a generic code icon is used until you do).
//  - To REMOVE one: delete its id from the category (and the entry if unused).
//
// There are deliberately no skill levels or percentages. Each card shows
// evidence instead (see src/lib/techEvidence.js): the jobs and projects where
// the technology is actually listed, plus GitHub languages and topics.
//
// Optional per-technology fields:
//   match     names to look for in job skills, project tags and GitHub data
//   keywords  words to look for in project descriptions
//   urlHints  hosts to look for in live/repo links (e.g. "vercel.app")
//   status    "learning" shows a small "Learning" label on the card

export const TECHNOLOGIES = {
  html: { name: "HTML", icon: "html5", match: ["html", "html5"] },
  css: { name: "CSS", icon: "css3", match: ["css", "css3"] },
  javascript: { name: "JavaScript", icon: "javascript", match: ["javascript", "js", "es6"] },
  react: { name: "React.js", icon: "react", match: ["react", "reactjs"] },
  nextjs: { name: "Next.js", icon: "nextjs", match: ["next", "nextjs"] },
  tailwind: { name: "Tailwind CSS", icon: "tailwind", match: ["tailwind", "tailwindcss"] },
  bootstrap: { name: "Bootstrap", icon: "bootstrap", match: ["bootstrap"] },

  nodejs: { name: "Node.js", icon: "nodejs", match: ["node", "nodejs"] },
  express: { name: "Express.js", icon: "express", match: ["express", "expressjs"] },
  php: { name: "PHP", icon: "php", match: ["php"] },
  rest: { name: "REST APIs", icon: "api", match: ["restapi", "restapis", "restful", "restfulapis"] },

  mongodb: { name: "MongoDB", icon: "mongodb", match: ["mongodb", "mongoose"] },
  mysql: { name: "MySQL", icon: "mysql", match: ["mysql"] },
  postgresql: { name: "PostgreSQL", icon: "postgresql", match: ["postgresql", "postgres"] },

  redux: { name: "Redux Toolkit", icon: "redux", match: ["redux", "reduxtoolkit"] },
  tanstack: {
    name: "TanStack Query",
    icon: "tanstack",
    match: ["tanstackquery", "tanstackreactquery", "reactquery"],
  },

  flutter: { name: "Flutter", icon: "flutter", match: ["flutter"] },
  dart: { name: "Dart", icon: "dart", match: ["dart"] },
  reactnative: { name: "React Native", icon: "reactnative", match: ["reactnative"] },

  python: { name: "Python", icon: "python", match: ["python"] },

  git: { name: "Git", icon: "git", match: ["git"] },
  github: { name: "GitHub", icon: "github", match: ["github"], urlHints: ["github.com"] },
  postman: { name: "Postman", icon: "postman", match: ["postman"] },
  vscode: { name: "VS Code", icon: "vscode", match: ["vscode"] },
  docker: { name: "Docker", icon: "docker", match: ["docker"] },
  vercel: { name: "Vercel", icon: "vercel", match: ["vercel"], urlHints: ["vercel.app"] },
  render: { name: "Render", icon: "render", match: ["render"], urlHints: ["onrender.com"] },

  aiapi: {
    name: "AI API integration",
    icon: "ai",
    match: ["openai", "sarvamai", "aiapi"],
  },
  stt: {
    name: "Speech-to-Text",
    icon: "stt",
    match: ["stt", "speechtotext"],
    keywords: ["speech-to-text"],
  },
  tts: {
    name: "Text-to-Speech",
    icon: "tts",
    match: ["tts", "texttospeech"],
    keywords: ["tts synthesis", "text-to-speech"],
  },
  llm: {
    name: "LLM integration",
    icon: "llm",
    match: ["llm"],
    keywords: ["llm"],
  },
};

export const TECH_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Building responsive interfaces for the web.",
    items: ["html", "css", "javascript", "react", "nextjs", "tailwind", "bootstrap"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Server-side code and the APIs behind the interface.",
    items: ["nodejs", "express", "php", "rest"],
  },
  {
    id: "database",
    title: "Database",
    description: "Storing and querying application data.",
    items: ["mongodb", "mysql", "postgresql"],
  },
  {
    id: "state",
    title: "State Management & Data Fetching",
    description: "Keeping client state and server data in sync.",
    items: ["redux", "tanstack"],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Apps for phones.",
    items: ["flutter", "dart", "reactnative"],
  },
  {
    id: "languages",
    title: "Programming Languages",
    description: "Languages I write code in.",
    items: ["javascript", "python", "php", "dart"],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    description: "Version control, testing, containers and hosting.",
    items: ["git", "github", "postman", "vscode", "docker", "vercel", "render"],
  },
  {
    id: "ai",
    title: "AI & Integrations",
    description: "Connecting applications to AI services and speech.",
    items: ["aiapi", "stt", "tts", "llm"],
  },
];
