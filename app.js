/* =========================================================
   The History of AI — neuron-pathway horizontal timeline
   ========================================================= */

const brain = document.getElementById("brain");
const nodesEl = document.getElementById("nodes");
const svg = document.getElementById("paths");
const scrollEl = document.getElementById("scroll");

/* ---------- Layout geometry ---------- */
const SPACING = 300;   // horizontal distance between somata
const MARGIN_X = 200;  // padding at both ends
const BASE_Y = 380;    // vertical centre of the meander
const BRAIN_H = 760;

// Deterministic pseudo-random so the "organic" layout is stable across loads
function makeRng(seed) {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}
const rand = makeRng(20231043);

// A point per paper, meandering like an axon
const points = PAPERS.map((p, i) => {
  const x = MARGIN_X + i * SPACING;
  const y =
    BASE_Y +
    Math.sin(i * 0.72) * 135 +
    Math.sin(i * 0.31 + 1.3) * 64 +
    Math.cos(i * 1.27) * 28;
  return { x, y, p, i };
});

const BRAIN_W = MARGIN_X * 2 + (PAPERS.length - 1) * SPACING;
brain.style.width = BRAIN_W + "px";
brain.style.height = BRAIN_H + "px";
svg.setAttribute("viewBox", `0 0 ${BRAIN_W} ${BRAIN_H}`);
svg.setAttribute("width", BRAIN_W);
svg.setAttribute("height", BRAIN_H);

/* ---------- Smooth path through the points (Catmull-Rom → Bézier) ---------- */
function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}
const trunkD = smoothPath(points);

/* ---------- Decorative dendrite filaments off each soma ---------- */
function buildBranches() {
  let paths = "";
  let dots = "";
  for (const pt of points) {
    const count = 1 + Math.floor(rand() * 2); // 1–2 filaments
    for (let k = 0; k < count; k++) {
      const dir = rand() < 0.5 ? -1 : 1;
      const len = 55 + rand() * 95;
      const ang = (-Math.PI / 2) * dir + (rand() - 0.5) * 1.3;
      const ex = pt.x + Math.cos(ang) * len;
      const ey = pt.y + Math.sin(ang) * len;
      const cx = pt.x + Math.cos(ang) * len * 0.4 + (rand() - 0.5) * 50;
      const cy = pt.y + Math.sin(ang) * len * 0.4 + (rand() - 0.5) * 50;
      paths += `<path class="branch" d="M ${pt.x.toFixed(1)},${pt.y.toFixed(1)} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}"/>`;
      dots += `<circle class="terminal" cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="2.2"/>`;
      // occasional secondary twig
      if (rand() < 0.4) {
        const ex2 = ex + (rand() - 0.5) * 70;
        const ey2 = ey + Math.sin(ang) * (25 + rand() * 35);
        paths += `<path class="branch faint" d="M ${ex.toFixed(1)},${ey.toFixed(1)} Q ${((ex + ex2) / 2).toFixed(1)},${((ey + ey2) / 2 - 14).toFixed(1)} ${ex2.toFixed(1)},${ey2.toFixed(1)}"/>`;
        dots += `<circle class="terminal faint" cx="${ex2.toFixed(1)}" cy="${ey2.toFixed(1)}" r="1.6"/>`;
      }
    }
  }
  return paths + dots;
}

/* ---------- Compose the SVG ---------- */
svg.innerHTML = `
  <defs>
    <linearGradient id="axon" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="0.5" stop-color="#6366f1"/>
      <stop offset="1" stop-color="#a855f7"/>
    </linearGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
  </defs>
  <g class="dendrites">${buildBranches()}</g>
  <path class="trunk-glow" d="${trunkD}"/>
  <path class="trunk" d="${trunkD}"/>
  <path class="signal" d="${trunkD}"/>
`;

/* ---------- Render the nodes (always show number + title + author) ---------- */
nodesEl.innerHTML = points
  .map(({ x, y, p, i }) => {
    const num = String(i + 1).padStart(2, "0");
    const side = i % 2 === 0 ? "up" : "down"; // alternate label above / below
    return `
      <button class="syn ${side}" style="left:${x}px; top:${y}px" data-i="${i}"
              aria-label="${p.year} — ${p.title}">
        <span class="label">
          <span class="yr">${p.year}</span>
          <span class="ttl">${p.title}</span>
          <span class="auth">${p.authors}</span>
        </span>
        <span class="stem"></span>
        <span class="soma"><span class="num">${num}</span></span>
      </button>`;
  })
  .join("");

/* ---------- Modal ---------- */
const modal = document.getElementById("modal");
const mNum = document.getElementById("m-num");
const mYear = document.getElementById("m-year");
const mTag = document.getElementById("m-tag");
const mTitle = document.getElementById("m-title");
const mAuthors = document.getElementById("m-authors");
const mBlurb = document.getElementById("m-blurb");
const mVenue = document.getElementById("m-venue");
const mLink = document.getElementById("m-link");

function openModal(i) {
  const p = PAPERS[i];
  mNum.textContent = String(i + 1).padStart(2, "0");
  mYear.textContent = p.year;
  mTag.textContent = p.tag;
  mTitle.textContent = p.title;
  mAuthors.textContent = p.authors;
  mBlurb.textContent = p.blurb;
  mVenue.textContent = `${p.venue} · ${p.year}`;
  mLink.href = p.url;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("show"));
}
function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => (modal.hidden = true), 220);
}

nodesEl.addEventListener("click", (e) => {
  // ignore clicks that were actually a drag-pan
  if (dragMoved) return;
  const syn = e.target.closest(".syn");
  if (syn) openModal(+syn.dataset.i);
});
modal.addEventListener("click", (e) => {
  if (e.target.dataset.close !== undefined) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

/* ---------- Entrance reveal as nodes scroll into view ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
  { root: scrollEl, threshold: 0.2 }
);
nodesEl.querySelectorAll(".syn").forEach((n) => io.observe(n));

/* ---------- Horizontal navigation: wheel + drag-to-pan ---------- */
// Map vertical wheel to horizontal travel
scrollEl.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollEl.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  },
  { passive: false }
);

// Drag to pan
let dragging = false, dragMoved = false, startX = 0, startScroll = 0;
scrollEl.addEventListener("pointerdown", (e) => {
  dragging = true;
  dragMoved = false;
  startX = e.clientX;
  startScroll = scrollEl.scrollLeft;
  scrollEl.classList.add("grabbing");
});
window.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 5) dragMoved = true;
  scrollEl.scrollLeft = startScroll - dx;
});
window.addEventListener("pointerup", () => {
  dragging = false;
  scrollEl.classList.remove("grabbing");
  // let the click handler see dragMoved, then reset shortly after
  setTimeout(() => (dragMoved = false), 0);
});

// Fade the hint once the user starts moving
const hint = document.getElementById("scrollHint");
scrollEl.addEventListener(
  "scroll",
  () => {
    if (scrollEl.scrollLeft > 40 && hint) hint.classList.add("gone");
  },
  { once: false }
);

/* ---------- Ambient neural-particle background ---------- */
const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");
let W, H, particles;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const count = Math.min(70, Math.floor((W * H) / 24000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.6 + 0.5,
  }));
}
resize();
window.addEventListener("resize", resize);

function tick() {
  ctx.clearRect(0, 0, W, H);
  for (const n of particles) {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.strokeStyle = `rgba(99,140,246,${(1 - d / 120) * 0.16})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  for (const n of particles) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,180,255,0.4)";
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
tick();
