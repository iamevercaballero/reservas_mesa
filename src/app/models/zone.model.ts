// Modelo de datos para una zona en el sistema de reservas de restaurantes
export interface Zone {
  id: number;
  nombre: string;
  restauranteId: number;
  horarios: string[]; 
}
