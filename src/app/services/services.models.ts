import { MatTableDataSource } from "@angular/material/table";

/**
 * Base class for a service response.
 */
export class ServiceResponse<T> {
    /**
     * The response data, this may be null.
     */
    data: T;
    /**
     * Extra information send from the service.
     * If the response was an error response, this will contain the error explanation.
     */
    message: string;
    /**
     * True if the response had a 2XX status code, False otherwhise.
     */
    ok: boolean;
    /**
     * Status information, 'OK' when the response was successful, and 'ERROR' otherwise.
     * It's recommended to use the ok property instead of this one.
     */
    status: string;
}

export class CreateContract {
    shippingDate: string;
    endDate: string;
    customerId: number;
    address: string;
    reference: string;
    latitude: string;
    longitude: string;
    orderTypeId: number;
    orderDetail: SimpleOrderDetail[];
}

export class GenerateCustomerAccount {
    lastName: string;
    name: string;
    email: string;
    birthdate: string;
    contactNumber: string;
    document: string;
    documentTypeId: number;
    documentFile: FormData;
}

export class SimpleCustomer {
    birthdate: string;
    contactNumber: string;
    document: string;
    documentPath: string;
    documentType: string;
    documentTypeId: number;
    customerId: number;
    lastName: string;
    name: string;
}

export class SimpleOrder {
    shippingDate: string;
 //   orderState: string;
    orderStateId: number;
 //   orderType: number;
    orderTypeId: number;
    id: number;
    customer: string;
    contactNumber: string;
    reference: string;
    latitude: string;
    longitude: string;
    address: string;
 //   orderDetail: SimpleOrderDetail[]
}

export class SimpleRoute {
    position: number;
    shippingDate: string;
    stops: number;
    route: SimpleOrder[] | MatTableDataSource<SimpleOrder>;
}

export class SimpleProduct {
    id: number;
    price: number;
    pathImage: string;
}

export class SimpleOrderDetail {
    productPresentationId: number;
    quantity: number;
}

export class SimpleLogin {
    email: string;
    password: string;
}