import { Injectable } from '@angular/core';
import { Zone } from '../models/zone.model';
import { LocalStorageService } from './local-storage.service';

const KEY = 'zones';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private zones: Zone[] = [];

  constructor(private ls: LocalStorageService) {
    this.zones = this.ls.getItem<Zone>(KEY);
  }

  private save() {
    this.ls.setItem<Zone>(KEY, this.zones);
  }

  getAll(): Zone[] {
    return [...this.zones];
  }

  getByRestaurant(restauranteId: number): Zone[] {
    return this.zones.filter(z => z.restauranteId === restauranteId);
  }

  getById(id: number): Zone | undefined {
    return this.zones.find(z => z.id === id);
  }

  add(z: Zone) {
    z.id = this.getNextId();
    if (!z.horarios) {
      z.horarios = [];
    }
    this.zones.push(z);
    this.save();
  }

  update(z: Zone) {
    const idx = this.zones.findIndex(x => x.id === z.id);
    if (idx > -1) {
      this.zones[idx] = z;
      this.save();
    }
  }

  delete(id: number) {
    this.zones = this.zones.filter(z => z.id !== id);
    this.save();
  }

  updateHorarios(zoneId: number, horarios: string[]) {
    const zona = this.getById(zoneId);
    if (zona) {
      zona.horarios = horarios;
      this.save();
    }
  }

  private getNextId(): number {
    return this.zones.length ? Math.max(...this.zones.map(z => z.id)) + 1 : 1;
  }
}
