# Portfolio Ricardo Alfaro

Sitio estático personal para Ricardo Alfaro, enfocado en producto, estrategia y ecosistemas de pagos en Latinoamérica.

## Estructura

- `index.html`: contenido y estructura principal del sitio.
- `content.js`: textos, casos, artículos y datos editables del sitio.
- `script.js`: render de secciones reutilizables y visual abstracto del fondo.
- `styles.css`: estilos visuales, layout responsive y sistema gráfico editorial.

## Cómo verlo localmente

Desde la carpeta del proyecto, ejecuta:

```bash
python3 -m http.server 8001
```

Luego abre:

```text
http://127.0.0.1:8001/
```

También se puede abrir `index.html` directamente en el navegador, pero usar un servidor local se parece más al comportamiento real del sitio publicado.

## Editar contenido

Los textos principales están en `content.js`. Para actualizar el perfil, conviene reemplazar:

- El texto principal del hero.
- Los tres bloques de trabajo seleccionado.
- El método de trabajo.
- El correo de contacto.

## Blog personal

El blog no está enlazado desde el home y se accede directamente en `/personal-blog/`.
Los posts se leen en URLs individuales del tipo `/personal-blog/post/?slug=mi-nota` y se escriben en `/personal-blog/newpost/`.

Para que el formulario publique realmente, crea un proyecto de Supabase y:

1. Ejecuta [`personal-blog/supabase-schema.sql`](personal-blog/supabase-schema.sql) en el SQL Editor, reemplazando el correo autorizado antes de ejecutarlo.
2. En Authentication → Sign In / Providers, deja activo Email y desactiva Confirm email. El editor usa una contraseña y no depende de la entrega de correos.
3. En Authentication → URL Configuration, agrega `https://tu-dominio/personal-blog/newpost/` como Redirect URL (y tu URL local si harás pruebas).
4. Agrega la URL del proyecto y su clave publishable en `personal-blog/supabase-config.js`. Este archivo se publica porque contiene únicamente valores públicos. Nunca uses una clave `service_role` o `sb_secret_…`.

En `/personal-blog/newpost/`, usa el correo autorizado y una contraseña de al menos 12 caracteres. Elige **Crear acceso** solo la primera vez; después usa **Entrar**.

El blog incluye `noindex` y una regla en `robots.txt`, pero eso evita indexación, no restringe el acceso: quien conozca una URL podrá leerla.

## Notas

Esta versión no requiere instalación de dependencias ni proceso de build.
