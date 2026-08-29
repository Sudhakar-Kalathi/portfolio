(function () {
  const menuBtn = document.querySelector(".menu-toggle");
  const drawer = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = ["home", "about", "skills", "projects", "experience", "education", "certifications", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function closeDrawer() {
    if (!drawer || !menuBtn) return;
    drawer.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      const willOpen = drawer.hidden;
      drawer.hidden = !willOpen;
      menuBtn.setAttribute("aria-expanded", String(willOpen));
      menuBtn.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
    });
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
  );
  sections.forEach((section) => observer.observe(section));

  const cases = {
    chit: document.getElementById("case-chit"),
    learn: document.getElementById("case-learn"),
  };
  let lastFocus = null;

  function closeCases() {
    Object.values(cases).forEach((el) => {
      if (!el) return;
      el.classList.remove("open");
      el.setAttribute("hidden", "");
      el.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("locked");
    if (lastFocus) lastFocus.focus();
  }

  function openCase(key) {
    const el = cases[key];
    if (!el) return;
    Object.values(cases).forEach((other) => {
      if (!other || other === el) return;
      other.classList.remove("open");
      other.setAttribute("hidden", "");
    });
    el.removeAttribute("hidden");
    el.setAttribute("aria-hidden", "false");
    el.classList.add("open");
    document.body.classList.add("locked");
    const closeBtn = el.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
    el.querySelector(".case-scroll")?.scrollTo(0, 0);
  }

  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      lastFocus = btn;
      openCase(btn.getAttribute("data-open"));
    });
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", closeCases);
  });

  document.querySelectorAll("[data-switch]").forEach((btn) => {
    btn.addEventListener("click", () => openCase(btn.getAttribute("data-switch")));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!drawer?.hidden) closeDrawer();
      else if (Object.values(cases).some((el) => el && !el.hasAttribute("hidden"))) closeCases();
    }

    if (e.key !== "Tab") return;
    const activeCase = Object.values(cases).find((el) => el && !el.hasAttribute("hidden"));
    if (!activeCase) return;

    const focusable = [...activeCase.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((item) => !item.hasAttribute("hidden"));
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
