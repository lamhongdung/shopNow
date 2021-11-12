import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { CustomValidator } from 'src/app/validator/custom-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        fullname: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace]),

        email: new FormControl(theEmail,
          [Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]),

        phone: new FormControl('',
          [Validators.required,
          Validators.pattern('[0-9]{10,11}')]),

        shippingAddress: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace])
      }),
    });
  }

  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  get fullname() { return this.checkoutFormGroup.get('customer.fullname'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get phone() { return this.checkoutFormGroup.get('customer.phone'); }
  get shippingAddress() { return this.checkoutFormGroup.get('customer.shippingAddress'); }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    // let orderItems: OrderItem[] = [];
    // for (let i=0; i < cartItems.length; i++) {
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }

    // - short way of doing the same thing
    // convert cartItems to OrderItem[]
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      // "next" means success
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();

      },
      //  "error" means error/exception
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
    );

  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the product page
    this.router.navigateByUrl("/product");
  }
}
