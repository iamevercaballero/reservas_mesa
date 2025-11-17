// Servicio para manejar el almacenamiento local (localStorage) de manera segura
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // Verifica si estamos en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  getItem<T>(key: string): T[] {
    if (!this.isBrowser()) {
      // En el servidor (SSR) no hay localStorage → devolvemos lista vacía
      return [];
    }
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  }

  setItem<T>(key: string, data: T[]): void {
    if (!this.isBrowser()) {
      // En el servidor no intentamos guardar nada
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}
