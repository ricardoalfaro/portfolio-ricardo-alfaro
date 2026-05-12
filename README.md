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

## Notas

Esta versión no requiere instalación de dependencias ni proceso de build.
