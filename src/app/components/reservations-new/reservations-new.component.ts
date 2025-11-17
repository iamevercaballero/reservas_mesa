// Componente para crear una nueva reserva de mesa en el restaurante
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { Zone } from '../../models/zone.model';
import { Table } from '../../models/table.model';
import { Reservation } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { ZoneService } from '../../services/zone.service';
import { TableService } from '../../services/table.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations-new.component.html',
  styleUrl: './reservations-new.component.scss'
})
export class ReservationsNewComponent implements OnInit {

  restaurants: Restaurant[] = [];
  zones: Zone[] = [];
  horariosZona: string[] = [];

  selectedRestaurantId: number | null = null;
  selectedZoneId: number | null = null;

  fecha: string = '';
  hora: string = '';
  cantidadPersonas: number = 1;

  nombre: string = '';
  apellido: string = '';
  telefono: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private zoneService: ZoneService,
    private tableService: TableService,
    private reservationService: ReservationService
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
    this.horariosZona = [];
    this.hora = '';
  }

  onZoneChange() {
    this.horariosZona = [];
    this.hora = '';
    if (this.selectedZoneId) {
      const zona = this.zoneService.getById(this.selectedZoneId);
      if (zona && zona.horarios) {
        this.horariosZona = zona.horarios;
      }
    }
  }

  confirmarReserva() {
    if (!this.selectedRestaurantId || !this.selectedZoneId) {
      alert('Seleccione restaurante y zona');
      return;
    }

    if (!this.fecha || !this.hora) {
      alert('Seleccione fecha y hora');
      return;
    }

    if (!this.nombre.trim() || !this.apellido.trim() || !this.telefono.trim()) {
      alert('Complete los datos del cliente');
      return;
    }

    if (this.cantidadPersonas <= 0) {
      alert('La cantidad de personas debe ser mayor a 0');
      return;
    }

    const mesa = this.findBestTableForReservation(
      this.selectedZoneId,
      this.fecha,
      this.hora,
      this.cantidadPersonas
    );

    if (!mesa) {
      alert('No hay mesas disponibles para esa cantidad de personas en ese horario.');
      return;
    }

    const nuevaReserva: Reservation = {
      id: 0,
      restauranteId: this.selectedRestaurantId!,
      zonaId: this.selectedZoneId!,
      mesaId: mesa.id,
      fecha: this.fecha!,
      hora: this.hora!,
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      cantidadPersonas: this.cantidadPersonas
    };

    this.reservationService.add(nuevaReserva);
    alert(`Reserva creada correctamente. Mesa asignada: ${mesa.numero}`);
    this.limpiar();
  }

  private findBestTableForReservation(
    zonaId: number,
    fecha: string,
    hora: string,
    cantidadPersonas: number
  ): Table | null {

    // 1) Mesas de la zona con capacidad >= cantidadPersonas
    const mesasZona = this.tableService
      .getByZone(zonaId)
      .filter(m => m.capacidad >= cantidadPersonas);

    if (!mesasZona.length) {
      return null;
    }

    // 2) Reservas existentes en esa zona / fecha / hora
    const reservasOcupadas = this.reservationService
      .getByZonaFechaHora(zonaId, fecha, hora);

    const mesasOcupadasIds = reservasOcupadas.map(r => r.mesaId);

    // 3) Mesas libres
    const mesasLibres = mesasZona.filter(m => !mesasOcupadasIds.includes(m.id));

    if (!mesasLibres.length) {
      return null;
    }

    // 4) Elegir la mesa con menor capacidad (más ajustada)
    let mejorMesa = mesasLibres[0];
    for (const m of mesasLibres) {
      if (m.capacidad < mejorMesa.capacidad) {
        mejorMesa = m;
      }
    }

    return mejorMesa;
  }

  limpiar() {
    this.selectedRestaurantId = null;
    this.selectedZoneId = null;
    this.zones = [];
    this.horariosZona = [];

    this.fecha = '';
    this.hora = '';
    this.cantidadPersonas = 1;

    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
  }
}
