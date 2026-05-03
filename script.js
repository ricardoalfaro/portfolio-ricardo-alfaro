const canvas = document.querySelector("#ambient-canvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let points = [];

function resize() {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  points = Array.from({ length: Math.max(20, Math.floor(width / 42)) }, (_, index) => ({
    x: (index * 97) % width,
    y: (index * 149) % height,
    vx: ((index % 5) - 2) * 0.08,
    vy: (((index + 2) % 5) - 2) * 0.08,
    radius: 1.5 + (index % 4) * 0.5,
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;

  points.forEach((point, index) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < -20) point.x = width + 20;
    if (point.x > width + 20) point.x = -20;
    if (point.y < -20) point.y = height + 20;
    if (point.y > height + 20) point.y = -20;

    for (let next = index + 1; next < points.length; next += 1) {
      const other = points[next];
      const dx = point.x - other.x;
      const dy = point.y - other.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 150) {
        ctx.strokeStyle = `rgba(13, 95, 88, ${0.11 - distance / 1800})`;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = index % 7 === 0 ? "rgba(193, 75, 52, 0.35)" : "rgba(34, 87, 122, 0.25)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();
