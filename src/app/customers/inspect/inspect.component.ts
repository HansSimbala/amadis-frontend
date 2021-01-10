import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from 'src/app/services/customers.service';
import { SimpleCustomer } from 'src/app/services/services.models';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  customer = new SimpleCustomer();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InspectComponent>,
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
    this.inspectCustomer(this.data.customerId);
  }

  inspectCustomer(customerId: number) {
    this.customersService.inspectCustomer(customerId).subscribe(response => {
      if (response.ok) {
        this.customer = response.data;
        console.log(response.data);
      }
    });
  }

  updateUrl(event) {
    this.customer.documentPath = "https://image.flaticon.com/icons/png/512/23/23765.png";
  }

  activateCustomer(customerId) {
    this.customersService.activateCustomer(customerId).subscribe(response => {
      if (response.ok) {
        console.log(response.data);
      }
    });
  }
}
