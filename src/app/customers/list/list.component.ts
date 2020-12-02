import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { MatTableDataSource } from '@angular/material/table';

import { SimpleCustomer } from 'src/app/services/services.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  customerDataSource: MatTableDataSource<SimpleCustomer>;

  constructor(private customersService: CustomersService) { }

  private refreshTable(): void {
    this.customersService.listCustomers().subscribe(response => {
      if (response.ok) {
        this.customerDataSource = new MatTableDataSource(response.data);
        console.log("Logger"+ JSON.stringify(response.data));
      
      } else {
        
      }
    });
  }

  ngOnInit(): void {
    this.refreshTable();
  }

}
