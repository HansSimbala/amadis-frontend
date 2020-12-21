import { Injectable } from '@angular/core';
import { ServiceResponse, SimpleLogin } from './services.models';
import { HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { ServiceProxy } from './services.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private serviceProxy: ServiceProxy) { }

  private readonly endpointUrl: string = `${environment.baseUrl}/authenticate`;

  login(simpleLogin: SimpleLogin): Observable<ServiceResponse<any>> {
    // Send request
    return this.serviceProxy.sendPostRequest<any>(`${this.endpointUrl}/login`, simpleLogin);
  }
}
