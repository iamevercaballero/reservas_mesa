// Servicio para manejar las reservas de mesas en el restaurante
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { LocalStorageService } from './local-storage.service';

const KEY = 'reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor(private ls: LocalStorageService) {
    this.reservations = this.ls.getItem<Reservation>(KEY);
  }

  private save() {
    this.ls.setItem<Reservation>(KEY, this.reservations);
  }

  getAll(): Reservation[] {
    return [...this.reservations];
  }

  add(r: Reservation) {
    r.id = this.getNextId();
    this.reservations.push(r);
    this.save();
  }

  update(r: Reservation) {
    const idx = this.reservations.findIndex(x => x.id === r.id);
    if (idx > -1) {
      this.reservations[idx] = r;
      this.save();
    }
  }

  delete(id: number) {
    this.reservations = this.reservations.filter(r => r.id !== id);
    this.save();
  }

  // Para filtros en el listado
  getByFilters(restauranteId?: number, zonaId?: number, fecha?: string): Reservation[] {
    return this.reservations.filter(r => {
      const byRest = restauranteId ? r.restauranteId === restauranteId : true;
      const byZona = zonaId ? r.zonaId === zonaId : true;
      const byFecha = fecha ? r.fecha === fecha : true;
      return byRest && byZona && byFecha;
    });
  }

  // Para chequear disponibilidad en una zona determinado día/hora
  getByZonaFechaHora(zonaId: number, fecha: string, hora: string): Reservation[] {
    return this.reservations.filter(r =>
      r.zonaId === zonaId &&
      r.fecha === fecha &&
      r.hora === hora
    );
  }

  private getNextId(): number {
    return this.reservations.length ? Math.max(...this.reservations.map(r => r.id)) + 1 : 1;
  }
}
