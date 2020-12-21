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

export class SimpleCustomer {
    birthdate: string;
    contactNumber: string;
    document: string;
    documentTypeId: number;
    id: number;
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

export class SimpleOrderDetail {
    product: string;
    unitPrice: string;
    quantity: number;
}

export class SimpleLogin {
    email: string;
    password: string;
}