import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
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

/*  latitude;
  longitude;
  zoom;
*/
  constructor() {
  }

  ngOnInit(): void {
    //this.setLocation();
  }

  public handleAddressChange(address: Address) {
    console.log(address);
    //this.latitude = address.geometry.location.lat();
    //this.longitude = address.geometry.location.lng();
  }

  /*public setLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      })
    }
  }*/

  onSubmit() {
    alert('Thanks for submitting! Data: ');
  }

}
