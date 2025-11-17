import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../models/restaurant.model';
import { Zone } from '../../models/zone.model';
import { RestaurantService } from '../../services/restaurant.service';
import { ZoneService } from '../../services/zone.service';
@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zone-schedules.component.html',
  styleUrl: './zone-schedules.component.scss'
})
export class ZoneSchedulesComponent implements OnInit {

  restaurants: Restaurant[] = [];
  zones: Zone[] = [];

  selectedRestaurantId: number | null = null;
  selectedZoneId: number | null = null;

  horarios: string[] = [];
  nuevoHorario: string = ''; // formato HH:MM

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
    } else {
      this.zones = [];
    }
    this.selectedZoneId = null;
    this.horarios = [];
    this.nuevoHorario = '';
  }

  onZoneChange() {
    this.horarios = [];
    this.nuevoHorario = '';
    if (this.selectedZoneId) {
      const zona = this.zoneService.getById(this.selectedZoneId);
      if (zona && zona.horarios) {
        this.horarios = [...zona.horarios];
      }
    }
  }

  agregarHorario() {
    const h = this.nuevoHorario.trim();
    if (!h) {
      alert('Ingrese un horario');
      return;
    }

    if (this.horarios.includes(h)) {
      alert('Ese horario ya está cargado');
      return;
    }

    this.horarios.push(h);
    // opcional: ordenar
    this.horarios.sort();
    this.nuevoHorario = '';
  }

  eliminarHorario(horario: string) {
    this.horarios = this.horarios.filter(h => h !== horario);
  }

  guardarHorarios() {
    if (!this.selectedZoneId) {
      alert('Seleccione una zona');
      return;
    }

    this.zoneService.updateHorarios(this.selectedZoneId, this.horarios);
    alert('Horarios guardados correctamente');
  }

  limpiar() {
    this.selectedRestaurantId = null;
    this.selectedZoneId = null;
    this.zones = [];
    this.horarios = [];
    this.nuevoHorario = '';
  }
}
