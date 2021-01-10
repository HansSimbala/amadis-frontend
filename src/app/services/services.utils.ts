import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ServiceResponse } from './services.models';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ServiceProxy {
    constructor(private httpClient: HttpClient) { }

    //#region Helpers
    private handleErrorResponse<T>(subscriber: Subscriber<ServiceResponse<T>>, error: HttpErrorResponse): void {
        const response = error.error;
        response.ok = false;
        subscriber.next(response);
    }

    private handleSuccessResponse<T>(subscriber: Subscriber<ServiceResponse<T>>, next: HttpResponse<ServiceResponse<T>>): void {
        const response = next.body;
        response.ok = true;
        subscriber.next(response);
    }
    //#endregion

    sendDeleteRequest<T>(url: string): Observable<ServiceResponse<T>> {
        // Build and return an observable, that also send the request
        return new Observable(subscriber => {
            this.httpClient
                .delete<ServiceResponse<T>>(url, { observe: 'response' })
                .subscribe(next => this.handleSuccessResponse(subscriber, next), (error: HttpErrorResponse) => this.handleErrorResponse(subscriber, error));
        });
    }

    sendGetRequest<T>(url: string, params?: HttpParams): Observable<ServiceResponse<T>> {
        // Build and return an observable, that also send the request
        return new Observable(subscriber => {
            this.httpClient
                .get<ServiceResponse<T>>(url, { observe: 'response', params })
                .subscribe(next => this.handleSuccessResponse(subscriber, next), (error: HttpErrorResponse) => this.handleErrorResponse(subscriber, error));
        });
    }

    sendPostRequest<T>(url: string, body: any): Observable<ServiceResponse<T>> {
        // Build and return an observable, that also send the request
        return new Observable(subscriber => {
            this.httpClient
                .post<ServiceResponse<T>>(url, body, { observe: 'response' })
                .subscribe(next => this.handleSuccessResponse(subscriber, next), (error: HttpErrorResponse) => this.handleErrorResponse(subscriber, error));
        });
    }

    sendPutRequest<T>(url: string, body?: any): Observable<ServiceResponse<T>> {
        // Build and return an observable, that also send the request
        return new Observable(subscriber => {
            this.httpClient
                .put<ServiceResponse<T>>(url, body, { observe: 'response' })
                .subscribe(next => this.handleSuccessResponse(subscriber, next), (error: HttpErrorResponse) => this.handleErrorResponse(subscriber, error));
        });
    }
}
