// BGrounded — small enhancements: sticky-nav state, mobile menu,
// reveal-on-scroll animations, and an always-current copyright year.

(function () {
  // Mark that JS is running — CSS only hides .reveal elements (for the
  // fade-up animation) when this class is present, so a missing script
  // can never leave the page blank.
  document.documentElement.classList.add("js");

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  // Add a subtle border/shadow to the nav once the page is scrolled.
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle.
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // Close the mobile menu when a link is chosen.
  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Reveal-on-scroll animations.
  const revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealables.forEach((el) => observer.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-visible"));
  }

  // Keep the footer year current.
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
