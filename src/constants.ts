
import { Obra, SolicitudCesion } from './types';

export const MOCK_OBRAS: Obra[] = [
  {
    id: "#MC-001",
    titulo: "Molinos de Viento en Ocre",
    autor: "Alonso Quijano el Mozo",
    tipo: "CUADRO",
    periodo: "S. XVII",
    tecnica: "Óleo sobre lienzo",
    valoracion: 1200000,
    recaudadoCesiones: 960000,
    fechaIngreso: "1924-05-12",
    ultimaRestauracion: "2017-09-15", // > 5 años
    imagenUrl: "https://picsum.photos/seed/obra1/400/400",
    sala: "Sala A - Siglo de Oro"
  },
  {
    id: "#ME-042",
    titulo: "El Caballero Desconocido",
    autor: "Desconocido",
    tipo: "ESCULTURA",
    periodo: "Renacimiento",
    material: "Mármol de Carrara",
    valoracion: 850000,
    recaudadoCesiones: 688500,
    fechaIngreso: "1950-01-20",
    ultimaRestauracion: "2021-03-22",
    imagenUrl: "https://picsum.photos/seed/obra2/400/400",
    sala: "Sala B - Renacimiento"
  },
  {
    id: "#MC-105",
    titulo: "Atardecer en la Llanura",
    autor: "Juana la Serrana",
    tipo: "CUADRO",
    periodo: "S. XIX",
    tecnica: "Acuarela",
    valoracion: 45000,
    recaudadoCesiones: 32400,
    fechaIngreso: "2010-11-05",
    ultimaRestauracion: "2015-06-10", // > 5 años
    imagenUrl: "https://picsum.photos/seed/obra3/400/400",
    sala: "Sala C - Costumbrismo"
  },
  {
    id: "#MF-200",
    titulo: "Gigantes de Hierro",
    autor: "Manrique",
    tipo: "FOTOGRAFIA",
    periodo: "Contemporáneo",
    valoracion: 12000,
    recaudadoCesiones: 10000,
    fechaIngreso: "2020-01-01",
    ultimaRestauracion: "2023-12-01",
    imagenUrl: "https://picsum.photos/seed/obra4/400/400",
    sala: "Sala D - Fotografía"
  }
];

export const MOCK_SOLICITUDES: SolicitudCesion[] = [
  {
    id: "882",
    museo: "Museo del Prado",
    obraTitulo: "Molinos de Viento en Ocre",
    fechaSolicitud: "2024-05-20T10:00:00Z",
    estado: "PENDIENTE"
  },
  {
    id: "881",
    museo: "Louvre Abu Dhabi",
    obraTitulo: "El Caballero Desconocido",
    fechaSolicitud: "2024-05-20T11:30:00Z",
    estado: "PENDIENTE"
  },
  {
    id: "880",
    museo: "Guggenheim Bilbao",
    obraTitulo: "Atardecer en la Llanura",
    fechaSolicitud: "2024-05-19T09:00:00Z",
    estado: "PENDIENTE"
  }
];
