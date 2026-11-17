/**
 * Project case studies shown in the Work section and the case-study overlay.
 */
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
    client: 'Ranger SWAT',
    year: 2026,
    type: 'negocio',
    services: ['Facturación', 'Apps'],
    summary: 'Sistema de facturación electrónica para una tienda de repuestos automotrices, en el celular o la computadora y siempre al día con Hacienda.',
    description: [
      'Un sistema de facturación hecho a la medida para Ranger SWAT, tienda de repuestos automotrices, con su marca y pensado para vender rápido. Se arma el carrito, cobra en efectivo, tarjeta, SINPE Móvil o transferencia, y el comprobante sale listo para Hacienda, para imprimir o enviar por correo.',
      'Emite comprobantes en la versión 4.4 con códigos CABYS tomados del catálogo oficial. Además lleva productos, clientes, cuentas por cobrar y por pagar, cotizaciones y reportes que se descargan en Excel. Tiene modo claro y oscuro, y se instala como app en cualquier dispositivo, sin pasar por tiendas.',
    ],
    deliverables: ['Comprobantes electrónicos v4.4', 'Catálogo CABYS integrado', 'Cuentas por cobrar y por pagar', 'Reportes exportables a Excel', 'App instalable (PWA)'],
    colors: ['#DC0A14', '#141010'],
    cover: 'projects/ranger-swat/cover.webp',
    gallery: [
      'projects/ranger-swat/vender.webp',
      'projects/ranger-swat/movil-inicio.webp',
      'projects/ranger-swat/movil-cobrar.webp',
      'projects/ranger-swat/movil-emitido.webp',
      'projects/ranger-swat/reportes.webp',
    ],
    url: 'https://ranger-swat.app',
    one: true,
  },
  {
    slug: 'repuestos-oconitrillo',
    title: 'Repuestos Oconitrillo',
    client: 'Repuestos Oconitrillo',
    year: 2026,
    type: 'negocio',
    services: ['Facturación', 'Sistemas'],
    summary: 'Facturación electrónica para una tienda de repuestos nuevos y usados, con una forma de vender pensada para cada uno.',
    description: [
      'Repuestos Oconitrillo vende repuestos nuevos y usados, y cada venta funciona distinto. Por eso su sistema de facturación tiene dos partes sobre la misma base: una para los repuestos nuevos, con su inventario por código, y otra para los usados, donde cada pieza es única.',
      'Las dos emiten tiquetes y facturas electrónicas, llevan los clientes y los comprobantes con su estado en Hacienda, y dan reportes que se descargan en Excel.',
    ],
    deliverables: ['Comprobantes electrónicos', 'Caja con apertura y cierre', 'Artículos con ubicación en bodega', 'Compras y cuentas por pagar', 'Venta de piezas usadas una por una', 'Reportes para el contador'],
    colors: ['#B8822E', '#161513'],
    cover: 'projects/repuestos-oconitrillo/cover.webp',
    parts: [
      {
        title: 'Repuestos nuevos',
        text: [
          'En el mostrador se busca cada artículo por código o nombre, con su ubicación en la bodega a la vista, y la venta sale como tiquete, factura o proforma.',
          'La caja se abre con un fondo, registra retiros e ingresos y se cierra comparando el efectivo esperado con el contado. Las compras a proveedores suben las existencias, actualizan los costos y crean la cuenta por pagar. Los reportes de ventas, compras, IVA, inventario valorizado y cierres de caja quedan listos para el contador.',
        ],
        gallery: [
          'projects/repuestos-oconitrillo/vender.webp',
          'projects/repuestos-oconitrillo/movil-vender.webp',
          'projects/repuestos-oconitrillo/movil-caja.webp',
          'projects/repuestos-oconitrillo/movil-articulos.webp',
          'projects/repuestos-oconitrillo/reportes.webp',
        ],
      },
      {
        title: 'Repuestos usados',
        text: [
          'Cada pieza usada es distinta, así que la venta arranca con una pregunta: "¿Qué pieza vende hoy?". Se escribe el nombre que va en el comprobante, se ajusta el precio y se elige la marca del carro.',
          'Antes de cobrar se revisa la venta completa y se elige tiquete o factura. Lleva su propio catálogo de piezas.',
        ],
        gallery: [
          'projects/repuestos-oconitrillo/usados-vender.webp',
          'projects/repuestos-oconitrillo/usados-movil-pieza.webp',
          'projects/repuestos-oconitrillo/usados-movil-revisar.webp',
          'projects/repuestos-oconitrillo/usados-movil-emitido.webp',
          'projects/repuestos-oconitrillo/usados-revisar.webp',
        ],
      },
    ],
    one: true,
  },
  {
    slug: 'la-piel',
    title: 'La Piel Centro Médico',
    client: 'Dra. Catalina Alpízar',
    year: 2026,
    type: 'negocio',
    services: ['Sistemas', 'Apps', 'Facturación'],
    summary: 'Agenda, expediente, mensajes con IA, marketing y facturación electrónica en un solo sistema: del primer mensaje del paciente hasta la factura.',
    description: [
      'Un sistema todo en uno hecho a la medida para La Piel Centro Médico, la clínica de medicina estética de la Dra. Catalina Alpízar. Todo gira alrededor del paciente: mensaje, cita, expediente, cobro e informe, en un solo lugar y con la marca de la clínica. Reemplaza agendas sueltas, hojas de Excel y plataformas que no se adaptan.',
      'La agenda maneja cupos por tratamiento y envía la confirmación por correo y WhatsApp, con un enlace para que el paciente llene su expediente antes de la cita. WhatsApp, Instagram y Messenger llegan a una sola bandeja, donde un asistente con IA responde 24/7 con la información aprobada por la clínica, agenda citas y pasa la conversación a una persona cuando hace falta. El informe de marketing muestra leads, ventas y ROAS por anuncio.',
      'Cumple la Ley 8968 de protección de datos: permisos por rol, registro de accesos y una base de datos propia para la clínica. Los pacientes de las capturas son inventados.',
    ],
    deliverables: ['Agenda con cupos y confirmaciones', 'Expediente clínico con registro de accesos', 'Bandeja de WhatsApp, Instagram y Messenger', 'Asistente con IA 24/7', 'Informe de marketing con ROAS', 'Facturación electrónica v4.4', 'App instalable (PWA)'],
    colors: ['#B08D6E', '#2B2420'],
    cover: 'projects/la-piel/cover.webp',
    gallery: [
      'projects/la-piel/mensajes.webp',
      'projects/la-piel/movil-chat.webp',
      'projects/la-piel/ficha.webp',
      'projects/la-piel/movil-hoy.webp',
      'projects/la-piel/semana.webp',
      'projects/la-piel/movil-ficha.webp',
      'projects/la-piel/marketing.webp',
      'projects/la-piel/movil-marketing.webp',
      'projects/la-piel/pacientes.webp',
    ],
    one: true,
  },
  {
    slug: 'essence-hair-studio',
    title: 'Essence Hair Studio',
    client: 'Essence Hair Studio',
    year: 2026,
    type: 'negocio',
    services: ['Facturación', 'Apps'],
    summary: 'Facturación electrónica, inventario y comisiones para una barbería y salón de belleza, en la computadora de caja o en el celular.',
    description: [
      'Un sistema hecho a la medida para Essence Hair Studio, barbería y salón de belleza. Cobra en segundos con tiquete o factura electrónica v4.4, en efectivo, tarjeta, SINPE Móvil o transferencia, y le manda el PDF al cliente por correo. Se escribe el precio final, como se cobra, y el sistema saca solo el IVA que pide Hacienda.',
      'Separa servicios, productos de venta e insumos de cabina, con su código CABYS y la ganancia real de cada artículo, que solo ven el dueño y el contador. Al cobrar se escoge quién atendió y la comisión del barbero se calcula sola. También lleva inventario con aviso de existencias bajas, crédito a clientes y reportes en Excel.',
      'Se dejó fuera lo que el salón no necesitaba y se agregó lo propio de su día a día. Diseño minimalista en blanco, negro y gris, como su logo, con modo claro y oscuro. Las cifras de las capturas son de demostración.',
    ],
    deliverables: ['Comprobantes electrónicos v4.4', 'Comisiones de barberos', 'Inventario e insumos de cabina', 'Crédito a clientes', 'Reportes exportables a Excel', 'App instalable (PWA)'],
    colors: ['#1A1A1A', '#F4F3F0'],
    cover: 'projects/essence-hair-studio/cover.webp',
    gallery: [
      'projects/essence-hair-studio/cobrar.webp',
      'projects/essence-hair-studio/movil-inicio.webp',
      'projects/essence-hair-studio/catalogo.webp',
      'projects/essence-hair-studio/movil-cobrar.webp',
      'projects/essence-hair-studio/reportes.webp',
      'projects/essence-hair-studio/movil-catalogo.webp',
      'projects/essence-hair-studio/creditos.webp',
      'projects/essence-hair-studio/movil-reportes.webp',
    ],
    one: true,
  },
  {
    slug: 'd-rabbit',
    title: 'D_Rabbit',
    client: 'Daniel Conejo',
    year: 2026,
    type: 'persona',
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
    type: 'negocio',
    services: ['Apps', 'Web'],
    summary: 'Finanzas personales con propósito: balance del mes, gastos con metas, tarjetas, deudas y la Biblia en una sola app.',
    description: [
      'Talenta es una app para administrar el dinero con un propósito claro: "Administrando para la Gloria de Dios".',
      'Muestra el balance del mes con ingresos y gastos, organiza los gastos variables y fijos por categoría con una meta recomendada, lleva las tarjetas de crédito y débito, y registra créditos y deudas con sus pagos y un PDF descargable. También trae la Biblia para leer, buscar y guardar versículos.',
      'Cada persona tiene su cuenta y entra desde el navegador o la instala como app en su teléfono.',
    ],
    deliverables: ['Balance mensual', 'Gastos por categoría con metas', 'Tarjetas, créditos y deudas', 'Biblia con versículos guardados', 'App instalable (PWA)'],
    colors: ['#C6963A', '#5C4420'],
    cover: 'projects/talenta/cover.webp',
    gallery: [
      'projects/talenta/metas.webp',
      'projects/talenta/deudas.webp',
      'projects/talenta/biblia.webp',
    ],
    url: 'https://talentaapp.com',
  },
  {
    slug: 'invitacion-cumple',
    title: 'Invitación de cumpleaños',
    client: 'Cliente particular',
    year: 2026,
    type: 'persona',
    services: ['Invitación', 'Web'],
    summary: 'Invitación interactiva con temática de construcción, cuenta regresiva y confirmación por WhatsApp.',
    description: [
      'Una invitación web para el tercer cumpleaños de un niño, con temática de construcción en amarillo y negro.',
      'Tiene cuenta regresiva, una "orden de trabajo" con fecha, hora y lugar, botones para llegar con Waze o Google Maps y una flota de máquinas que saludan al tocarlas. Para confirmar, el invitado escribe su nombre y sus acompañantes: la invitación arma el mensaje de WhatsApp listo para enviar y guarda cada respuesta en una hoja de Google.',
      'Es un solo archivo, sin instalar nada, y los papás cambian fecha, lugar y fotos desde un bloque de configuración.',
    ],
    deliverables: ['Invitación web interactiva', 'Cuenta regresiva', 'Confirmación por WhatsApp', 'Lista de invitados en Google Sheets'],
    stack: ['HTML5', 'Tailwind CSS', 'Google Apps Script'],
    colors: ['#FFC20E', '#1A1A1A'],
    cover: 'projects/invitacion-cumple/cover.webp',
    gallery: ['projects/invitacion-cumple/flota.webp', 'projects/invitacion-cumple/mobile.webp', 'projects/invitacion-cumple/orden.webp', 'projects/invitacion-cumple/confirmar.webp'],
  },
  {
    slug: 'portafolio-jean-carlo',
    title: 'Portafolio de Jean Carlo',
    client: 'Jean Carlo Villamonte',
    year: 2026,
    type: 'persona',
    services: ['Portafolio', 'Web'],
    summary: 'Portafolio profesional bilingüe con trayectoria, certificaciones y proyectos.',
    description: [
      'Mi propio portafolio profesional: una página en inglés y español que cuenta mi recorrido, del desarrollo backend en sistemas de facturación a la consultoría en inteligencia artificial.',
      'Incluye una línea de tiempo con el logo de cada empresa, certificaciones, proyectos y modo claro u oscuro. Es el tipo de página que hago para profesionales que quieren verse bien ante reclutadores y clientes.',
    ],
    deliverables: ['Sitio bilingüe (EN / ES)', 'Línea de tiempo de experiencia', 'Sección de certificaciones', 'Modo claro y oscuro'],
    stack: ['HTML5', 'CSS', 'JavaScript'],
    colors: ['#2A2A2A', '#0E0E0E'],
    cover: 'projects/portafolio-jean-carlo/cover.webp',
    gallery: ['projects/portafolio-jean-carlo/experiencia.webp', 'projects/portafolio-jean-carlo/certificaciones.webp', 'projects/portafolio-jean-carlo/mobile.webp'],
    url: 'https://je4nca.github.io/personal-portfolio/',
  },
  {
    slug: 'la-vera-pizza',
    title: 'La Vera Pizza',
    client: 'La Vera Pizza',
    year: 2025,
    type: 'negocio',
    services: ['Sistemas', 'Diseño'],
    summary: 'Punto de venta a la medida para una pizzería costarricense: caja, mesas, cocina y reportes conectados en tiempo real.',
    description: [
      'La Vera Pizza necesitaba que la caja, las mesas y la cocina trabajaran sincronizadas, sin papelitos de por medio.',
      'Desarrollé un punto de venta web a la medida: pizzas por tamaño, cobro en efectivo, tarjeta o SINPE Móvil, cuentas divididas y descuentos. Cada venta llega al instante a una pantalla de cocina, donde el equipo avanza la orden de recibida a horneando y lista, con aviso sonoro.',
      'El dueño tiene un dashboard con los ingresos del día, ventas por hora y productos más vendidos, además de reportes por cajero y cierre de caja. Completé el proyecto con la identidad visual de la marca.',
    ],
    deliverables: ['Punto de venta con varios cajeros', 'Pantalla de cocina en tiempo real', 'Gestión de mesas', 'Dashboard, reportes y cierre de caja', 'Identidad visual'],
    stack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    colors: ['#1E2D24', '#0F1712'],
    cover: 'projects/la-vera-pizza/cover.webp',
    gallery: ['projects/la-vera-pizza/venta.webp', 'projects/la-vera-pizza/cocina.webp', 'projects/la-vera-pizza/reportes.webp', 'projects/la-vera-pizza/mesas.webp'],
    featured: true,
  },
];
