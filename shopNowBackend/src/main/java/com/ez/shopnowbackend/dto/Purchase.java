package com.ez.shopnowbackend.dto;

import com.ez.shopnowbackend.entity.Customer;
import com.ez.shopnowbackend.entity.Order;
import com.ez.shopnowbackend.entity.OrderItem;
import lombok.Data;

import java.util.Set;

// @Data = @Getter + @Setter + @ToString + EqualsAndHashCode + @RequiredArgsConstructor
@Data
public class Purchase {

    private Customer customer;
    private Order order;
    private Set<OrderItem> orderItems;

}
