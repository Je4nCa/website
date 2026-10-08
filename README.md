# Montevo Studio — website

Sitio de Montevo Studio. TypeScript + Vite, sin frameworks: carga rápido y
todas las animaciones usan solo `transform` y `opacity` para mantenerse a 60 fps.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # verifica tipos y genera /dist
```

Para probar también el formulario de contacto (la función de Cloudflare) en tu compu:

```bash
echo 'RESEND_API_KEY=re_xxx' > .dev.vars   # no se sube a git
npm run pages:dev                          # http://localhost:8788
```

## Publicación: Cloudflare Pages + montevostudio.com

El sitio vive en Cloudflare Pages. Cada push a `main` se publica solo y cada
rama tiene su propio link de vista previa (`<rama>.<proyecto>.pages.dev`).

Configuración inicial (una sola vez, en dash.cloudflare.com):

1. **Workers & Pages → Create → Pages → Connect to Git** y elige `montevostudio/website`.
2. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Variable `NODE_VERSION` = `22`
3. **Settings → Variables and Secrets** (en Production y Preview):
   - `RESEND_API_KEY` (tipo *Secret*): tu API key de resend.com
   - `CONTACT_TO` = `montevostudio@outlook.com`
   - `CONTACT_FROM` = `Montevo Studio <hola@montevostudio.com>`
4. **Custom domains → Set up a custom domain** → `montevostudio.com` (y `www.montevostudio.com`).
   Como el dominio ya está en tu Cloudflare, los registros DNS se crean solos.
5. En **resend.com → Domains → Add domain** agrega `montevostudio.com` y copia los
   registros DNS que te da (SPF, DKIM) en Cloudflare → DNS. Cuando Resend lo marque
   como *Verified*, el formulario ya puede mandar correos desde `hola@montevostudio.com`.

## Formulario de contacto

`functions/api/contact.ts` es una Cloudflare Pages Function: recibe el formulario
en `POST /api/contact` y te manda un correo con Resend. No guarda nada.
Tiene un campo oculto anti-spam y responde al cliente directo si dejó su correo
(el botón "Responder" de tu correo le escribe a él).

## Agregar un proyecto

Todo está en **`src/content/projects.ts`**. Copia un bloque, cambia los textos y listo.
Los campos están tipados en `src/types.ts`, así que el editor te autocompleta y
te avisa si falta algo.

Imágenes (opcional): ponlas en `public/projects/<slug>/` y referencia
`cover: 'projects/<slug>/cover.jpg'` o `gallery: ['projects/<slug>/01.jpg']`.
Sin imagen, la portada se genera con los `colors` del proyecto.

Cada proyecto tiene su propio link: `/#/proyecto/<slug>`.

## Estructura

```
index.html              contenido de las secciones
src/content/projects.ts proyectos
src/styles.css          estilos (tokens de color y tipografía arriba)
src/content/stack.ts    herramientas de la sección Tecnología
src/modules/            una interacción por archivo (mascota, scroll, filtros…)
functions/api/          funciones de Cloudflare (formulario de contacto)
public/_headers         caché y cabeceras de seguridad en Cloudflare
```
