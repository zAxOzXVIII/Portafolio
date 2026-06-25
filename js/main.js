/**
 * Portafolio — Marden Adrian Barrera Rosales
 * Carga datos desde portfolio.json e i18n ES/EN
 */

const UI_STRINGS = {
  es: {
    skipToContent: "Saltar al contenido",
    navSkills: "Habilidades",
    navExperience: "Experiencia",
    navProjects: "Proyectos",
    navEducation: "Educación",
    navContact: "Contacto",
    heroGreeting: "Hola, soy",
    ctaCv: "Descargar CV",
    ctaContact: "Contacto",
    ctaGithub: "GitHub",
    sectionSkills: "Habilidades",
    sectionSkillsDesc: "Tecnologías y herramientas con las que trabajo",
    sectionExperience: "Experiencia",
    sectionExperienceDesc: "Trayectoria profesional",
    sectionProjects: "Proyectos",
    sectionProjectsDesc: "Trabajos destacados",
    sectionEducation: "Educación",
    sectionEducationDesc: "Formación académica",
    sectionContact: "Contacto",
    sectionContactDesc: "Conectemos",
    footerMade: "Hecho por",
    footerRights: "Todos los derechos reservados",
    footerYear: "©",
    currentBadge: "Actual",
    statusCompleted: "Completado",
    statusInProgress: "En progreso",
    pendingInstitution: "[PENDIENTE] Institución",
    projectPrivate: "Proyecto para cliente",
    projectRepo: "Repositorio",
    projectDemo: "Demo",
    contactGithub: "GitHub",
    contactLinkedin: "LinkedIn",
    contactWhatsapp: "WhatsApp",
    contactWhatsappAction: "Enviar mensaje",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    langGroup: "Idioma",
    navLabel: "Navegación principal"
  },
  en: {
    skipToContent: "Skip to content",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "Projects",
    navEducation: "Education",
    navContact: "Contact",
    heroGreeting: "Hi, I'm",
    ctaCv: "Download CV",
    ctaContact: "Contact",
    ctaGithub: "GitHub",
    sectionSkills: "Skills",
    sectionSkillsDesc: "Technologies and tools I work with",
    sectionExperience: "Experience",
    sectionExperienceDesc: "Professional journey",
    sectionProjects: "Projects",
    sectionProjectsDesc: "Featured work",
    sectionEducation: "Education",
    sectionEducationDesc: "Academic background",
    sectionContact: "Contact",
    sectionContactDesc: "Let's connect",
    footerMade: "Made by",
    footerRights: "All rights reserved",
    footerYear: "©",
    currentBadge: "Current",
    statusCompleted: "Completed",
    statusInProgress: "In progress",
    pendingInstitution: "[PENDING] Institution",
    projectPrivate: "Client project",
    projectRepo: "Repository",
    projectDemo: "Demo",
    contactGithub: "GitHub",
    contactLinkedin: "LinkedIn",
    contactWhatsapp: "WhatsApp",
    contactWhatsappAction: "Send message",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langGroup: "Language",
    navLabel: "Main navigation"
  }
};

let portfolioData = null;
let currentLang = "es";

function t(key) {
  return UI_STRINGS[currentLang][key] ?? UI_STRINGS.es[key] ?? key;
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

function resolveLocalized(value) {
  if (value && typeof value === "object" && (value.es || value.en)) {
    return value[currentLang] ?? value.es ?? value.en ?? "";
  }
  return value ?? "";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = String(text);
  return div.innerHTML;
}

async function loadPortfolio() {
  const response = await fetch("data/portfolio.json");
  if (!response.ok) throw new Error("No se pudo cargar portfolio.json");
  portfolioData = await response.json();
  currentLang = portfolioData.meta?.defaultLanguage ?? "es";
  const savedLang = localStorage.getItem("portfolio-lang");
  if (savedLang && portfolioData.meta?.languages?.includes(savedLang)) {
    currentLang = savedLang;
  }
}

function applyDesignTokens() {
  const colors = portfolioData?.design?.colors;
  if (!colors) return;
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
}

function applyI18nStatic() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  const nav = document.querySelector(".nav");
  nav?.setAttribute("aria-label", t("navLabel"));

  const langGroup = document.querySelector(".lang-switch");
  langGroup?.setAttribute("aria-label", t("langGroup"));

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function applyDataFields() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    const value = getNestedValue(portfolioData, el.dataset.field);
    el.textContent = resolveLocalized(value);
  });

  document.querySelectorAll("[data-field-href]").forEach((el) => {
    const value = getNestedValue(portfolioData, el.dataset.fieldHref);
    if (value) el.href = value;
  });
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = portfolioData.skills
    .map(
      (skill, index) => `
      <article class="skill-card reveal" role="listitem" style="transition-delay: ${index * 0.05}s">
        <h3 class="skill-card__title">${escapeHtml(resolveLocalized(skill.category))}</h3>
        <ul class="skill-card__list">
          ${skill.items
            .map((item) => `<li><span class="skill-tag">${escapeHtml(item)}</span></li>`)
            .join("")}
        </ul>
      </article>
    `
    )
    .join("");
}

