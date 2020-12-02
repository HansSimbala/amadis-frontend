import { Injectable } from '@angular/core';
import { ServiceResponse, SimpleCustomer } from './services.models';
import { HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { ServiceProxy } from './services.utils';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private serviceProxy: ServiceProxy) { }

  private readonly endpointUrl: string = `${environment.baseUrl}/customers`;

  listCustomers(): Observable<ServiceResponse<SimpleCustomer[]>> {
    return this.serviceProxy.sendGetRequest<SimpleCustomer[]>(this.endpointUrl);
  }
}
