import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { ListComponent } from './list/list.component';
import { RoutesComponent } from './routes/routes.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'list', component: ListComponent },
  { path: 'routes', component: RoutesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
