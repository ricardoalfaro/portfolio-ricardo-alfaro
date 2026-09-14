const endpoint = "https://script.google.com/macros/s/AKfycbxNCVe1pse7ij4kIPSKmEUqOAAgdp8xLNoHiCCSNcy4fuEi2AIk4M0RFCYW7JQAQ47g/exec";
const callback = "personalBlogServerCallback";

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
    const data = JSON.parse(text.slice(prefix.length, -2));
    response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    response.status(200).json(data);
  } catch (error) {
    response.status(502).json({ error: "No fue posible cargar las notas." });
  }
}
