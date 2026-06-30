/* ---------- Render timeline ---------- */
const timelineEl = document.getElementById("timeline");

function cardHTML(p, i) {
  const side = i % 2 === 0 ? "left" : "right";
  const num = String(i + 1).padStart(2, "0");
  return `
    <div class="node ${side}" data-tag="${p.tag}">
      <article class="card" tabindex="0" role="button" aria-expanded="false">
        <div class="card-inner">
          <div class="card-head">
            <div class="icon"><span class="num">${num}</span></div>
            <div class="card-meta">
              <span class="year">${p.year}</span><span class="tag">${p.tag}</span>
              <h3 class="title">${p.title}</h3>
              <div class="authors">${p.authors}</div>
            </div>
          </div>
          <div class="expand-hint"><span class="chev">▾</span> Click to expand</div>
          <div class="detail">
            <div class="detail-inner">
              <p class="blurb">${p.blurb}</p>
              <div class="venue">${p.venue} · ${p.year}</div>
              <a class="paper-link" href="${p.url}" target="_blank" rel="noopener"
                 onclick="event.stopPropagation()">Read the paper →</a>
            </div>
          </div>
        </div>
      </article>
    </div>`;
}

timelineEl.innerHTML = PAPERS.map(cardHTML).join("");

/* ---------- Expand / collapse ---------- */
timelineEl.querySelectorAll(".card").forEach((card) => {
  const toggle = () => {
    const open = card.classList.toggle("open");
    card.setAttribute("aria-expanded", open);
  };
  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
});

/* ---------- 3D tilt on hover ---------- */
const TILT = 9; // max degrees
timelineEl.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--ry", `${px * TILT}deg`);
    card.style.setProperty("--rx", `${-py * TILT}deg`);
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  });
});

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
  { threshold: 0.15 }
);
document.querySelectorAll(".node").forEach((n) => io.observe(n));

/* ---------- Animated neural-network background ---------- */
const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");
let W, H, nodes;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const count = Math.min(90, Math.floor((W * H) / 18000));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 0.6,
  }));
}
resize();
window.addEventListener("resize", resize);

const mouse = { x: -999, y: -999 };
window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

function tick() {
  ctx.clearRect(0, 0, W, H);
  for (const n of nodes) {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  }
  // edges
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < 130) {
        const alpha = (1 - d / 130) * 0.22;
        ctx.strokeStyle = `rgba(99,140,246,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  // nodes (+ subtle mouse highlight)
  for (const n of nodes) {
    const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
    const near = md < 150;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = near ? "rgba(34,211,238,0.95)" : "rgba(150,180,255,0.55)";
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
tick();
