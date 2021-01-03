import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { CustomersListComponent } from './../customers-list/customers-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  options = {
    types: [],
    componentRestrictions: { country: 'PE' }
  }

  customer: string;
  latitude: number;
  longitude: number;
  zoom: number;

  constructor(private matDialog: MatDialog) {
    this.latitude = -12.04318;
    this.longitude = -77.02824;
    this.zoom = 6;
  }

  ngOnInit(): void {
    //this.setLocation();
  }

  public handleAddressChange(address: Address) {
    console.log(address);
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.zoom = 15;
  }

  public openCustomers() {
    const dialogRef = this.matDialog.open(CustomersListComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.customer = result.name + " " + result.lastName;
    });

  }

  onSubmit() {
    alert('Thanks for submitting! Data: ');
  }

}
