const config = window.personalBlogConfig || {};
const isConfigured = () => config.url && config.publishableKey && !config.url.includes("TU_");
const api = (path, options = {}, token = config.publishableKey) =>
  fetch(`${config.url}${path}`, {
    ...options,
    headers: { apikey: config.publishableKey, Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  });
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" })[char]);
const formatDate = (date) => new Intl.DateTimeFormat("es-CL", { dateStyle: "long" }).format(new Date(date));
const slugify = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);

async function getPosts(query = "") {
  const response = await api(`/rest/v1/personal_posts?select=title,slug,body,published_at${query}`);
  if (!response.ok) throw new Error("No fue posible cargar las notas.");
  return response.json();
}

async function renderIndex() {
  const list = document.querySelector("#post-list");
  if (!list) return;
  const loading = document.querySelector("#loading");
  if (!isConfigured()) { loading.textContent = "El archivo todavía no está conectado."; return; }
  try {
    const posts = await getPosts("&order=published_at.desc");
    loading.remove();
    if (!posts.length) { list.innerHTML = "<li class=\"muted\">Aún no hay notas.</li>"; return; }
    list.innerHTML = posts.map(post => `<li><a href="/personal-blog/post/?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}<time datetime="${post.published_at}">${formatDate(post.published_at)}</time></a></li>`).join("");
  } catch (error) { loading.textContent = error.message; }
}

async function renderPost() {
  const target = document.querySelector("#post");
  if (!target) return;
  const slug = new URLSearchParams(location.search).get("slug");
  if (!isConfigured() || !slug) { target.innerHTML = "<p class=\"muted\">No se encontró esta nota.</p>"; return; }
  try {
    const posts = await getPosts(`&slug=eq.${encodeURIComponent(slug)}&limit=1`);
    const post = posts[0];
    if (!post) { target.innerHTML = "<p class=\"muted\">No se encontró esta nota.</p>"; return; }
    document.title = `${post.title} — Notas personales`;
    target.innerHTML = `<header><p class="eyebrow">Archivo personal</p><h1>${escapeHtml(post.title)}</h1><time class="post-date" datetime="${post.published_at}">${formatDate(post.published_at)}</time></header><div class="post-body">${escapeHtml(post.body)}</div>`;
  } catch (error) { target.innerHTML = `<p class="muted">${escapeHtml(error.message)}</p>`; }
}

function accessToken() {
  const hash = new URLSearchParams(location.hash.slice(1));
  return hash.get("access_token") || sessionStorage.getItem("personalBlogToken");
}

async function setupEditor() {
  const login = document.querySelector("#login-form");
  if (!login) return;
  const editor = document.querySelector("#post-form");
  const status = document.querySelector("#status");
  if (!isConfigured()) { status.textContent = "Completa personal-blog/supabase-config.js para activar el editor."; return; }
  const token = accessToken();
  if (token) { sessionStorage.setItem("personalBlogToken", token); history.replaceState({}, document.title, location.pathname); document.querySelector("#auth-panel").hidden = true; editor.hidden = false; }
  login.addEventListener("submit", async event => {
    event.preventDefault();
    const email = new FormData(login).get("email");
    status.textContent = "Enviando enlace…";
    const response = await api("/auth/v1/otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, options: { emailRedirectTo: location.href } }) });
    status.textContent = response.ok ? "Revisa tu correo y vuelve mediante el enlace." : "No se pudo enviar el enlace.";
  });
  editor.addEventListener("submit", async event => {
    event.preventDefault();
    const fields = new FormData(editor), title = fields.get("title").trim(), body = fields.get("body").trim();
    status.textContent = "Publicando…";
    const response = await api("/rest/v1/personal_posts", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify({ title, body, slug: slugify(title) || `nota-${Date.now()}` }) }, accessToken());
    const data = await response.json();
    if (!response.ok) { status.textContent = data.message || "No se pudo publicar. Confirma que ingresaste con el correo autorizado."; return; }
    location.assign(`/personal-blog/post/?slug=${encodeURIComponent(data[0].slug)}`);
  });
}

renderIndex();
renderPost();
setupEditor();
