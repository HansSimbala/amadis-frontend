import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleOrder } from 'src/app/services/services.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[];
  isLoading: boolean;
  orderDataSource: MatTableDataSource<SimpleOrder>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar, private ordersService: OrdersService) { }

  private refreshTable(): void {
    // List people
    this.ordersService.listOrders().subscribe(response => {
      if (response.ok) {
        this.orderDataSource = new MatTableDataSource(response.data);
        this.orderDataSource.paginator = this.paginator;
        this.isLoading = false;
      } else {
      }
    });
  }

  filterTableData(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    var orderStateId = 0;
    if(tab==="En ruta") {
      orderStateId = 1;
    } else if (tab==="Pendiente de pago") {
      orderStateId = 6;
    } else {
      orderStateId = 7;
    }
    this.ordersService.listOrders(orderStateId).subscribe(response => {
      if (response.ok) {
        this.orderDataSource = new MatTableDataSource(response.data);
        this.isLoading = false;
      }
    });
  }

  getOrderType(orderTypeId: number) {
    if(orderTypeId === 1) {
      return "Al contado";
    } else {
      return "Por consignación";
    }

  }

  ngOnInit(): void {
        // Initialize properties
        this.displayedColumns = ['customer', 'address', 'orderType', 'shippingDate', 'actions'];
        this.isLoading = true;
        this.refreshTable();
  }

}
