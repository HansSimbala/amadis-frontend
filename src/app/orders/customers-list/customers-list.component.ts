import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { SimpleCustomer } from 'src/app/services/services.models';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customerList: SimpleCustomer[] = [];
  isLoading: boolean;

  constructor(private customersService: CustomersService) { }

  private refreshCustomerList(): void {
    this.customersService.listCustomers().subscribe(response => {
      if (response.ok) {
        this.customerList = response.data;
        this.isLoading = false;
        console.log("response: ", JSON.stringify(this.customerList)); 
      } else {
        console.log("response: ", response.message); 
      }
    });
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.refreshCustomerList();
  }

}
