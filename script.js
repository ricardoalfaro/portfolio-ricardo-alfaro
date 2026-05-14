const content = window.siteContent;
const root = document.querySelector("#page-sections");
const heroProof = document.querySelector("#hero-proof");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderCapability = (item, index) => `
  <article class="capability-card">
    <span>${String(index + 1).padStart(2, "0")}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.text)}</p>
  </article>
`;

const renderExpertise = (item) => `
  <article class="expertise-row">
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.text)}</p>
  </article>
`;

const renderCaseCard = (item, index) => `
  <article class="case-card">
    <div class="case-index">0${index + 1}</div>
    <div class="case-copy">
      <p class="case-context">${escapeHtml(item.context)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <dl>
        <div>
          <dt>Problema</dt>
          <dd>${escapeHtml(item.problem)}</dd>
        </div>
        <div>
          <dt>Rol</dt>
          <dd>${escapeHtml(item.role)}</dd>
        </div>
        <div>
          <dt>Que lidere</dt>
          <dd>${escapeHtml(item.led)}</dd>
        </div>
        <div>
          <dt>Impacto</dt>
          <dd>${escapeHtml(item.impact)}</dd>
        </div>
      </dl>
    </div>
  </article>
`;

const renderIdea = (item) => `
  <article class="idea-card" data-tag="${escapeHtml(item.tag)}">
    <div>
      <span>${escapeHtml(item.tag)}</span>
      <span>${escapeHtml(item.type)}</span>
    </div>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.text)}</p>
  </article>
`;

const renderContactLinks = () => {
  const links = [
    { label: "LinkedIn", href: content.links.linkedin },
    { label: "Mail", href: `mailto:${content.links.email}` },
    { label: "Substack", href: content.links.substack },
    { label: "Medium", href: content.links.medium },
  ].filter((link) => link.href && link.href !== "#");

  return links
    .map((link) => `<a class="button button-light" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join("");
};

function renderHero() {
  document.querySelector("#hero-kicker").textContent = content.hero.kicker;
  document.querySelector("#hero-title").textContent = content.hero.headline;
  document.querySelector("#hero-subtitle").textContent = content.hero.subheadline;

  heroProof.innerHTML = content.hero.proofPoints
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");
}

function renderPage() {
  root.innerHTML = `
    <section class="section intro" id="about" aria-labelledby="about-title">
      <div class="section-label">${escapeHtml(content.whatIDo.eyebrow)}</div>
      <div class="intro-copy">
        <h2 id="about-title">${escapeHtml(content.whatIDo.title)}</h2>
        <p>${escapeHtml(content.whatIDo.text)}</p>
      </div>
    </section>

    <section class="section capabilities" aria-labelledby="capabilities-title">
      <div class="section-heading">
        <span>Capabilities</span>
        <h2 id="capabilities-title">Donde puedo aportar criterio y ejecucion.</h2>
      </div>
      <div class="capability-grid">
        ${content.whatIDo.capabilities.map(renderCapability).join("")}
      </div>
    </section>

    <section class="section expertise" aria-labelledby="expertise-title">
      <div class="section-heading">
        <span>Expertise</span>
        <h2 id="expertise-title">Profundidad fintech aplicada a decisiones de producto.</h2>
      </div>
      <div class="expertise-list">
        ${content.expertise.map(renderExpertise).join("")}
      </div>
    </section>

    <section class="section work" id="work" aria-labelledby="work-title">
      <div class="section-heading">
        <span>Experiencia destacada</span>
        <h2 id="work-title">Casos donde estrategia, producto y tecnologia se encuentran.</h2>
      </div>
      <div class="case-grid">
        ${content.cases.map(renderCaseCard).join("")}
      </div>
    </section>

    <section class="section ideas" id="ideas" aria-labelledby="ideas-title">
      <div class="section-heading">
        <span>Thought leadership</span>
        <h2 id="ideas-title">Pensamiento e investigacion sobre evolucion financiera digital.</h2>
      </div>
      <div class="filter-bar" aria-label="Filtrar publicaciones">
        ${content.articleTags
          .map(
            (tag, index) =>
              `<button class="filter-button${index === 0 ? " is-active" : ""}" type="button" data-filter="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`
          )
          .join("")}
      </div>
      <div class="ideas-grid">
        ${content.articles.map(renderIdea).join("")}
      </div>
    </section>

    <section class="manifesto" aria-labelledby="manifesto-title">
      <span>Vision</span>
      <h2 id="manifesto-title">${escapeHtml(content.manifesto.title)}</h2>
      <p>${escapeHtml(content.manifesto.text)}</p>
    </section>

    <section class="section about" aria-labelledby="bio-title">
      <div class="section-label">Sobre mi</div>
      <div class="about-copy">
        <h2 id="bio-title">${escapeHtml(content.about.title)}</h2>
        <p>${escapeHtml(content.about.text)}</p>
        <p>${escapeHtml(content.about.note)}</p>
      </div>
    </section>

    <section class="contact-section" id="contacto" aria-labelledby="contacto-title">
      <p>${escapeHtml(content.contact.text)}</p>
      <h2 id="contacto-title">${escapeHtml(content.contact.title)}</h2>
      <div class="contact-actions">
        ${renderContactLinks()}
      </div>
    </section>
  `;
}

function bindFilters() {
  const buttons = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".idea-card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      cards.forEach((card) => {
        const shouldShow = filter === "Todos" || card.dataset.tag === filter;
        card.hidden = !shouldShow;
      });
    });
  });
}

renderHero();
renderPage();
bindFilters();
