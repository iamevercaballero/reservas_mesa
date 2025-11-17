// Componente para listar y filtrar las reservas de mesas en el restaurante
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { Zone } from '../../models/zone.model';
import { Reservation } from '../../models/reservation.model';
import { Table } from '../../models/table.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { ZoneService } from '../../services/zone.service';
import { ReservationService } from '../../services/reservation.service';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  zones: Zone[] = [];
  allZones: Zone[] = [];       // todas las zonas del sistema
  reservations: Reservation[] = [];

  selectedRestaurantId: number | null = null;
  selectedZoneId: number | null = null;
  fechaFiltro: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private zoneService: ZoneService,
    private reservationService: ReservationService,
    private tableService: TableService
  ) {}


  ngOnInit(): void {
    this.restaurants = this.restaurantService.getAll();
    this.allZones = this.zoneService.getAll();
    this.loadReservations();
  }

  onRestaurantChange() {
    if (this.selectedRestaurantId) {
      this.zones = this.zoneService.getByRestaurant(this.selectedRestaurantId);
    } else {
      this.zones = [];
    }
    this.selectedZoneId = null;
    this.loadReservations();
  }

  onZoneChange() {
    this.loadReservations();
  }

  onFechaChange() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservations = this.reservationService.getByFilters(
      this.selectedRestaurantId || undefined,
      this.selectedZoneId || undefined,
      this.fechaFiltro || undefined
    );
  }

  limpiarFiltros() {
    this.selectedRestaurantId = null;
    this.selectedZoneId = null;
    this.fechaFiltro = '';
    this.zones = [];
    this.loadReservations();
  }

  // Helpers para mostrar nombres en la tabla
getRestaurantName(restauranteId: number | null | undefined): string {
  if (restauranteId == null) return '';
  const r = this.restaurants.find(x => x.id === restauranteId);
  return r ? r.nombre : '';
}

getZoneName(zonaId: number | null | undefined): string {
  if (zonaId == null) return '';
  const z = this.allZones.find(x => x.id === zonaId);
  return z ? z.nombre : '';
}

getTableLabel(mesaId: number | null | undefined): string {
  if (mesaId == null) return '';
  const t = this.tableService.getById(mesaId);
  if (!t) return '';
  return `Mesa ${t.numero} (${t.capacidad} pers.)`;
}

  deleteReservation(id: number) {
    if (confirm('¿Eliminar reserva?')) {
      this.reservationService.delete(id);
      this.loadReservations();
    }
  }
}
