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
    slug: 'ranger-swat',
    title: 'Ranger SWAT',
    client: 'Montevo Studio',
    year: 2026,
    type: 'product',
    services: ['Facturación', 'Apps'],
    summary: 'Facturación electrónica desde el celular: tiquete o factura con un toque, siempre al día con Hacienda.',
    description: [
      'Una app de facturación pensada para vender rápido desde el celular. El comercio emite un tiquete o una factura con un toque y el comprobante sale listo para Hacienda.',
      'Emite comprobantes en la versión 4.4 con códigos CABYS tomados del catálogo oficial. Se instala como app en cualquier dispositivo, sin pasar por tiendas.',
    ],
    deliverables: ['Comprobantes electrónicos v4.4', 'Catálogo CABYS integrado', 'Venta rápida desde el celular', 'App instalable (PWA)'],
    colors: ['#4F46E5', '#14112B'],
    cover: 'projects/ranger-swat/cover.webp',
    gallery: ['projects/ranger-swat/mobile.webp'],
    url: 'https://ranger-swat.app',
    featured: true,
  },
  {
    slug: 'd-rabbit',
    title: 'D_Rabbit',
    client: 'Daniel Conejo',
    year: 2026,
    type: 'client',
    services: ['Web'],
    summary: 'Portafolio interactivo para un artista de cómics costarricense, con archivo de obras, comisiones y radio.',
    description: [
      'D_Rabbit es el universo de Daniel Conejo, ilustrador y artista de cómics de Costa Rica. Su sitio tenía que sentirse tan punk como su trabajo.',
      'Arranca con una secuencia de inicio tipo terminal, "RABBIT_OS", y lleva a un archivo de obras organizado por arte original, fan art, cómics, comisiones y retratos. Incluye una radio con música, efectos de sonido que se pueden apagar y versión en inglés.',
    ],
    deliverables: ['Sitio web bilingüe (ES / EN)', 'Archivo de obras por categoría', 'Sección de comisiones y stickers', 'Radio y efectos de sonido'],
    colors: ['#E8244A', '#0A0A0D'],
    cover: 'projects/d-rabbit/cover.webp',
    gallery: ['projects/d-rabbit/intro.webp', 'projects/d-rabbit/destacados.webp', 'projects/d-rabbit/archivo.webp', 'projects/d-rabbit/mobile.webp'],
    url: 'https://d-rabbit.online',
  },
  {
    slug: 'talenta',
    title: 'Talenta',
    client: 'Talenta',
    year: 2026,
    type: 'client',
    services: ['Apps', 'Web'],
    summary: 'Plataforma de administración con cuentas de usuario, instalable en cualquier dispositivo.',
    description: [
      'Talenta es una plataforma de administración con un propósito claro: "Administrando para la Gloria de Dios".',
      'Cada persona tiene su cuenta y entra desde el navegador o la instala como app en su teléfono.',
    ],
    deliverables: ['Aplicación web', 'Cuentas de usuario', 'App instalable (PWA)'],
    colors: ['#C6963A', '#5C4420'],
    cover: 'projects/talenta/cover.webp',
    gallery: ['projects/talenta/mobile.webp'],
    url: 'https://talentaapp.com',
  },
  {
    slug: 'la-vera-pizza',
    title: 'La Vera Pizza',
    client: 'La Vera Pizza',
    year: 2025,
    type: 'client',
    services: ['Sistemas', 'Diseño'],
    summary: 'Punto de venta a la medida para una pizzería costarricense: caja, mesas, cocina y reportes conectados en tiempo real.',
    description: [
      'La Vera Pizza necesitaba que la caja, las mesas y la cocina trabajaran sincronizadas, sin papelitos de por medio.',
      'Desarrollamos un punto de venta web a la medida: pizzas por tamaño, cobro en efectivo, tarjeta o SINPE Móvil, cuentas divididas y descuentos. Cada venta llega al instante a una pantalla de cocina, donde el equipo avanza la orden de recibida a horneando y lista, con aviso sonoro.',
      'El dueño tiene un dashboard con los ingresos del día, ventas por hora y productos más vendidos, además de reportes por cajero y cierre de caja. Completamos el proyecto con la identidad visual de la marca.',
    ],
    deliverables: ['Punto de venta con varios cajeros', 'Pantalla de cocina en tiempo real', 'Gestión de mesas', 'Dashboard, reportes y cierre de caja', 'Identidad visual'],
    stack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    colors: ['#1E2D24', '#0F1712'],
    cover: 'projects/la-vera-pizza/cover.webp',
    gallery: ['projects/la-vera-pizza/venta.webp', 'projects/la-vera-pizza/cocina.webp', 'projects/la-vera-pizza/reportes.webp', 'projects/la-vera-pizza/mesas.webp'],
    featured: true,
  },
];
