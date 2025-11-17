import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];
  current: Restaurant = { id: 0, nombre: '' };

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.restaurants = this.restaurantService.getAll();
  }

  saveRestaurant() {
    if (!this.current.nombre.trim()) return;

    if (this.current.id) {
      this.restaurantService.update(this.current);
    } else {
      this.restaurantService.add({ ...this.current, id: 0 });
    }
    this.clear();
    this.load();
  }

  edit(r: Restaurant) {
    this.current = { ...r };
  }

  delete(id: number) {
    if (confirm('¿Seguro que desea eliminar el restaurante?')) {
      this.restaurantService.delete(id);
      this.load();
    }
  }

  clear() {
    this.current = { id: 0, nombre: '' };
  }
}
