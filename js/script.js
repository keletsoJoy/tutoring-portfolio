document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");
  const navLinks = document.querySelectorAll("#navMenu .nav-link");
  const sections = document.querySelectorAll("main section[id], header[id]");

  // Add a subtle shadow after scrolling.
  const updateNav = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    backToTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateNav);
  updateNav();

  // Smooth active navigation state.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`#navMenu .nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));

  // Close mobile navigation after selecting a section.
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Back to top.
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Animate feedback bars when they enter the viewport.
  const bars = document.querySelectorAll(".bar i");
  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width || "0";
        entry.target.style.width = `${width}%`;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => barObserver.observe(bar));

  // Reveal cards as they enter the viewport.
  const revealItems = document.querySelectorAll(
    ".stat-card, .dark-info-card, .method-card, .tech-card, .reflection-card, .evidence-card, .feedback-card"
  );
  revealItems.forEach(item => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => revealObserver.observe(item));
});
