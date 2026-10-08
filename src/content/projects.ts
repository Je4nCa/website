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
  {
    slug: 'burger-house',
    title: 'Burger House',
    client: 'Concepto',
    year: 2025,
    type: 'concept',
    services: ['Apps', 'Sistemas'],
    summary: 'App de pedidos multiplataforma, kiosco de autoservicio y gestión de mesas.',
    description: [
      'Un sistema de pedidos digitales para una cadena de hamburguesas.',
      'Una sola base de código para la app del cliente en iOS y Android, el kiosco de autoservicio y el panel de gestión de mesas.',
    ],
    deliverables: ['App iOS y Android', 'Kiosco de autoservicio', 'Gestión de mesas'],
    colors: ['#E67E22', '#6B330A'],
  },
  {
    slug: 'natura-market',
    title: 'Natura Market',
    client: 'Concepto',
    year: 2025,
    type: 'concept',
    services: ['Web', 'Sistemas'],
    summary: 'Catálogo en línea con inventario sincronizado para un mercado orgánico.',
    description: [
      'Un catálogo en línea para un mercado orgánico local, conectado al inventario de la tienda.',
      'Cuando un producto se agota en el local, desaparece del catálogo. Sin hojas de cálculo de por medio.',
    ],
    deliverables: ['Catálogo web', 'Sistema de inventario', 'Panel de administración'],
    colors: ['#2F8F55', '#123B24'],
  },
  {
    slug: 'nova-real-estate',
    title: 'Nova Real Estate',
    client: 'Concepto',
    year: 2025,
    type: 'concept',
    services: ['Web', 'Diseño'],
    summary: 'Plataforma web de propiedades con panel para que el equipo publique sin ayuda.',
    description: [
      'Una plataforma de listados para una inmobiliaria boutique.',
      'Búsqueda por zona y precio, fichas de propiedad rápidas de cargar y un panel donde el equipo publica y edita sin tocar código.',
    ],
    deliverables: ['Sitio web', 'Buscador de propiedades', 'Panel de administración'],
    colors: ['#34495E', '#11181F'],
  },
];
