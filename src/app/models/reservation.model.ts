// Modelo de datos para una reserva en el sistema de reservas de restaurantes
export interface Reservation {
  id: number;
  restauranteId: number;
  zonaId: number;
  mesaId: number;
  fecha: string;
  hora: string;
  nombre: string;
  apellido: string;
  telefono: string;
  cantidadPersonas: number;
}