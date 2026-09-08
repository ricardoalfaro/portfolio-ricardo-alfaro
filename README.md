# Portfolio Ricardo Alfaro

Sitio personal de Ricardo Alfaro (producto, pagos y estrategia fintech), construido con Next.js. Incluye la landing page y un blog en `/blog`.

## Estructura

- `src/app/page.tsx`: página de inicio (secciones armadas desde `src/components/sections`).
- `src/app/blog/`: listado de artículos y página de artículo individual.
- `src/lib/content.ts`: textos y datos de la landing (hero, casos, expertise, etc.).
- `src/lib/posts.ts`: lectura de los artículos MDX del blog.
- `content/blog/*.mdx`: artículos del blog (frontmatter + contenido en Markdown/MDX).
- `src/app/globals.css`: sistema visual del sitio (heredado del diseño original) + Tailwind (usado solo para la tipografía de los artículos del blog vía `@tailwindcss/typography`).
- `legacy-html/`: versión estática anterior del sitio, conservada como referencia.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Escribir un nuevo artículo

Crea un archivo en `content/blog/mi-articulo.mdx` con este formato:

```mdx
---
title: "Título del artículo"
date: "2026-09-07"
excerpt: "Resumen corto que aparece en las tarjetas del listado."
tag: "Payments"
type: "Artículo"
published: true
---

Contenido del artículo en Markdown/MDX.
```

- `tag`: se usa para el filtro del blog (ej: Payments, Wallets, Open Finance, Product Strategy, AI & Product).
- `type`: etiqueta visual (Artículo, Investigación, Análisis, Tesis, Nota).
- `published: false` oculta el artículo del listado sin borrar el archivo (útil para borradores).

El slug de la URL (`/blog/mi-articulo`) es el nombre del archivo.

## Deploy

El proyecto está conectado a Vercel (mismo proyecto/dominio que la versión anterior). Un push a `main` en GitHub dispara el deploy automático.
