import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
