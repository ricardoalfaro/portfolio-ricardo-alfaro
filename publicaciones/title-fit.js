const titles = document.querySelectorAll("[data-fit-title]");
const minimumSize = 32;
const maximumSize = 176;

function fitTitle(title) {
  const container = title.parentElement;
  if (!container) return;

  title.style.fontSize = `${maximumSize}px`;
  const availableWidth = container.clientWidth;
  const titleWidth = title.scrollWidth;
  if (!availableWidth || !titleWidth) return;

  const fittedSize = Math.max(minimumSize, Math.min(maximumSize, Math.floor(maximumSize * availableWidth / titleWidth)));
  title.style.fontSize = `${fittedSize}px`;
}

function fitAllTitles() { titles.forEach(fitTitle); }

fitAllTitles();
window.addEventListener("resize", fitAllTitles);
document.fonts?.ready.then(fitAllTitles);
