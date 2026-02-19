
export type UserRole = 'DIRECTOR' | 'RESTAURADOR' | 'CATALOGADOR' | 'PUBLICO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export type TipoObra = 'CUADRO' | 'ESCULTURA' | 'FOTOGRAFIA' | 'OTRO';

export interface Obra {
  id: string;
  titulo: string;
  autor: string;
  tipo: TipoObra;
  periodo: string;
  tecnica?: string; // Solo para cuadros
  material?: string; // Solo para esculturas
  valoracion: number;
  recaudadoCesiones: number;
  fechaIngreso: string;
  ultimaRestauracion: string; // ISO String
  imagenUrl: string;
  sala: string;
}

export interface SolicitudCesion {
  id: string;
  museo: string;
  obraTitulo: string;
  fechaSolicitud: string; // ISO String
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
}
