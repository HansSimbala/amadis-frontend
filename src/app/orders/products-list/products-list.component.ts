import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { SimpleOrderDetail, SimpleProduct } from 'src/app/services/services.models';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  orderDetail: SimpleOrderDetail[] = [];
  orderDetailItem = new SimpleOrderDetail();
  productsList: SimpleProduct[] = [];
  isLoading: boolean;

  constructor(private ordersService: OrdersService) { }

  private refreshProductsList(): void {
    this.ordersService.listProducts().subscribe(response => {
      if (response.ok) {
        this.productsList = response.data;
        this.isLoading = false;
        console.log("response: ", JSON.stringify(this.productsList)); 
      } else {
        console.log("response: ", response.message); 
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.refreshProductsList();
  }

  addProduct(productPresentationId: number, quantity: number) {
    this.orderDetailItem.productPresentationId = productPresentationId;
    this.orderDetailItem.quantity = quantity;
    this.orderDetail.push(this.orderDetailItem);
  }

}
