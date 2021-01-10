import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAccountRequestComponent } from './customer-account-request.component';

const routes: Routes = [
  { path: 'request', component: CustomerAccountRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAccountRequestRoutingModule { }
