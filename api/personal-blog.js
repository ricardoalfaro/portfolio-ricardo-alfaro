const endpoint = "https://script.google.com/macros/s/AKfycbxNCVe1pse7ij4kIPSKmEUqOAAgdp8xLNoHiCCSNcy4fuEi2AIk4M0RFCYW7JQAQ47g/exec";
const callback = "personalBlogServerCallback";

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[char]);
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\\([*_\\])/g, "$1")
    .replace(/\[!\[\]\[image\d+\]\]\([^)]*\)/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

function renderMarkdown(source) {
  const lines = String(source).replace(/\r/g, "").replace(/^\[image\d+\]:.*$/gm, "").split("\n");
  const html = [];
  let paragraph = [];
  let list = null;
  const closeParagraph = () => { if (paragraph.length) html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`); paragraph = []; };
  const closeList = () => { if (list) html.push(`</${list}>`); list = null; };
  for (const line of lines) {
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    const unordered = line.match(/^[-*+]\s+(.+)$/);
    if (!line.trim() || line.trim() === "&nbsp;") { closeParagraph(); closeList(); continue; }
    if (heading) { closeParagraph(); closeList(); html.push(`<h${heading[1].length}>${inlineMarkdown(heading[2].replace(/^\*\*|\*\*$/g, ""))}</h${heading[1].length}>`); continue; }
    if (ordered || unordered) {
      closeParagraph();
      const type = ordered ? "ol" : "ul";
      if (list && list !== type) closeList();
      if (!list) { html.push(`<${type}>`); list = type; }
      html.push(`<li>${inlineMarkdown((ordered || unordered)[1])}</li>`);
      continue;
    }
    closeList();
    paragraph.push(line.trim());
  }
  closeParagraph();
  closeList();
  return html.join("\n");
}

export default async function handler(request, response) {
  const url = new URL(endpoint);
  url.searchParams.set("callback", callback);
  const slug = typeof request.query.slug === "string" ? request.query.slug : "";
  if (slug) url.searchParams.set("slug", slug);

  try {
    const upstream = await fetch(url);
    const text = await upstream.text();
    const prefix = `${callback}(`;
    if (!upstream.ok || !text.startsWith(prefix) || !text.endsWith(");")) {
      throw new Error("Respuesta inválida del lector de notas.");
    }
    const raw = JSON.parse(text.slice(prefix.length, -2));
    const data = Array.isArray(raw)
      ? raw.map(post => ({ ...post, body_html: renderMarkdown(post.body_markdown || "") }))
      : raw && { ...raw, body_html: renderMarkdown(raw.body_markdown || "") };
    response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    response.status(200).json(data);
  } catch (error) {
    response.status(502).json({ error: "No fue posible cargar las notas." });
  }
}
