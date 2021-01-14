import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { OrdersRoutingModule } from './orders-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { InspectComponent } from './inspect/inspect.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateContractComponent } from './create-contract/create-contract.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ConfirmRouteDialogComponent, RoutesComponent } from './routes/routes.component';

@NgModule({
  declarations: [ListComponent, EditComponent, DeleteComponent, InspectComponent, CalendarComponent, CreateContractComponent, CustomersListComponent, ProductsListComponent, RoutesComponent, ConfirmRouteDialogComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'KEY'
    }),
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    OrdersRoutingModule
  ],
  providers: [  
    MatDatepickerModule,  
  ]
})
export class OrdersModule { }
