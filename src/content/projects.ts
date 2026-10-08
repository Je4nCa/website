import type { Project } from '../types';

/* =============================================================
   PROYECTOS — el único archivo que tienes que tocar para
   agregar, editar o reordenar trabajos en el sitio.

   1. Copia un bloque { ... } y pégalo en la lista.
      El orden de la lista es el orden en el sitio.
   2. Cambia los textos. Tu editor te autocompleta los campos y
      te marca en rojo si falta algo (los tipos están en src/types.ts).
   3. (Opcional) Pon imágenes en  public/projects/<slug>/  y usa
      cover: 'projects/<slug>/cover.jpg'. Sin imagen, la portada
      se genera con los dos `colors`.
   4. `npm run dev` para verlo; commit + push a main para publicarlo.
   ============================================================= */

export const projects: Project[] = [
  {
    slug: 'la-vera-pizza',
    title: 'La Vera Pizza',
    client: 'La Vera Pizza',
    year: 2025,
    type: 'client',
    services: ['Sistemas', 'Facturación', 'Diseño'],
    summary: 'Punto de venta con facturación electrónica y pantalla de cocina para una pizzería costarricense.',
    description: [
      'La Vera Pizza necesitaba que la caja, la cocina y Hacienda hablaran el mismo idioma.',
      'Desarrollamos un punto de venta con facturación electrónica integrada y una pantalla de órdenes para la cocina: el pedido entra una vez y llega a todos lados. Completamos el proyecto con la identidad visual de la marca.',
    ],
    deliverables: ['Punto de venta (POS)', 'Facturación electrónica ante Hacienda', 'Pantalla de órdenes en cocina', 'Identidad visual'],
    colors: ['#C0392B', '#5E1A14'],
    featured: true,
  },
];
