package com.ez.shopnowbackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="customer")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="fullname")
    private String fullname;

    @Column(name="email")
    private String email;

    @Column(name="phone")
    private String phone;

    @Column(name="shippingAddress")
    private String shippingAddress;

    // 1 customer has many orders.
    // mappedBy with field "customer" in the class "Order"
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<Order> orders = new HashSet<>();

    public void add(Order order) {

        if (order != null) {

            if (orders == null) {
                orders = new HashSet<>();
            }

            orders.add(order);
            order.setCustomer(this);
        }
    }

}
