import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { GenerateRoutes, SimpleOrder, SimpleRoute } from 'src/app/services/services.models';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    DatePipe
  ]
})

export class RoutesComponent implements OnInit {
  date: Date;
  dataSource: MatTableDataSource<SimpleRoute>;
  columnsToDisplay = ['position', 'shippingDate', 'stops'];
  innerDisplayedColumns = ['customer', 'address', 'shippingDate'];
  isLoading: boolean;
  routesData: SimpleRoute[] = [];
  currentDate: string;
  selectedDate: string;
  expandedElement: SimpleRoute | null;

  constructor(private cd: ChangeDetectorRef, private ordersService: OrdersService, public datepipe: DatePipe, private matDialog: MatDialog, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.date = new Date();
    this.currentDate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.isLoading = true;
    this.getRoutes(this.currentDate);
  }

  toggleRow(element: SimpleRoute) {
    element.route && (element.route as MatTableDataSource<SimpleOrder>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }

  private getRoutes(shippingDate: string): void {
    this.routesData = [];
    this.ordersService.listOrderRoutes(shippingDate).subscribe(response => {
      if (response.ok) {
        response.data.forEach(r => {
          if (r.route && Array.isArray(r.route) && r.route.length) {
            this.routesData = [...this.routesData, { ...r, route: new MatTableDataSource(r.route) }];
          } else {
            this.routesData = [...this.routesData, r];
          }
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.routesData);
      }
    });
  }

  getColumnDef(column: string) {
    switch (column) {
      case 'position':
        return 'Ruta';
      case 'shippingDate':
        return 'Fecha de envío';
      case 'stops':
        return 'Paradas';
      case 'customer':
        return 'Cliente';
      case 'address':
        return 'Dirección';
      default:
        return column;
    }
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.isLoading = true;
    this.getRoutes(this.selectedDate);
  }

  confirmRoute() {
    const dialogRef = this.matDialog.open(ConfirmRouteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const generateRoutes = new GenerateRoutes();
        if (this.selectedDate) {
          generateRoutes.shippingDate = this.selectedDate;
        } else {
          generateRoutes.shippingDate = this.currentDate;
        }
        this.ordersService.generateRoutes(generateRoutes).subscribe(response => {
          if (response.ok) {
            this.isLoading = true;
            this.getRoutes(this.currentDate);
          }
        });
      }
    });
  }
}

@Component({
  selector: 'confirm-route-dialog',
  templateUrl: 'confirm-route-dialog.html',
})
export class ConfirmRouteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmRouteDialogComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}