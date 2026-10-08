/** Las líneas de trabajo del estudio. Se muestran como etiquetas en cada proyecto. */
export type Service = 'Web' | 'Apps' | 'Facturación' | 'Sistemas' | 'Diseño' | 'Portafolio' | 'Invitación';

/** Para quién es: `negocio`, `persona` (artistas, profesionales, eventos), `producto` propio de Montevo o `concepto`. */
export type ProjectType = 'negocio' | 'persona' | 'producto' | 'concepto';

export interface Project {
  /** Único, en minúsculas y con guiones. Va en la URL: #/proyecto/<slug> */
  slug: string;
  title: string;
  client: string;
  year: number;
  type: ProjectType;
  services: Service[];
  /** Una línea. Se ve en la tarjeta y debajo del título del caso. */
  summary: string;
  /** Párrafos del caso. */
  description: string[];
  deliverables: string[];
  /** Tecnologías usadas, opcional. Ej: ['TypeScript', 'React Native', 'PostgreSQL'] */
  stack?: string[];
  /** Degradado de la portada cuando no hay imagen: [color claro, color oscuro]. */
  colors: [string, string];
  /** Ruta dentro de /public. Ej: 'projects/la-vera-pizza/cover.jpg' */
  cover?: string;
  /** Rutas dentro de /public. Las capturas verticales (de celular) se muestran con marco de teléfono. */
  gallery?: string[];
  /** Link al proyecto en vivo, opcional. */
  url?: string;
  /** true = tarjeta a todo el ancho. */
  featured?: boolean;
}
