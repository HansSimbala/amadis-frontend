import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CreateContract, SimpleOrderDetail, SimpleProduct } from 'src/app/services/services.models';
import { CustomersListComponent } from './../customers-list/customers-list.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsListComponent } from '../products-list/products-list.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CreateContractComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  options = {
    types: [],
    componentRestrictions: { country: 'PE' }
  }

  createContractformGroup: FormGroup;
  order = new CreateContract();
  newProductsList: SimpleProduct[] = [];
  productsList: SimpleProduct[] = [];
  isValidAddress: boolean;
  addressText: string;
  lat: number;
  lng: number;
  zoom: number;

  constructor(private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<CreateContractComponent>,
    private ordersService: OrdersService,
    private matSnackBar: MatSnackBar) {
    this.isValidAddress = false;
    this.lat = -12.04318;
    this.lng = -77.02824;
    this.zoom = 6;
  }

  ngOnInit(): void {
    this.createContractformGroup = this.formBuilder.group({
      customerName: new FormControl('', [Validators.required]),
      orderType: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  public handleAddressChange(address: Address) {
    this.addressText = address.formatted_address.toString();
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.zoom = 15;
    this.isValidAddress = true;
  }

  public openCustomers() {
    const dialogRef = this.matDialog.open(CustomersListComponent);
    let fullName = null;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        fullName = result.name + " " + result.lastName;
        this.createContractformGroup.controls.customerName.setValue(fullName);
        this.order.customerId = result.customerId;
      }
    });
  }

  public openProducts() {
    const dialogRef = this.matDialog.open(ProductsListComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.newProductsList = result;
      console.log('The dialog was closed', JSON.stringify(this.newProductsList));
    });
  }

  createContract() {
    this.order.address = this.addressText;
    this.order.latitude = this.lat.toString();
    this.order.longitude = this.lng.toString();
    this.order.orderDetail = this.newProductsList.map((product) => {
      return {
        productPresentationId: product.id,
        quantity: product.quantity
      };
    });
    if (this.isValidAddress == true) {
      this.ordersService.createContract(this.order).subscribe(response => {
        if (response.ok) {
          this.dialogRef.close();
          this.matSnackBar.open('Contrato realizado correctamente.', 'Cerrar', {
            duration: 2000
          });
        }
      });
    } else {
      this.matSnackBar.open('Seleccione una dirección correcta.', 'Cerrar', {
        duration: 2000
      });
    }

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.createContractformGroup.controls[controlName].hasError(errorName);
  }

  modelChangeFn() {
    this.isValidAddress = false;
  }
}
