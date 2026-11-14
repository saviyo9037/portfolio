// Smooth-scrolls through Lenis when it is running (App.jsx creates it), and
// falls back to the browser's own scrolling otherwise.
export function scrollToTop({ immediate = false } = {}) {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate, duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

// Home sections are separate views. Asking for one changes the address, and the page shows only that section.
const VIEW_IDS = ["introduction", "about", "experience", "skills", "projects", "education", "contact"];

export function scrollToId(id, { immediate = false, offset = -60 } = {}) {
  if (VIEW_IDS.includes(id) && window.location.pathname === "/classic") {
    window.history.pushState(null, "", id === "introduction" ? "/classic" : `/classic#${id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset, immediate, duration: 1.2 });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  return true;
}
