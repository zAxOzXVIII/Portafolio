/**
 * Iconos oficiales (Simple Icons) + física de repulsión sin pegado
 */

const HERO_TECH_ICONS = [
  { id: "php", name: "PHP", color: "#777BB4", x: 16, y: 16, size: 72, delay: 0, duration: 7.2 },
  { id: "laravel", name: "Laravel", color: "#FF2D20", x: 84, y: 14, size: 70, delay: 0.8, duration: 6.4 },
  { id: "python", name: "Python", color: "#3776AB", x: 90, y: 50, size: 72, delay: 1.6, duration: 7.8 },
  { id: "django", name: "Django", color: "#44B78B", x: 10, y: 52, size: 68, delay: 0.4, duration: 8.2 },
  { id: "nodejs", name: "Node.js", color: "#339933", x: 50, y: 48, size: 78, delay: 2.0, duration: 6.8 },
  { id: "mysql", name: "MySQL", color: "#4479A1", x: 84, y: 86, size: 70, delay: 1.2, duration: 7.4 },
  { id: "docker", name: "Docker", color: "#2496ED", x: 16, y: 86, size: 72, delay: 2.4, duration: 6.2 }
];

const PHYSICS = {
  repelRadius: 130,
  repelStrength: 58,
  spring: 0.05,
  damping: 0.8,
  separationPadding: 16,
  maxOffset: 56,
  hoverLift: 10
};

let activeCleanup = null;
let resizeCleanup = null;

function getResponsiveScale() {
  const width = window.innerWidth;
  if (width < 400) return 0.68;
  if (width < 768) return 0.8;
  if (width < 1024) return 0.9;
  return 1;
}

function getResponsivePosition(x, y, scale) {
  if (scale >= 0.9) return { x, y };
  const pull = 0.88;
  return {
    x: 50 + (x - 50) * pull,
    y: 50 + (y - 50) * pull
  };
}

function renderHeroTechCloud(container) {
  if (!container) return;

  const scale = getResponsiveScale();

  container.innerHTML = HERO_TECH_ICONS.map((icon) => {
    const size = Math.round(icon.size * scale);
    const pos = getResponsivePosition(icon.x, icon.y, scale);

    return `
    <button
      type="button"
      class="tech-icon"
      data-tech="${icon.id}"
      data-label="${icon.name}"
      data-base-x="${pos.x}"
      data-base-y="${pos.y}"
      data-size="${size}"
      aria-label="${icon.name}"
      style="--x: ${pos.x}%; --y: ${pos.y}%; --size: ${size}px; --delay: ${icon.delay}s; --duration: ${icon.duration}s; --brand-color: ${icon.color};"
    >
      <span class="tech-icon__float">
        <img
          class="tech-icon__logo"
          src="assets/icons/${icon.id}.svg"
          alt=""
          width="56"
          height="56"
          loading="eager"
          decoding="async"
        >
      </span>
      <span class="tech-icon__label">${icon.name}</span>
    </button>
  `;
  }).join("");
}

function initHeroTechCloudResize(container) {
  if (resizeCleanup) resizeCleanup();

  let resizeTimer = null;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      renderHeroTechCloud(container);
      initHeroIconRepel(container);
    }, 160);
  };

  window.addEventListener("resize", onResize, { passive: true });
  resizeCleanup = () => {
    window.removeEventListener("resize", onResize);
    clearTimeout(resizeTimer);
    resizeCleanup = null;
  };
}