function renderExperience() {
  const container = document.getElementById("experience-list");
  if (!container) return;

  container.innerHTML = portfolioData.experience
    .map(
      (job, index) => `
      <article class="timeline-item reveal" style="transition-delay: ${index * 0.08}s">
        <div class="timeline-item__header">
          <h3 class="timeline-item__company">
            ${escapeHtml(job.company)}
            ${job.current ? `<span class="timeline-item__badge">${escapeHtml(t("currentBadge"))}</span>` : ""}
          </h3>
          <time class="timeline-item__period">${escapeHtml(resolveLocalized(job.period.display))}</time>
        </div>
        <p class="timeline-item__role">${escapeHtml(resolveLocalized(job.role))}</p>
        <ul class="timeline-item__highlights">
          ${resolveLocalized(job.highlights)
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}
        </ul>
      </article>
    `
    )
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  container.innerHTML = portfolioData.projects
    .map((project, index) => {
      const links = project.links ?? {};
      const hasRepo = Boolean(links.repo);
      const hasDemo = Boolean(links.demo);
      const isPrivate = project.visibility !== "public";

      let footerHtml = "";
      if (hasRepo || hasDemo) {
        footerHtml = `
          <div class="project-card__links">
            ${hasRepo ? `<a class="project-card__link" href="${escapeHtml(links.repo)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projectRepo"))}</a>` : ""}
            ${hasDemo ? `<a class="project-card__link" href="${escapeHtml(links.demo)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projectDemo"))}</a>` : ""}
          </div>
        `;
      } else if (isPrivate) {
        footerHtml = `<p class="project-card__badge">${escapeHtml(t("projectPrivate"))}</p>`;
      }

      return `
        <article class="project-card reveal" role="listitem" style="transition-delay: ${index * 0.05}s">
          <h3 class="project-card__title">${escapeHtml(resolveLocalized(project.name))}</h3>
          <p class="project-card__desc">${escapeHtml(resolveLocalized(project.description))}</p>
          <div class="project-card__tech">
            ${project.technologies
              .map((tech) => `<span class="skill-tag">${escapeHtml(tech)}</span>`)
              .join("")}
          </div>
          ${footerHtml}
        </article>
      `;
    })
    .join("");
}

function renderEducation() {
  const container = document.getElementById("education-list");
  if (!container) return;

  container.innerHTML = portfolioData.education
    .map((edu, index) => {
      const institution = edu.institution ?? t("pendingInstitution");
      const period = resolveLocalized(edu.period?.display);
      const statusKey = edu.status === "in_progress" ? "statusInProgress" : "statusCompleted";
      const statusClass = edu.status === "in_progress" ? "in_progress" : "completed";

      return `
        <article class="education-item reveal" style="transition-delay: ${index * 0.08}s">
          <div>
            <h3 class="education-item__degree">${escapeHtml(resolveLocalized(edu.degree))}</h3>
            <p class="education-item__institution">${escapeHtml(institution)}</p>
          </div>
          <div class="education-item__meta">
            ${period ? `<time class="education-item__period">${escapeHtml(period)}</time>` : ""}
            <span class="education-item__status education-item__status--${statusClass}">${escapeHtml(t(statusKey))}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderContact() {
  const container = document.getElementById("contact-grid");
  const contact = portfolioData.contact;
  if (!container || !contact) return;

  const items = [
    { key: "github", label: t("contactGithub"), color: "#f5f5f5", value: contact.github.username, url: contact.github.url },
    { key: "linkedin", label: t("contactLinkedin"), color: "#0A66C2", value: contact.linkedin.display, url: contact.linkedin.url },
    { key: "whatsapp", label: t("contactWhatsapp"), color: "#25D366", value: t("contactWhatsappAction"), url: contact.whatsapp.url }
  ];

  container.innerHTML = items
    .map(
      (item) => `
      <a class="contact-card contact-card--${item.key}" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.label)}" style="--brand-color: ${item.color};">
        <span class="contact-card__icon" aria-hidden="true">
          <img src="assets/icons/${item.key}.svg" alt="" width="32" height="32" loading="lazy" decoding="async">
        </span>
        <p class="contact-card__label">${escapeHtml(item.label)}</p>
        <p class="contact-card__value">${escapeHtml(item.value)}</p>
      </a>
    `
    )
    .join("");
}

function renderAll() {
  applyDesignTokens();
  applyI18nStatic();
  applyDataFields();
  renderSkills();
  renderExperience();
  renderProjects();
  renderEducation();
  renderContact();

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setLanguage(lang) {
  if (!portfolioData?.meta?.languages?.includes(lang)) return;
  document.body.classList.add("is-changing-lang");
  currentLang = lang;
  localStorage.setItem("portfolio-lang", lang);
  renderAll();
  initScrollReveal();
  window.setTimeout(() => document.body.classList.remove("is-changing-lang"), 180);
}

function initLanguageSwitch() {
  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

function initMobileNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");

  if (!nav || !toggle || !menu) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", t("menuOpen"));
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? t("menuClose") : t("menuOpen"));
  });

  menu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = document.querySelectorAll(".reveal");

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => {
    el.classList.remove("is-visible");
    observer.observe(el);
  });
}

function initHeroTechCloud() {
  const container = document.getElementById("hero-tech-cloud");
  if (!container || !window.HeroTechIcons) return;

  window.HeroTechIcons.render(container);
  window.HeroTechIcons.initRepel(container);
  window.HeroTechIcons.initResize?.(container);
}

function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initCardSpotlight() {
  const cards = document.querySelectorAll(".skill-card, .project-card, .timeline-item, .education-item, .contact-card");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReduced || isCoarsePointer) return;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

async function init() {
  initHeroTechCloud();

  try {
    await loadPortfolio();
    renderAll();
    initLanguageSwitch();
    initMobileNav();
    initHeaderState();
    initCardSpotlight();
    initScrollReveal();
    initActiveNav();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div style="padding:1rem;background:#3f1d1d;color:#fca5a5;text-align:center;">Error al cargar los datos del portafolio.</div>`
    );
  }
}

document.addEventListener("DOMContentLoaded", init);
