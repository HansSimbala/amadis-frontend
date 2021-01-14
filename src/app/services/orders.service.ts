import { Injectable } from '@angular/core';
import { ServiceResponse, SimpleOrder, SimpleOrderDetail, CreateContract, SimpleProduct, SimpleRoute, GenerateRoutes } from './services.models';
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
  private readonly productEndpointUrl: string = `${environment.baseUrl}/products`;

  createContract(contract: CreateContract): Observable<ServiceResponse<any>> {
    // Send request
    return this.serviceProxy.sendPostRequest<any>(`${this.endpointUrl}/contract`, contract);
  }

  deleteOrder(orderId: number): Observable<ServiceResponse<any>> {
    // Send request
    return this.serviceProxy.sendDeleteRequest<any>(`${this.endpointUrl}/${orderId}`);
  }

  generateRoutes(generateRoutes: GenerateRoutes): Observable<ServiceResponse<any>> {
    // Send request
    return this.serviceProxy.sendPostRequest<any>(`${this.endpointUrl}/routes`, generateRoutes);
  }

  listOrderRoutes(shippingDate: string): Observable<ServiceResponse<SimpleRoute[]>> {
    // Generate request params
    let params = new HttpParams();
    if (shippingDate) params = params.append('shippingDate', shippingDate);
    // Send request
    return this.serviceProxy.sendGetRequest<SimpleRoute[]>(`${this.endpointUrl}/routes/temp`, params);
  }

  listOrders(orderStateId?: number): Observable<ServiceResponse<SimpleOrder[]>> {
    // Generate request params
    let params = new HttpParams();
    if (orderStateId) params = params.append('orderStateId', orderStateId.toString());
    // Send request
    return this.serviceProxy.sendGetRequest<SimpleOrder[]>(this.endpointUrl, params);
  }

  listRoutes(shippingDate: string): Observable<ServiceResponse<SimpleRoute[]>> {
    // Generate request params
    let params = new HttpParams();
    if (shippingDate) params = params.append('shippingDate', shippingDate);
    // Send request
    return this.serviceProxy.sendGetRequest<SimpleRoute[]>(`${this.endpointUrl}/routes/list`, params);
  }

  listProducts(): Observable<ServiceResponse<SimpleProduct[]>> {
    // Send request
    return this.serviceProxy.sendGetRequest<SimpleProduct[]>(this.productEndpointUrl);
  }

}