function initHeroIconRepel(container) {
  if (!container) return () => {};

  if (activeCleanup) activeCleanup();

  const icons = [...container.querySelectorAll(".tech-icon")];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReduced || isCoarsePointer) {
    container.classList.add("tech-cloud--static");
    initTouchSelection(icons);
    return () => {};
  }

  const state = icons.map((el) => ({
    el,
    baseX: Number(el.dataset.baseX),
    baseY: Number(el.dataset.baseY),
    size: Number(el.dataset.size),
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    hovered: false,
    active: false
  }));

  let mouse = { x: -9999, y: -9999, inside: false };
  let rafId = null;

  const getBaseCenter = (item, rect) => ({
    x: (item.baseX / 100) * rect.width,
    y: (item.baseY / 100) * rect.height
  });

  const getCenter = (item, rect) => {
    const base = getBaseCenter(item, rect);
    return { x: base.x + item.x, y: base.y + item.y };
  };

  const applyTransform = (item) => {
    const scale = item.hovered ? 1.14 : item.active ? 1.1 : 1;
    const lift = item.hovered ? -PHYSICS.hoverLift : 0;
    item.el.style.setProperty("--repel-x", `${item.x}px`);
    item.el.style.setProperty("--repel-y", `${item.y + lift}px`);
    item.el.style.setProperty("--icon-scale", String(scale));
    item.el.classList.toggle("is-hovered", item.hovered);
    item.el.classList.toggle("is-active", item.active);
  };

  const tick = () => {
    rafId = requestAnimationFrame(tick);
    const rect = container.getBoundingClientRect();
    if (!rect.width) return;

    state.forEach((item) => {
      const center = getCenter(item, rect);
      let fx = 0;
      let fy = 0;

      if (mouse.inside) {
        const dx = center.x - mouse.x;
        const dy = center.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < PHYSICS.repelRadius && dist > 0.001) {
          const force = (1 - dist / PHYSICS.repelRadius) * PHYSICS.repelStrength;
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
      }

      fx -= item.x * PHYSICS.spring;
      fy -= item.y * PHYSICS.spring;

      item.vx = (item.vx + fx) * PHYSICS.damping;
      item.vy = (item.vy + fy) * PHYSICS.damping;
      item.x += item.vx;
      item.y += item.vy;

      const offset = Math.hypot(item.x, item.y);
      if (offset > PHYSICS.maxOffset) {
        const ratio = PHYSICS.maxOffset / offset;
        item.x *= ratio;
        item.y *= ratio;
        item.vx *= 0.5;
        item.vy *= 0.5;
      }

      applyTransform(item);
    });

    for (let i = 0; i < state.length; i += 1) {
      for (let j = i + 1; j < state.length; j += 1) {
        const a = state[i];
        const b = state[j];
        const aCenter = getCenter(a, rect);
        const bCenter = getCenter(b, rect);
        const dx = bCenter.x - aCenter.x;
        const dy = bCenter.y - aCenter.y;
        const dist = Math.hypot(dx, dy);
        const minDist = (a.size + b.size) / 2 + PHYSICS.separationPadding;

        if (dist > 0.001 && dist < minDist) {
          const push = (minDist - dist) * 0.24;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * push;
          a.y -= ny * push;
          b.x += nx * push;
          b.y += ny * push;
        }
      }
    }
  };

  const onMove = (event) => {
    const rect = container.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.inside = true;
  };

  const onLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
    mouse.inside = false;
  };

  icons.forEach((el, index) => {
    el.addEventListener("mouseenter", () => {
      state[index].hovered = true;
      el.style.zIndex = "5";
    });

    el.addEventListener("mouseleave", () => {
      state[index].hovered = false;
      el.style.zIndex = state[index].active ? "4" : "1";
    });

    el.addEventListener("click", () => {
      const isActive = state[index].active;
      state.forEach((item) => {
        item.active = false;
        item.el.style.zIndex = "1";
      });
      state[index].active = !isActive;
      if (state[index].active) el.style.zIndex = "6";
    });

    el.addEventListener("focus", () => {
      state[index].hovered = true;
    });

    el.addEventListener("blur", () => {
      state[index].hovered = false;
      if (!state[index].active) el.style.zIndex = "1";
    });
  });

  container.addEventListener("mousemove", onMove);
  container.addEventListener("mouseleave", onLeave);
  rafId = requestAnimationFrame(tick);

  activeCleanup = () => {
    container.removeEventListener("mousemove", onMove);
    container.removeEventListener("mouseleave", onLeave);
    if (rafId) cancelAnimationFrame(rafId);
    activeCleanup = null;
  };

  return activeCleanup;
}

function initTouchSelection(icons) {
  icons.forEach((el) => {
    el.addEventListener("click", () => {
      icons.forEach((icon) => icon.classList.remove("is-active"));
      el.classList.toggle("is-active");
    });
  });
}

window.HeroTechIcons = {
  render: renderHeroTechCloud,
  initRepel: initHeroIconRepel,
  initResize: initHeroTechCloudResize
};
