/**
 * Iconos de tecnologías backend — SVG inline con colores de marca
 */

const HERO_TECH_ICONS = [
  {
    id: "php",
    name: "PHP",
    x: 14,
    y: 10,
    size: 52,
    delay: 0,
    duration: 4.4,
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="64" cy="64" rx="58" ry="30" fill="#777BB4"/><text x="64" y="72" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="28" font-weight="700">PHP</text></svg>`
  },
  {
    id: "laravel",
    name: "Laravel",
    x: 62,
    y: 6,
    size: 48,
    delay: 0.6,
    duration: 3.8,
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#FF2D20" d="M64 12L12 40v48l52 28 52-28V40L64 12zm0 12.5l38.5 20.8v37.4L64 103.5 25.5 82.7V45.3L64 24.5z"/><path fill="#FF2D20" d="M64 36L40 52v24l24 14 24-14V52L64 36zm0 10.2l12.8 7.4v12.8L64 72.2 51.2 64.6V53.6L64 46.2z"/></svg>`
  },
  {
    id: "python",
    name: "Python",
    x: 78,
    y: 38,
    size: 50,
    delay: 1.1,
    duration: 4.8,
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#3776AB" d="M63.4 14c-24.5 0-23 11.6-23 11.6v12h23.2v2.4H27.8S14 37.8 14 63.4c0 25.6 12.2 24.7 12.2 24.7h7.2v-11.8s-.4-12.2 11.8-12.2h20.4s11.4.2 11.4-11V25.6S88.4 14 63.4 14zM50.2 22.6a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8z"/><path fill="#FFD43B" d="M64.6 114c24.5 0 23-11.6 23-11.6V90.2H64.4v-2.4h35.8S114 90.2 114 64.6c0-25.6-12.2-24.7-12.2-24.7h-7.2v11.8s.4 12.2-11.8 12.2H62.4s-11.4-.2-11.4 11v20.4S39.6 114 64.6 114zm13.2-8.6a4.4 4.4 0 110-8.8 4.4 4.4 0 010 8.8z"/></svg>`
  },
  {
    id: "django",
    name: "Django",
    x: 8,
    y: 48,
    size: 46,
    delay: 0.3,
    duration: 5.2,
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="128" height="128" rx="12" fill="#092E20"/><text x="64" y="78" text-anchor="middle" fill="#44B78B" font-family="Georgia,serif" font-size="34" font-weight="700">dj</text></svg>`
  },
  {
    id: "nodejs",
    name: "Node.js",
    x: 42,
    y: 52,
    size: 54,
    delay: 1.8,
    duration: 4.1,
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#339933" d="M66.8 8.2c-2.2-1.2-4.8-1.2-7 0L18.6 30.4c-2.2 1.2-3.6 3.5-3.6 6.1v44.8c0 2.6 1.4 4.9 3.6 6.1l41.2 22.2c2.2 1.2 4.8 1.2 7 0l41.2-22.2c2.2-1.2 3.6-3.5 3.6-6.1V36.5c0-2.6-1.4-4.9-3.6-6.1L66.8 8.2z"/><path fill="#fff" d="M52 88V58l28 15-28 15z"/></svg>`
  },
  {
    id: "mysql",
    name: "MySQL",
    x: 72,
    y: 68,
    size: 50,
    delay: 0.9,
    duration: 4.6,
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#00758F" d="M64 18c-22 4-38 18-42 38 8-2 16-2 24 0-4-14 10-26 18-30z"/><path fill="#F29111" d="M64 18c8 4 22 16 18 30 8-2 16-2 24 0-4-20-20-34-42-38z"/><ellipse cx="64" cy="72" rx="44" ry="22" fill="#00758F"/><text x="64" y="78" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="16" font-weight="700">MySQL</text></svg>`
  },
  {
    id: "docker",
    name: "Docker",
    x: 22,
    y: 72,
    size: 52,
    delay: 1.4,
    duration: 3.6,
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#2496ED" d="M28 76h8v8h-8v-8zm10 0h8v8h-8v-8zm10 0h8v8h-8v-8zm-20-10h8v8h-8v-8zm10 0h8v8h-8v-8zm10 0h8v8h-8v-8zm10 0h8v8h-8v-8zm38 6c-4 8-12 14-22 16l-2 .4c-18 2-34-8-40-24 12 0 24-2 36-6 6-2 10-4 14-8l6 6c2 2 4 4 8 6 4 2 8 4 12 6z"/><path fill="#2496ED" d="M18 66h76v10H18z"/></svg>`
  }
];

function renderHeroTechCloud(container) {
  if (!container) return;

  container.innerHTML = HERO_TECH_ICONS.map(
    (icon) => `
    <div
      class="tech-icon"
      data-tech="${icon.id}"
      style="--x: ${icon.x}%; --y: ${icon.y}%; --size: ${icon.size}px; --delay: ${icon.delay}s; --duration: ${icon.duration}s;"
      title="${icon.name}"
    >
      <div class="tech-icon__float">
        ${icon.svg}
      </div>
    </div>
  `
  ).join("");
}

function initHeroIconRepel(container) {
  if (!container) return () => {};

  const icons = [...container.querySelectorAll(".tech-icon")];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReduced || isCoarsePointer) {
    container.classList.add("tech-cloud--static");
    return () => {};
  }

  const REPEL_RADIUS = 90;
  const REPEL_STRENGTH = 1.15;
  let mouse = { x: -9999, y: -9999 };
  let rafId = null;
  const offsets = new Map(icons.map((icon) => [icon, { x: 0, y: 0 }]));

  const update = () => {
    rafId = null;
    const rect = container.getBoundingClientRect();

    icons.forEach((icon) => {
      const iconRect = icon.getBoundingClientRect();
      const cx = iconRect.left + iconRect.width / 2 - rect.left;
      const cy = iconRect.top + iconRect.height / 2 - rect.top;

      const dx = cx - mouse.x;
      const dy = cy - mouse.y;
      const distance = Math.hypot(dx, dy);
      const offset = offsets.get(icon);

      let targetX = 0;
      let targetY = 0;

      if (distance < REPEL_RADIUS && distance > 0) {
        const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
        const nx = dx / distance;
        const ny = dy / distance;
        targetX = nx * force * REPEL_RADIUS * REPEL_STRENGTH * 0.45;
        targetY = ny * force * REPEL_RADIUS * REPEL_STRENGTH * 0.45;
      }

      offset.x += (targetX - offset.x) * 0.18;
      offset.y += (targetY - offset.y) * 0.18;
      icon.style.setProperty("--repel-x", `${offset.x}px`);
      icon.style.setProperty("--repel-y", `${offset.y}px`);
    });
  };

  const scheduleUpdate = () => {
    if (!rafId) rafId = requestAnimationFrame(update);
  };

  const onMove = (event) => {
    const rect = container.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    scheduleUpdate();
  };

  const onLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
    scheduleUpdate();
  };

  container.addEventListener("mousemove", onMove);
  container.addEventListener("mouseleave", onLeave);

  return () => {
    container.removeEventListener("mousemove", onMove);
    container.removeEventListener("mouseleave", onLeave);
    if (rafId) cancelAnimationFrame(rafId);
  };
}

window.HeroTechIcons = {
  render: renderHeroTechCloud,
  initRepel: initHeroIconRepel
};
