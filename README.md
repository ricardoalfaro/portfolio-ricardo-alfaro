# Portfolio Ricardo Alfaro

Sitio personal de Ricardo Alfaro (producto, pagos y estrategia fintech), construido con Next.js. Incluye la landing page, un blog en `/blog` y los casos de trabajo en `/casos`.

## Estructura

- `src/app/page.tsx`: página de inicio (secciones armadas desde `src/components/sections`).
- `src/app/blog/`: listado de artículos y página de artículo individual.
- `src/app/casos/`: listado de casos y página de caso individual.
- `src/lib/content.ts`: textos y datos de la landing (hero, sobre mí, capacidades, etc.).
- `src/lib/posts.ts`: lectura de los artículos MDX del blog.
- `src/lib/cases.ts`: lectura de los casos MDX.
- `content/blog/*.mdx`: artículos del blog (frontmatter + contenido en Markdown/MDX).
- `content/casos/*.mdx`: casos de trabajo (frontmatter + contenido en Markdown/MDX).
- `src/app/globals.css`: sistema visual del sitio + Tailwind (usado solo para la tipografía de los artículos/casos vía `@tailwindcss/typography`).
- Tipografía: Barlow Condensed (títulos) y Barlow (texto), igual que ricardoalfaro.cl, cargadas vía `next/font/google`.
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

## Agregar un nuevo caso

Crea un archivo en `content/casos/mi-caso.mdx` con este formato:

```mdx
---
title: "Título del caso"
company: "Empresa / cliente"
role: "Tu rol en el proyecto"
period: "2023 — 2024"
excerpt: "Resumen corto que aparece en el listado de casos."
tag: "Payments"
order: 1
published: true
---

Contenido del caso en Markdown/MDX.
```

- `order`: define el orden de aparición en el listado (menor = más arriba). Los casos existentes usan 1-6; para agregar uno más reciente, usa `order: 0` o renumera.
- `tag`: se usa para el filtro (ej: Payments, Wallets, Product, Insurance).
- `published: false` oculta el caso del listado sin borrar el archivo.

El slug de la URL (`/casos/mi-caso`) es el nombre del archivo.

## Deploy

El proyecto está conectado a Vercel (mismo proyecto/dominio que la versión anterior). Un push a `main` en GitHub dispara el deploy automático.
