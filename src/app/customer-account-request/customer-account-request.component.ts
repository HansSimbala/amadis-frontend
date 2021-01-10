import { Component, OnInit } from '@angular/core';
import { GenerateCustomerAccount } from '../services/services.models';
import { CustomersService } from 'src/app/services/customers.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-customer-account-request',
  templateUrl: './customer-account-request.component.html',
  styleUrls: ['./customer-account-request.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CustomerAccountRequestComponent implements OnInit {

  customer = new GenerateCustomerAccount();
  base64File: string = null;
  filename: string = null;

  constructor(private customerService: CustomersService, private matSnackBar: MatSnackBar) { }

  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader()
      fReader.readAsDataURL(file)
      fReader.onloadend = (_event: any) => {
        this.filename = file.name;
        this.base64File = _event.target.result;
      }
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }

  ngOnInit(): void {
  }

  generateCustomerAccount() {
    const formData = new FormData();
    formData.append("documentFile", this.DataURIToBlob(this.base64File), this.filename);
    formData.append("documentTypeId", this.customer.documentTypeId.toString());
    formData.append("document", this.customer.document.toString());
    formData.append("name", this.customer.name.toString());
    formData.append("lastName", this.customer.lastName.toString());
    formData.append("email", this.customer.email.toString());
    formData.append("contactNumber", this.customer.contactNumber.toString());
    formData.append("birthdate", this.customer.birthdate);
    this.customerService.createContract(formData).subscribe(response => {
      if (response.ok) {
        console.log("Customer" + JSON.stringify(response.data));
        this.matSnackBar.open('Cliente registrado.', 'Cerrar', {
          duration: 2000,
        });
        this.customer = new GenerateCustomerAccount();
        this.base64File = " ";
        this.filename = " ";
      } else {
        console.log("Error" + JSON.stringify(response.data));
      }
    });

  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
}
