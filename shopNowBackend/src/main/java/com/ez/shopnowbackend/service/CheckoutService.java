package com.ez.shopnowbackend.service;

import com.ez.shopnowbackend.dto.Purchase;
import com.ez.shopnowbackend.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
