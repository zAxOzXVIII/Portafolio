/**
 * Fondo ambiental — orbes con parallax suave al mover el cursor
 */

function initAmbientBackground() {
  const bg = document.querySelector(".site-bg");
  if (!bg) return;

  const orbs = [...bg.querySelectorAll(".site-bg__orb")];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReduced || isCoarsePointer || !orbs.length) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  const factors = [0.018, -0.014, 0.022, -0.01, 0.016];

  const tick = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    orbs.forEach((orb, index) => {
      const factor = factors[index % factors.length];
      const x = currentX * factor * 100;
      const y = currentY * factor * 100;
      orb.style.setProperty("--parallax-x", `${x}px`);
      orb.style.setProperty("--parallax-y", `${y}px`);
    });

    rafId = requestAnimationFrame(tick);
  };

  const onMove = (event) => {
    const nx = (event.clientX / window.innerWidth - 0.5) * 2;
    const ny = (event.clientY / window.innerHeight - 0.5) * 2;
    targetX = nx;
    targetY = ny;
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  rafId = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener("mousemove", onMove);
    if (rafId) cancelAnimationFrame(rafId);
  };
}

document.addEventListener("DOMContentLoaded", initAmbientBackground);
