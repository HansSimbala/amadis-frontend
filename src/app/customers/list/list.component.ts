import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { EditComponent } from './../edit/edit.component';
import { DeleteComponent } from './../delete/delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleCustomer } from 'src/app/services/services.models';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { InspectComponent } from '../inspect/inspect.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[];
  isLoading: boolean;
  customerDataSource: MatTableDataSource<SimpleCustomer>;

  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar, private customersService: CustomersService) { }

  private refreshTable(): void {
    this.customersService.listCustomers().subscribe(response => {
      if (response.ok) {
        this.customerDataSource = new MatTableDataSource(response.data);
        console.log("Logger" + JSON.stringify(response.data));
        this.isLoading = false;
      } else {

      }
    });
  }

  openInfoDialog(customerId: number): void {
    const dialogRef = this.matDialog.open(InspectComponent, {
      data: {
        customerId
      }
    });

    dialogRef.afterClosed().subscribe( _ => {
      this.refreshTable();
    });
  }

  openDeleteDialog(customerId: number): void {
    const dialogRef = this.matDialog.open(DeleteComponent, {
      data: {
        customerId
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.matSnackBar.open('Cliente eliminado.', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }

  filterTableData(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    let status: boolean = true;
    if (tab === "Activos") {
      status = false;
    }
    this.customersService.listCustomers(status).subscribe(response => {
      if (response.ok) {
        console.log(response.data);
        this.customerDataSource = new MatTableDataSource(response.data);
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.displayedColumns = ['position', 'name', 'lastName', 'documentType', 'document', 'actions'];
    this.isLoading = true;
    this.refreshTable();
  }

}
