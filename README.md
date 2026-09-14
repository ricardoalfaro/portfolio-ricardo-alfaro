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

Las notas se publican desde la carpeta de Google Drive **Blog publicado**. Cada Documento de Google dentro de esa carpeta se muestra como una entrada: el nombre del archivo es el título y el contenido del Doc es el cuerpo. Los cambios se reflejan al recargar el sitio.

En `/personal-blog/newpost/` hay un enlace directo a la carpeta. El endpoint de Apps Script utiliza solamente permisos de lectura: puede leer y exportar los documentos, pero no editarlos, crearlos ni borrarlos. El sitio consulta ese endpoint a través de una función del servidor para evitar bloqueos de extensiones o navegadores.

El blog incluye `noindex` y una regla en `robots.txt`, pero eso evita indexación, no restringe el acceso: quien conozca una URL podrá leerla.

## Notas

Esta versión no requiere instalación de dependencias ni proceso de build.
