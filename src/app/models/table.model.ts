// Modelo de datos para una mesa en el sistema de reservas de restaurantes
export interface Table {
  id: number;
  numero: string;   // "M1", "T5", etc.
  capacidad: number;
  zonaId: number;
}
