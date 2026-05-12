const content = window.siteContent;
const root = document.querySelector("#page-sections");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderFocusCard = (item, index) => `
  <article class="focus-card">
    <span>${String(index + 1).padStart(2, "0")}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.text)}</p>
  </article>
`;

const renderCaseCard = (item, index) => `
  <article class="case-card">
    <div class="case-art" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
    <div class="case-copy">
      <div class="case-meta">
        <span>0${index + 1}</span>
        <span>Payments strategy</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.context)}</p>
      <p>${escapeHtml(item.impact)}</p>
    </div>
  </article>
`;

const renderIdea = (item) => `
  <article class="idea-card">
    <span>${escapeHtml(item.tag)}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.text)}</p>
  </article>
`;

const renderContactLinks = () => {
  const links = [
    { label: "Escríbeme", href: `mailto:${content.links.email}` },
    { label: "LinkedIn", href: content.links.linkedin },
    { label: "Agenda", href: content.links.calendar },
  ].filter((link) => link.href && link.href !== "#");

  return links
    .map((link) => `<a class="button button-light" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join("");
};

function renderPage() {
  root.innerHTML = `
    <section class="media-strip" aria-label="Temas de especialidad">
      <div class="strip-card strip-green">
        <span>Payments</span>
        <strong>Adquirencia, PSP, PST, emisión, billeteras y pagos cuenta a cuenta.</strong>
      </div>
      <div class="strip-card strip-lime">
        <span>Operations</span>
        <strong>Recaudación, conciliación, tesorería y automatización financiera.</strong>
      </div>
      <div class="strip-card strip-blue">
        <span>Open Finance</span>
        <strong>APIs, consentimiento, iniciación de pagos y nuevos modelos de negocio.</strong>
      </div>
    </section>

    <section class="section why" id="about" aria-labelledby="about-title">
      <div class="section-label">Why this matters</div>
      <div>
        <h2 id="about-title">Los pagos no terminan en el checkout.</h2>
        <p>
          Ahí empieza una cadena operacional que define cuánto dinero entra,
          cuándo se reconoce, cómo se concilia y qué tan escalable es el negocio.
        </p>
      </div>
    </section>

    <section class="section focus" aria-labelledby="focus-title">
      <div class="section-heading">
        <span>Services</span>
        <h2 id="focus-title">Dónde puedo ayudar</h2>
      </div>
      <div class="focus-grid">
        ${content.whatIDo.map(renderFocusCard).join("")}
      </div>
    </section>

    <section class="section work" id="work" aria-labelledby="work-title">
      <div class="section-heading">
        <span>Case studies</span>
        <h2 id="work-title">Proyectos representativos</h2>
      </div>
      <div class="case-grid">
        ${content.cases.map(renderCaseCard).join("")}
      </div>
    </section>

    <section class="section ideas" id="ideas" aria-labelledby="ideas-title">
      <div class="section-heading">
        <span>Writing</span>
        <h2 id="ideas-title">Ideas sobre pagos e infraestructura financiera</h2>
      </div>
      <div class="ideas-grid">
        ${content.articles.slice(0, 4).map(renderIdea).join("")}
      </div>
    </section>

    <section class="contact-section" id="contacto" aria-labelledby="contacto-title">
      <p>Available for advisory, research, workshops and product strategy.</p>
      <h2 id="contacto-title">Si estás trabajando en un desafío de pagos, conversemos.</h2>
      <div class="contact-actions">
        ${renderContactLinks()}
      </div>
    </section>
  `;
}

renderPage();
