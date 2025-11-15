import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { LocalStorageService } from './local-storage.service';

const KEY = 'restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[] = [];

  constructor(private ls: LocalStorageService) {
    this.restaurants = this.ls.getItem<Restaurant>(KEY);
  }

  private save() {
    this.ls.setItem<Restaurant>(KEY, this.restaurants);
  }

  getAll(): Restaurant[] {
    return [...this.restaurants];
  }

  add(r: Restaurant) {
    r.id = this.getNextId();
    this.restaurants.push(r);
    this.save();
  }

  update(r: Restaurant) {
    const idx = this.restaurants.findIndex(x => x.id === r.id);
    if (idx > -1) {
      this.restaurants[idx] = r;
      this.save();
    }
  }

  delete(id: number) {
    this.restaurants = this.restaurants.filter(r => r.id !== id);
    this.save();
  }

  private getNextId(): number {
    return this.restaurants.length ? Math.max(...this.restaurants.map(r => r.id)) + 1 : 1;
  }
}
