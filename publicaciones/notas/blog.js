const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" })[char]);
const formatDate = (date) => new Intl.DateTimeFormat("es-CL", { dateStyle: "long" }).format(new Date(date));

async function getPosts(slug = "") {
  const url = new URL("/api/personal-blog", location.origin);
  url.searchParams.set("reader", "rich-1");
  if (slug) url.searchParams.set("slug", slug);
  const response = await fetch(url);
  if (!response.ok) throw new Error("No fue posible cargar las notas.");
  return response.json();
}

async function renderIndex() {
  const list = document.querySelector("#post-list");
  if (!list) return;
  const loading = document.querySelector("#loading");
  try {
    const posts = await getPosts();
    loading.remove();
    if (!posts.length) { list.innerHTML = "<li class=\"muted\">Aún no hay notas.</li>"; return; }
    list.innerHTML = posts.map(post => `<li><a href="/publicaciones/notas/post/?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}<time datetime="${post.published_at}">${formatDate(post.published_at)}</time></a></li>`).join("");
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
    target.innerHTML = `<header><p class="eyebrow">Archivo.</p><h1>${escapeHtml(post.title)}</h1><time class="post-date" datetime="${post.published_at}">${formatDate(post.published_at)}</time></header><div class="post-body rich-body">${post.body_html}</div>`;
  } catch (error) { target.innerHTML = `<p class="muted">${escapeHtml(error.message)}</p>`; }
}

renderIndex();
renderPost();
