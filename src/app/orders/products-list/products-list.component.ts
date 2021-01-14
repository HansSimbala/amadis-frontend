import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { SimpleOrderDetail, SimpleProduct } from 'src/app/services/services.models';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productsList: SimpleProduct[] = [];
  newProductsList: SimpleProduct[] = [];
  isLoading: boolean;

  constructor(private ordersService: OrdersService) { }

  private refreshProductsList(): void {
    this.ordersService.listProducts().subscribe(response => {
      if (response.ok) {
        this.productsList = response.data;
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.refreshProductsList();
  }

  addProduct(productPresentation: SimpleProduct) {
    if(!productPresentation.quantity) {
      productPresentation.quantity = 1;
    } else {
      productPresentation.quantity += 1;
    }
    let findProduct = this.newProductsList.findIndex(oD => oD.id === productPresentation.id);
    if (findProduct != -1) {
      this.newProductsList[findProduct].quantity = productPresentation.quantity;
    } else {
      const newProductItem = productPresentation;
      this.newProductsList.push(newProductItem);
    }
  }

  removeProduct(productPresentation: SimpleProduct) {
    if(!productPresentation.quantity) {
      productPresentation.quantity = 0;
    } else {
      if(productPresentation.quantity > 0) {
        productPresentation.quantity -= 1;
        let findProduct = this.newProductsList.findIndex(oD => oD.id === productPresentation.id);
        if (productPresentation.quantity != 0) {
          if (findProduct != -1) {
            this.newProductsList[findProduct].quantity = productPresentation.quantity;
          } else {
            const newProductItem = productPresentation;
            this.newProductsList.push(newProductItem);
          }
        } else {
          if (findProduct != -1) {
            this.newProductsList.splice(findProduct, 1);
          }
        }      
      }
    }
  }

}
