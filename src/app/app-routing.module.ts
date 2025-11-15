import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { ZonesComponent } from './components/zones/zones.component';
import { TablesComponent } from './components/tables/tables.component';
import { ZoneSchedulesComponent } from './components/zone-schedules/zone-schedules.component';
import { ReservationsNewComponent } from './components/reservations-new/reservations-new.component';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'zones', component: ZonesComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'zone-schedules', component: ZoneSchedulesComponent },
  { path: 'reservations/new', component: ReservationsNewComponent },
  { path: 'reservations', component: ReservationsListComponent },
  { path: '**', redirectTo: 'restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
