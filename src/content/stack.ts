/**
 * Technology stack shown on the site (icons from simple-icons).
 */
import {
  siReact, siTypescript, siFirebase, siSupabase, siPostgresql,
  siResend, siCloudflare, siTailwindcss, siHtml5, siVite,
} from 'simple-icons';

/* =============================================================
   STACK — las herramientas que se muestran en la sección
   "Tecnología". Para agregar una, importa su logo de
   simple-icons (busca el nombre en https://simpleicons.org) y
   agrega una línea a la lista.
   ============================================================= */

export interface Tool {
  icon: { title: string; path: string; hex: string };
  /** Para qué la uso, en pocas palabras. */
  role: string;
}

export const stack: Tool[] = [
  { icon: siReact, role: 'Interfaces rápidas y fluidas' },
  { icon: siTypescript, role: 'Código tipado y confiable' },
  { icon: siFirebase, role: 'Datos en tiempo real y autenticación' },
  { icon: siSupabase, role: 'Backend, usuarios y almacenamiento' },
  { icon: siPostgresql, role: 'Base de datos sólida para crecer' },
  { icon: siResend, role: 'Correos de facturas y avisos' },
  { icon: siCloudflare, role: 'Dominio, CDN y seguridad' },
  { icon: siTailwindcss, role: 'Diseño consistente en cada pantalla' },
  { icon: siHtml5, role: 'Sitios accesibles y bien estructurados' },
  { icon: siVite, role: 'Builds rápidos y livianos' },
];
