// Servicio para manejar las mesas del restaurante
import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { LocalStorageService } from './local-storage.service';

const KEY = 'tables';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private tables: Table[] = [];

  constructor(private ls: LocalStorageService) {
    this.tables = this.ls.getItem<Table>(KEY);
  }

  private save() {
    this.ls.setItem<Table>(KEY, this.tables);
  }

  getAll(): Table[] {
    return [...this.tables];
  }

  getByZone(zonaId: number): Table[] {
    return this.tables.filter(t => t.zonaId === zonaId);
  }

  getById(id: number): Table | undefined {
    return this.tables.find(t => t.id === id);
  }

  add(t: Table) {
    t.id = this.getNextId();
    this.tables.push(t);
    this.save();
  }

  update(t: Table) {
    const idx = this.tables.findIndex(x => x.id === t.id);
    if (idx > -1) {
      this.tables[idx] = t;
      this.save();
    }
  }

  delete(id: number) {
    this.tables = this.tables.filter(t => t.id !== id);
    this.save();
  }

  private getNextId(): number {
    return this.tables.length ? Math.max(...this.tables.map(t => t.id)) + 1 : 1;
  }
}
