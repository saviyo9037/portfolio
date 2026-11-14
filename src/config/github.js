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

  // A repo with no description, topics or live URL needs at least this much
  // content (in KB) to count as a real project.
  minSizeKbWithoutDetails: 30,

  // How long the browser reuses fetched data before asking again.
  cacheMinutes: 30,
};
