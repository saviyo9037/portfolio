// GitHub project sync settings. This is the only file you need to edit.
export const GITHUB = {
  username: "saviyo9037",

  // Repo names (case-insensitive) to pin at the top as Featured.
  // Every other eligible repo appears automatically under "All projects".
  featured: ["money-tracking-app", "lms", "speech-ai"],

  // Repos that are D3innovatives company work. They are listed under Company, with no code or demo links.
  d3innovatives: ["awa", "rag-_testing"],

  // Repo names to never show (the profile repo and forks/archived/empty
  // repos are already skipped automatically).
  exclude: [
    "portfolio",
    "portfolio.",
    "shuttu",
    "Healthforecast",
    "helath",
    "BettaElegance",
    "rag-_testing",
    "RAG-_Testing",
    "demo_factory_food",
    "product_management_",
    "product-management",
    "product",
    "educase-assignment",
  ],

  // Any repo whose name (or title) contains one of these words is hidden too, whatever its exact name
  excludeMatching: ["sebin"],

  // The year shown for a project, when it should not be the year of its last GitHub update. Keys are repo names (lower case).
  years: {
    "garbage-classification": 2024,
    "frontend_ecosteps": 2025,
    "rabbit": 2025,
    "rabbit-ecommerce": 2025,
    "job-finder-frontend": 2025,
    "realtime_chatting_frontend": 2025,
    "event-management-system": 2025,
    "hospital_management": 2025,
    "hospital-management": 2025,
    "crm": 2025,
    "crm-live": 2025,
  },

  // A repo with no description, topics or live URL needs at least this much
  // content (in KB) to count as a real project.
  minSizeKbWithoutDetails: 30,

  // How long the browser reuses fetched data before asking again.
  cacheMinutes: 30,
};
