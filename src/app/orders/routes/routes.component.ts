import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { SimpleOrder, SimpleRoute } from 'src/app/services/services.models';
import { DatePipe } from '@angular/common';

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
})

export class RoutesComponent implements OnInit {
  dataSource: MatTableDataSource<SimpleRoute>;
  columnsToDisplay = ['position', 'shippingDate', 'stops'];
  innerDisplayedColumns = ['customer', 'address', 'shippingDate'];
  isLoading: boolean;
  routesData: SimpleRoute[] = [];
  expandedElement: SimpleRoute | null;

  constructor(private cd: ChangeDetectorRef, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.ordersService.listOrderRoutes("2021-01-09").subscribe(response => {
      if (response.ok) {
        response.data.forEach(r => {
          if (r.route && Array.isArray(r.route) && r.route.length) {
            console.log(this.routesData);
            this.routesData = [...this.routesData, {...r, route: new MatTableDataSource(r.route)}];
          } else {
            this.routesData = [...this.routesData, r];
          }
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.routesData);
      }
    });
  }

  toggleRow(element: SimpleRoute) {
    element.route && (element.route as MatTableDataSource<SimpleOrder>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }

  getColumnDef(column: string) {
    switch (column) {
      case 'name':
        return 'nombre';
      default:
        return column;
    }
  }
}