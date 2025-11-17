import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Restaurant } from '../../models/restaurant.model';
import { Zone } from '../../models/zone.model';
import { RestaurantService } from '../../services/restaurant.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.scss'
})
export class ZonesComponent implements OnInit {

  restaurants: Restaurant[] = [];
  zones: Zone[] = [];
  selectedRestaurantId: number | null = null;

  current: Zone = {
    id: 0,
    nombre: '',
    restauranteId: 0,
    horarios: []
  };

  constructor(
    private restaurantService: RestaurantService,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.restaurants = this.restaurantService.getAll();
  }

  onRestaurantChange() {
    if (this.selectedRestaurantId) {
      this.zones = this.zoneService.getByRestaurant(this.selectedRestaurantId);
      this.clearZone();
    } else {
      this.zones = [];
      this.clearZone();
    }
  }

  saveZone() {
    if (!this.selectedRestaurantId) {
      alert('Seleccione un restaurante');
      return;
    }
    if (!this.current.nombre.trim()) return;

    this.current.restauranteId = this.selectedRestaurantId;

    if (this.current.id) {
      this.zoneService.update(this.current);
    } else {
      this.zoneService.add({ ...this.current, id: 0 });
    }

    this.onRestaurantChange();
    this.clearZone();
  }

  edit(z: Zone) {
    this.current = { ...z };
  }

  delete(id: number) {
    if (confirm('¿Eliminar zona?')) {
      this.zoneService.delete(id);
      this.onRestaurantChange();
    }
  }

  clearZone() {
    this.current = {
      id: 0,
      nombre: '',
      restauranteId: this.selectedRestaurantId || 0,
      horarios: []
    };
  }
}
