import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../models/restaurant.model';
import { Zone } from '../../models/zone.model';
import { Table } from '../../models/table.model';
import { RestaurantService } from '../../services/restaurant.service';
import { ZoneService } from '../../services/zone.service';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit {

  restaurants: Restaurant[] = [];
  zones: Zone[] = [];
  tables: Table[] = [];

  selectedRestaurantId: number | null = null;
  selectedZoneId: number | null = null;

  current: Table = {
    id: 0,
    numero: '',
    capacidad: 1,
    zonaId: 0
  };

  constructor(
    private restaurantService: RestaurantService,
    private zoneService: ZoneService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.restaurants = this.restaurantService.getAll();
  }

  onRestaurantChange() {
    if (this.selectedRestaurantId) {
      this.zones = this.zoneService.getByRestaurant(this.selectedRestaurantId);
    } else {
      this.zones = [];
    }
    this.selectedZoneId = null;
    this.tables = [];
    this.clearTable();
  }

  onZoneChange() {
    if (this.selectedZoneId) {
      this.tables = this.tableService.getByZone(this.selectedZoneId);
    } else {
      this.tables = [];
    }
    this.clearTable();
  }

saveTable() {
  if (!this.selectedRestaurantId || !this.selectedZoneId) {
    alert('Seleccione restaurante y zona');
    return;
  }

  if (!this.current.numero || !this.current.capacidad) {
    alert('Complete número de mesa y capacidad');
    return;
  }

  // Armo la mesa con la zona seleccionada
  const mesa = {
    id: this.current.id ?? 0,
    zonaId: this.selectedZoneId,
    numero: this.current.numero,
    capacidad: this.current.capacidad,
  };

  console.log('Guardando mesa', mesa);

  if (this.current.id) {
    // editar
    this.tableService.update(mesa);
  } else {
    // alta
    this.tableService.add(mesa);
  }

  // Recargo la lista de mesas de esa zona
  this.loadTables();
  this.clearTable();
}

  loadTables() {
    if (this.selectedZoneId) {
      this.tables = this.tableService.getByZone(this.selectedZoneId);
    } else {
      this.tables = [];
    }
  }

  edit(t: Table) {
    this.current = { ...t };
  }

  delete(id: number) {
    if (confirm('¿Eliminar mesa?')) {
      this.tableService.delete(id);
      this.onZoneChange();
    }
  }

  clearTable() {
    this.current = {
      id: 0,
      numero: '',
      capacidad: 1,
      zonaId: this.selectedZoneId || 0
    };
  }
}
