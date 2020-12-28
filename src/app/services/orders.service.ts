import { Injectable } from '@angular/core';
import { ServiceResponse, SimpleOrder, SimpleOrderDetail, CreateContract } from './services.models';
import { HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { ServiceProxy } from './services.utils';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private serviceProxy: ServiceProxy) { }

  private readonly endpointUrl: string = `${environment.baseUrl}/orders`;

  createContract(contract: CreateContract): Observable<ServiceResponse<any>> {
    // Send request
    return this.serviceProxy.sendPostRequest<any>(this.endpointUrl, contract);
  }

  deleteOrder(orderId: number): Observable<ServiceResponse<any>> {
    // Send request
    return this.serviceProxy.sendDeleteRequest<any>(`${this.endpointUrl}/${orderId}`);
  }

  listOrders(orderStateId?: number): Observable<ServiceResponse<SimpleOrder[]>> {
    // Generate request params
    let params = new HttpParams();
    if (orderStateId) params = params.append('orderStateId', orderStateId.toString());
    // Send request
    return this.serviceProxy.sendGetRequest<SimpleOrder[]>(this.endpointUrl, params);
  }

}
