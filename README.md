# Montevo Studio — website

Sitio de Montevo Studio. TypeScript + Vite, sin frameworks: carga rápido y
todas las animaciones usan solo `transform` y `opacity` para mantenerse a 60 fps.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # verifica tipos y genera /dist
```

Cada push a `main` se publica solo en GitHub Pages (`.github/workflows/deploy.yml`).

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
src/modules/            una interacción por archivo (mascota, scroll, filtros…)
```
