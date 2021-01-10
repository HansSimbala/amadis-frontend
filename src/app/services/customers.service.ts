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

  listCustomers(status?: boolean): Observable<ServiceResponse<SimpleCustomer[]>> {
    // Generate request params
    let params = new HttpParams();
    if (status) params = params.append('status', status.toString());
    // Request
    return this.serviceProxy.sendGetRequest<SimpleCustomer[]>(this.endpointUrl, params);
  }

  createContract(customer: FormData): Observable<ServiceResponse<any>> {
    return this.serviceProxy.sendPostRequest<any>(this.endpointUrl, customer);
  }

  inspectCustomer(customerId: number): Observable<ServiceResponse<SimpleCustomer>> {
    // Send request
    return this.serviceProxy.sendGetRequest<SimpleCustomer>(`${this.endpointUrl}/${customerId}`);
  }

  activateCustomer(customerId: number): Observable<ServiceResponse<any>> {
    // Send request
    return this.serviceProxy.sendPutRequest<any>(`${this.endpointUrl}/${customerId}/activate`);
  }

}
