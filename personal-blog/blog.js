const config = window.personalBlogDriveConfig || {};
const isConfigured = () => config.endpoint && !config.endpoint.includes("TU_");
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" })[char]);
const formatDate = (date) => new Intl.DateTimeFormat("es-CL", { dateStyle: "long" }).format(new Date(date));

function getPosts(slug = "") {
  return new Promise((resolve, reject) => {
    if (!isConfigured()) { reject(new Error("El lector de Google Drive todavía no está conectado.")); return; }
    const callback = `personalBlogCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const url = new URL(config.endpoint);
    url.searchParams.set("callback", callback);
    if (slug) url.searchParams.set("slug", slug);
    const script = document.createElement("script");
    const timeout = setTimeout(() => done(new Error("La carga de las notas tardó demasiado.")), 15000);
    const done = (value) => {
      clearTimeout(timeout);
      delete window[callback];
      script.remove();
      value instanceof Error ? reject(value) : resolve(value);
    };
    window[callback] = (data) => done(data);
    script.onerror = () => done(new Error("No fue posible cargar las notas."));
    script.src = url.toString();
    document.head.append(script);
  });
}

async function renderIndex() {
  const list = document.querySelector("#post-list");
  if (!list) return;
  const loading = document.querySelector("#loading");
  try {
    const posts = await getPosts();
    loading.remove();
    if (!posts.length) { list.innerHTML = "<li class=\"muted\">Aún no hay notas.</li>"; return; }
    list.innerHTML = posts.map(post => `<li><a href="/personal-blog/post/?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}<time datetime="${post.published_at}">${formatDate(post.published_at)}</time></a></li>`).join("");
  } catch (error) { loading.textContent = error.message; }
}

async function renderPost() {
  const target = document.querySelector("#post");
  if (!target) return;
  const slug = new URLSearchParams(location.search).get("slug");
  if (!slug) { target.innerHTML = "<p class=\"muted\">No se encontró esta nota.</p>"; return; }
  try {
    const post = await getPosts(slug);
    if (!post) { target.innerHTML = "<p class=\"muted\">No se encontró esta nota.</p>"; return; }
    document.title = `${post.title} — Notas personales`;
    target.innerHTML = `<header><p class="eyebrow">Archivo personal</p><h1>${escapeHtml(post.title)}</h1><time class="post-date" datetime="${post.published_at}">${formatDate(post.published_at)}</time></header><div class="post-body">${escapeHtml(post.body)}</div>`;
  } catch (error) { target.innerHTML = `<p class="muted">${escapeHtml(error.message)}</p>`; }
}

renderIndex();
renderPost();
